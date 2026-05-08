import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedColleges() {
  const queryClient = useQueryClient();

  const { data: savedColleges = [], isLoading: loadingSaved } = useQuery({
    queryKey: ['savedColleges'],
    queryFn: () => base44.entities.SavedCollege.list('-created_date'),
  });

  const { data: allColleges = [], isLoading: loadingColleges } = useQuery({
    queryKey: ['allCollegesSaved'],
    queryFn: () => base44.entities.College.list('-rating', 100),
  });

  const removeMutation = useMutation({
    mutationFn: (id) => base44.entities.SavedCollege.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedColleges'] }),
  });

  const collegeMap = React.useMemo(() => {
    const map = {};
    allColleges.forEach(c => { map[c.id] = c; });
    return map;
  }, [allColleges]);

  const isLoading = loadingSaved || loadingColleges;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Bookmark className="w-7 h-7 text-primary" />
        <h1 className="font-heading font-bold text-2xl md:text-3xl">Saved Colleges</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-8 ml-10">
        {savedColleges.length} saved college{savedColleges.length !== 1 ? 's' : ''}
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border/50 p-4 flex gap-4">
              <Skeleton className="w-24 h-20 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : savedColleges.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
          <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg">No saved colleges yet</h3>
          <p className="text-muted-foreground text-sm mt-1 mb-4">Bookmark colleges you're interested in to see them here</p>
          <Link to="/colleges"><Button className="gap-2">Browse Colleges <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {savedColleges.map((saved, i) => {
              const college = collegeMap[saved.college_id];
              return (
                <motion.div
                  key={saved.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-4">
                    {college?.image_url && (
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={college.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-sm truncate">{saved.college_name}</h3>
                      {college && (
                        <p className="text-xs text-muted-foreground mt-0.5">{college.location} • Rating: {college.rating}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link to={`/college/${saved.college_id}`}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeMutation.mutate(saved.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}