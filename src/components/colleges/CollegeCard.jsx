import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee, TrendingUp, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CollegeCard({ college, index, isSaved, onToggleSave }) {
  const formatFees = (amount) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
        <div className="relative h-44 overflow-hidden">
          <img
            src={college.image_url}
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm">
              #{college.nirf_ranking} NIRF
            </Badge>
            <Badge variant="secondary" className="bg-white/90 text-foreground text-xs font-semibold backdrop-blur-sm">
              {college.type}
            </Badge>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); onToggleSave?.(college); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-primary" />
            ) : (
              <Bookmark className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-heading font-bold text-lg leading-tight line-clamp-2">
              {college.name}
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-sm">{college.rating}</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Rating</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-0.5 mb-0.5">
                <IndianRupee className="w-3 h-3 text-primary" />
                <span className="font-bold text-sm text-primary">{formatFees(college.fees_min)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fees/yr</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-bold text-sm">{college.placement_rate}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Placed</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {college.courses?.slice(0, 3).map(course => (
              <Badge key={course} variant="outline" className="text-xs font-normal">
                {course}
              </Badge>
            ))}
            {college.courses?.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                +{college.courses.length - 3}
              </Badge>
            )}
          </div>

          <Link to={`/college/${college.id}`}>
            <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground transition-colors">
              <span className="font-medium">View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}