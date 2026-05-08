import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BrainCircuit, Search, Star, MapPin, TrendingUp, IndianRupee, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMS = [
  { value: 'JEE Advanced', label: 'JEE Advanced' },
  { value: 'JEE Main', label: 'JEE Main' },
  { value: 'BITSAT', label: 'BITSAT' },
  { value: 'VITEEE', label: 'VITEEE' },
  { value: 'GATE', label: 'GATE' },
];

function ChanceTag({ chance }) {
  const config = {
    high: { label: 'High Chance', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    moderate: { label: 'Moderate', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    low: { label: 'Low Chance', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
  };
  const c = config[chance];
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

export default function Predictor() {
  const [exam, setExam] = useState('');
  const [rank, setRank] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data: colleges = [] } = useQuery({
    queryKey: ['allCollegesPredictor'],
    queryFn: () => base44.entities.College.list('-rating', 100),
  });

  const results = useMemo(() => {
    if (!exam || !rank) return [];
    const userRank = parseInt(rank);
    if (isNaN(userRank) || userRank <= 0) return [];

    return colleges
      .filter(c => c.accepted_exams?.includes(exam))
      .map(c => {
        const cutoff = c.cutoff_rank || 5000;
        let chance;
        if (userRank <= cutoff * 0.7) chance = 'high';
        else if (userRank <= cutoff) chance = 'moderate';
        else if (userRank <= cutoff * 1.3) chance = 'low';
        else return null;
        return { ...c, chance };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const order = { high: 0, moderate: 1, low: 2 };
        return order[a.chance] - order[b.chance];
      });
  }, [colleges, exam, rank]);

  const handlePredict = () => {
    if (exam && rank) setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <BrainCircuit className="w-7 h-7 text-primary" />
        <h1 className="font-heading font-bold text-2xl md:text-3xl">College Predictor</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-8 ml-10">Enter your exam and rank to find matching colleges</p>

      {/* Input Form */}
      <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrance Exam</label>
            <Select value={exam} onValueChange={setExam}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                {EXAMS.map(e => (
                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Rank</label>
            <Input
              type="number"
              placeholder="e.g., 500"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button
            onClick={handlePredict}
            disabled={!exam || !rank}
            size="lg"
            className="h-12 rounded-xl gap-2 shadow-lg shadow-primary/25"
          >
            <Search className="w-4 h-4" />
            Predict
          </Button>
        </div>

        <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Predictions are based on historical cutoff data and approximate rankings. Actual admissions may vary based on category, year, and other factors.</p>
        </div>
      </div>

      {/* Results */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg">
              {results.length > 0 ? `${results.length} Colleges Found` : 'No Matches Found'}
            </h2>
            {results.length > 0 && (
              <p className="text-sm text-muted-foreground">
                For {exam} Rank {parseInt(rank).toLocaleString()}
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
              <BrainCircuit className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No colleges match your rank for this exam. Try a different exam or rank.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {results.map((college, i) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-28 sm:h-auto overflow-hidden flex-shrink-0">
                        <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3 className="font-heading font-bold text-sm">{college.name}</h3>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" /> {college.location}
                              </p>
                            </div>
                            <ChanceTag chance={college.chance} />
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{college.rating}</span>
                            <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />₹{(college.fees_min / 100000).toFixed(1)}L/yr</span>
                            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-600" />{college.placement_rate}% placed</span>
                            <span>Cutoff ~{college.cutoff_rank?.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          <Link to={`/college/${college.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}