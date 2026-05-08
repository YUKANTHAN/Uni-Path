import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, GitCompare, BrainCircuit, Menu, X, Bookmark, Award, ClipboardList, Map, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/colleges', label: 'Colleges', icon: Search },
  { path: '/compare', label: 'Compare', icon: GitCompare },
  { path: '/predictor', label: 'Predictor', icon: BrainCircuit },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/saved', label: 'Saved', icon: Bookmark },
  { path: '/tracker', label: 'Tracker', icon: ClipboardList },
  { path: '/scholarships', label: 'Scholarships', icon: Award },
  { path: '/ai-counselor', label: 'AI Counselor', icon: Sparkles },
];



export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">CollegeHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-2 font-medium ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-card"
          >
            <div className="p-4 space-y-1">
              {navLinks.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}