import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CollegeCard from '@/components/colleges/CollegeCard';
import CollegeFilters from '@/components/colleges/CollegeFilters';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const PER_PAGE = 9;

export default function Colleges() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';

  const [filters, setFilters] = useState({
    search: initialSearch,
    state: 'all',
    feeRange: 'all',
    course: 'all',
  });
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: () => base44.entities.College.list('-rating', 100),
  });

  const { data: savedColleges = [] } = useQuery({
    queryKey: ['savedColleges'],
    queryFn: () => base44.entities.SavedCollege.list(),
  });

  const saveMutation = useMutation({
    mutationFn: (college) => base44.entities.SavedCollege.create({
      college_id: college.id,
      college_name: college.name,
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedColleges'] }),
  });

  const unsaveMutation = useMutation({
    mutationFn: (savedId) => base44.entities.SavedCollege.delete(savedId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedColleges'] }),
  });

  const savedIds = useMemo(() => new Set(savedColleges.map(s => s.college_id)), [savedColleges]);

  const toggleSave = (college) => {
    const existing = savedColleges.find(s => s.college_id === college.id);
    if (existing) {
      unsaveMutation.mutate(existing.id);
    } else {
      saveMutation.mutate(college);
    }
  };

  const filtered = useMemo(() => {
    return colleges.filter(c => {
      if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.state !== 'all' && c.state !== filters.state) return false;
      if (filters.course !== 'all' && !c.courses?.includes(filters.course)) return false;
      if (filters.feeRange !== 'all') {
        const [min, max] = filters.feeRange.split('-').map(Number);
        if (c.fees_min < min || c.fees_min > max) return false;
      }
      return true;
    });
  }, [colleges, filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  React.useEffect(() => { setPage(1); }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <GraduationCap className="w-7 h-7 text-primary" />
          <h1 className="font-heading font-bold text-2xl md:text-3xl">Explore Colleges</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-10">
          {filtered.length} college{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <CollegeFilters filters={filters} onFilterChange={setFilters} />

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <Skeleton className="h-44 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-3 gap-3">
                  <Skeleton className="h-14 rounded-lg" />
                  <Skeleton className="h-14 rounded-lg" />
                  <Skeleton className="h-14 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20">
          <GraduationCap className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg">No colleges found</h3>
          <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginated.map((college, i) => (
              <CollegeCard
                key={college.id}
                college={college}
                index={i}
                isSaved={savedIds.has(college.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setPage(p)}
                  className="w-9 h-9"
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}