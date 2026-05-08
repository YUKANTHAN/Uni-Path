import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, GitCompare, BrainCircuit, GraduationCap, ArrowRight, Star, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <p className="font-heading font-bold text-3xl md:text-4xl text-primary">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, link, linkText }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg hover:border-primary/20 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
      <Link to={link}>
        <Button variant="ghost" size="sm" className="gap-2 -ml-2 text-primary hover:text-primary">
          {linkText} <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: topColleges = [] } = useQuery({
    queryKey: ['topColleges'],
    queryFn: () => base44.entities.College.list('-rating', 6),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/colleges?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.06),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10 border-primary/20 font-medium px-4 py-1.5">
              🎓 India's Smart College Discovery Platform
            </Badge>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
              Find Your
              <span className="text-primary"> Perfect College</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Compare colleges, predict your admission chances, and make informed decisions about your future with data-driven insights.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-base bg-card border-border/50 rounded-xl shadow-sm"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-xl px-6 shadow-lg shadow-primary/25">
                Search
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <StatCard value="15+" label="Top Colleges" />
            <StatCard value="50+" label="Courses" />
            <StatCard value="95%" label="Avg Placement" />
            <StatCard value="₹310L" label="Highest Package" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl">Powerful Tools for Your Decision</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Everything you need to find, compare, and choose the right college.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Search}
            title="Smart Search & Filters"
            description="Find colleges by location, fees, courses, and more with our intelligent search engine."
            link="/colleges"
            linkText="Explore Colleges"
          />
          <FeatureCard
            icon={GitCompare}
            title="Side-by-Side Compare"
            description="Compare up to 3 colleges on fees, placements, rankings, and 10+ parameters at once."
            link="/compare"
            linkText="Compare Now"
          />
          <FeatureCard
            icon={BrainCircuit}
            title="Rank Predictor"
            description="Enter your exam rank and get a curated list of colleges where you stand a good chance."
            link="/predictor"
            linkText="Predict Colleges"
          />
        </div>
      </section>

      {/* Top Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl">Top Rated Colleges</h2>
            <p className="text-muted-foreground text-sm mt-1">Highest rated institutions in India</p>
          </div>
          <Link to="/colleges">
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topColleges.map((college, i) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/college/${college.id}`} className="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="relative h-36 overflow-hidden">
                  <img src={college.image_url} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">
                    #{college.nirf_ranking} NIRF
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm line-clamp-1">{college.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{college.location?.split(',')[0]}</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" />{college.rating}</span>
                    <span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="w-3 h-3" />{college.placement_rate}%</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}