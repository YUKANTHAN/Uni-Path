import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const STATES = [
  "Maharashtra", "Delhi", "Tamil Nadu", "Karnataka", "West Bengal",
  "Rajasthan", "Uttar Pradesh", "Telangana", "Uttarakhand"
];

const FEE_RANGES = [
  { label: "Under ₹1L", min: 0, max: 100000 },
  { label: "₹1L - ₹3L", min: 100000, max: 300000 },
  { label: "₹3L - ₹5L", min: 300000, max: 500000 },
  { label: "Above ₹5L", min: 500000, max: 10000000 },
];

const COURSES = ["B.Tech", "M.Tech", "MBA", "PhD", "B.Sc", "M.Sc", "MCA"];

export default function CollegeFilters({ filters, onFilterChange }) {
  const activeCount = [
    filters.state !== 'all',
    filters.feeRange !== 'all',
    filters.course !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    onFilterChange({ search: filters.search, state: 'all', feeRange: 'all', course: 'all' });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
        <Input
          placeholder="Search colleges by name..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-11 h-12 text-base bg-card border-border/50 rounded-xl"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">Filters</span>
        </div>

        <Select
          value={filters.state}
          onValueChange={(value) => onFilterChange({ ...filters, state: value })}
        >
          <SelectTrigger className="w-auto min-w-[140px] h-9 bg-card rounded-lg text-sm">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {STATES.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.feeRange}
          onValueChange={(value) => onFilterChange({ ...filters, feeRange: value })}
        >
          <SelectTrigger className="w-auto min-w-[140px] h-9 bg-card rounded-lg text-sm">
            <SelectValue placeholder="Fee Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fee Ranges</SelectItem>
            {FEE_RANGES.map((range, i) => (
              <SelectItem key={i} value={`${range.min}-${range.max}`}>{range.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.course}
          onValueChange={(value) => onFilterChange({ ...filters, course: value })}
        >
          <SelectTrigger className="w-auto min-w-[120px] h-9 bg-card rounded-lg text-sm">
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {COURSES.map(course => (
              <SelectItem key={course} value={course}>{course}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
            Clear ({activeCount})
          </Button>
        )}
      </div>
    </div>
  );
}