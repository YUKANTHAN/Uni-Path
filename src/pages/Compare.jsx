import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { GitCompare, Plus, X, Star, IndianRupee, TrendingUp, MapPin, Users, Award, Building2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

function CompareMetric({ label, icon: Icon, values, format, highlight }) {
  const best = highlight ? Math.max(...values.filter(v => v != null)) : null;

  return (
    <div className="grid grid-cols-[180px_1fr] md:grid-cols-[200px_1fr] border-b border-border/30 last:border-0">
      <div className="flex items-center gap-2.5 p-4 bg-muted/30 border-r border-border/30">
        <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="font-medium text-sm">{label}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values.map((val, i) => {
          const isBest = highlight && val === best && val != null;
          return (
            <div
              key={i}
              className={`p-4 text-center border-r border-border/30 last:border-0 ${isBest ? 'bg-primary/5' : ''}`}
            >
              <span className={`text-sm font-semibold ${isBest ? 'text-primary' : ''}`}>
                {format ? format(val) : (val ?? '—')}
              </span>
              {isBest && <Badge className="ml-2 text-[10px] bg-primary/10 text-primary border-primary/20">Best</Badge>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Compare() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselected = urlParams.get('college');

  const [selectedIds, setSelectedIds] = useState(
    preselected ? [preselected] : []
  );

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['allColleges'],
    queryFn: () => base44.entities.College.list('-rating', 100),
  });

  const selected = useMemo(
    () => selectedIds.map(id => colleges.find(c => c.id === id)).filter(Boolean),
    [selectedIds, colleges]
  );

  const addCollege = (id) => {
    if (id && selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCollege = (id) => {
    setSelectedIds(selectedIds.filter(sid => sid !== id));
  };

  const availableColleges = colleges.filter(c => !selectedIds.includes(c.id));

  const formatFees = (v) => v ? `₹${(v / 100000).toFixed(1)}L` : '—';
  const formatLPA = (v) => v ? `₹${v} LPA` : '—';
  const formatPct = (v) => v ? `${v}%` : '—';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <GitCompare className="w-7 h-7 text-primary" />
        <h1 className="font-heading font-bold text-2xl md:text-3xl">Compare Colleges</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-8 ml-10">Select up to 3 colleges to compare side by side</p>

      {/* Selection Area */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <AnimatePresence mode="popLayout">
          {selected.map(college => (
            <motion.div
              key={college.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-card rounded-xl border border-primary/20 overflow-hidden"
            >
              <div className="h-24 overflow-hidden">
                <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <button
                onClick={() => removeCollege(college.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="p-3">
                <p className="font-heading font-bold text-sm line-clamp-1">{college.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{college.location}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedIds.length < 3 && (
          <div className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px]">
            <Plus className="w-6 h-6 text-muted-foreground mb-2" />
            <Select onValueChange={addCollege}>
              <SelectTrigger className="w-full max-w-[200px] bg-transparent border-border/50">
                <SelectValue placeholder="Add college" />
              </SelectTrigger>
              <SelectContent>
                {availableColleges.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selected.length >= 2 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="grid border-b border-border/50" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
            <div className="p-4 bg-muted/50 border-r border-border/30">
              <span className="font-heading font-bold text-sm">Parameters</span>
            </div>
            {selected.map(c => (
              <div key={c.id} className="p-4 text-center border-r border-border/30 last:border-0">
                <p className="font-heading font-bold text-sm line-clamp-2">{c.name}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <CompareMetric label="Rating" icon={Star} values={selected.map(c => c.rating)} highlight />
          <CompareMetric label="NIRF Ranking" icon={Award} values={selected.map(c => c.nirf_ranking)} format={(v) => v ? `#${v}` : '—'} />
          <CompareMetric label="Location" icon={MapPin} values={selected.map(c => c.location)} />
          <CompareMetric label="Type" icon={Building2} values={selected.map(c => c.type)} />
          <CompareMetric label="Established" icon={Building2} values={selected.map(c => c.established)} />
          <CompareMetric label="Min Fees" icon={IndianRupee} values={selected.map(c => c.fees_min)} format={formatFees} />
          <CompareMetric label="Max Fees" icon={IndianRupee} values={selected.map(c => c.fees_max)} format={formatFees} />
          <CompareMetric label="Placement %" icon={TrendingUp} values={selected.map(c => c.placement_rate)} format={formatPct} highlight />
          <CompareMetric label="Avg Package" icon={IndianRupee} values={selected.map(c => c.avg_package)} format={formatLPA} highlight />
          <CompareMetric label="Highest Package" icon={IndianRupee} values={selected.map(c => c.highest_package)} format={formatLPA} highlight />
          <CompareMetric label="Students" icon={Users} values={selected.map(c => c.student_count)} format={(v) => v ? v.toLocaleString() : '—'} />
          <CompareMetric label="Faculty" icon={Users} values={selected.map(c => c.faculty_count)} format={(v) => v ? v.toLocaleString() : '—'} />
          <CompareMetric label="Courses" icon={BookOpen} values={selected.map(c => c.courses?.join(', '))} />
          <CompareMetric label="Exams" icon={Award} values={selected.map(c => c.accepted_exams?.join(', '))} />
        </motion.div>
      ) : (
        <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
          <GitCompare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg">Select at least 2 colleges</h3>
          <p className="text-muted-foreground text-sm mt-1">Choose colleges above to see a detailed comparison</p>
        </div>
      )}
    </div>
  );
}