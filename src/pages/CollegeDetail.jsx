import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  MapPin, Star, IndianRupee, TrendingUp, Users, BookOpen, Calendar,
  Building2, Award, ArrowLeft, ExternalLink, ClipboardList, Check
} from 'lucide-react';
import SimilarColleges from '@/components/colleges/SimilarColleges';
import CollegeNewsFeed from '@/components/colleges/CollegeNewsFeed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

function InfoItem({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color || 'bg-primary/10'}`}>
        <Icon className={`w-5 h-5 ${color ? 'text-white' : 'text-primary'}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="p-4 rounded-xl border border-border/50 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{review.author?.[0]}</span>
          </div>
          <div>
            <p className="font-medium text-sm">{review.author}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold">{review.rating}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
    </div>
  );
}

export default function CollegeDetail() {
  const collegeId = window.location.pathname.split('/').pop();

  const queryClient = useQueryClient();

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['college', collegeId],
    queryFn: () => base44.entities.College.filter({ id: collegeId }),
  });

  const { data: allColleges = [] } = useQuery({
    queryKey: ['allCollegesDetail'],
    queryFn: () => base44.entities.College.list('-rating', 50),
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: () => base44.entities.Application.list(),
  });

  const addToTrackerMutation = useMutation({
    mutationFn: (college) => base44.entities.Application.create({
      college_id: college.id,
      college_name: college.name,
      college_image: college.image_url,
      status: 'Wishlist',
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  });

  const isTracked = college => applications.some(a => a.college_id === college?.id);

  const college = colleges[0];

  const formatFees = (amount) => {
    if (!amount) return 'N/A';
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading font-bold text-xl">College not found</h2>
        <Link to="/colleges"><Button className="mt-4">Back to Colleges</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link to="/colleges">
        <Button variant="ghost" size="sm" className="gap-2 mb-4 -ml-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Button>
      </Link>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Hero */}
        <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-primary/90 text-primary-foreground">#{college.nirf_ranking} NIRF</Badge>
              <Badge variant="secondary" className="bg-white/90 text-foreground">{college.type}</Badge>
              <Badge variant="secondary" className="bg-white/90 text-foreground">Est. {college.established}</Badge>
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white">{college.name}</h1>
            <div className="flex items-center gap-2 text-white/80 text-sm mt-2">
              <MapPin className="w-4 h-4" /> {college.location}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <InfoItem icon={Star} label="Rating" value={`${college.rating} / 5.0`} />
          <InfoItem icon={IndianRupee} label="Fees (Annual)" value={`${formatFees(college.fees_min)} - ${formatFees(college.fees_max)}`} />
          <InfoItem icon={TrendingUp} label="Placement Rate" value={`${college.placement_rate}%`} />
          <InfoItem icon={Users} label="Students" value={college.student_count?.toLocaleString() || 'N/A'} />
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 mb-8">
          <h2 className="font-heading font-bold text-lg mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{college.description}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-card border border-border/50 p-1 rounded-xl">
            <TabsTrigger value="courses" className="rounded-lg">Courses</TabsTrigger>
            <TabsTrigger value="placements" className="rounded-lg">Placements</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Courses Offered</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {college.courses?.map(course => (
                  <div key={course} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm">{course}</span>
                  </div>
                ))}
              </div>
              {college.accepted_exams?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Accepted Exams</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.accepted_exams.map(exam => (
                      <Badge key={exam} variant="outline" className="font-normal">{exam}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="placements">
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-6">
              <h3 className="font-heading font-bold text-lg">Placement Statistics</h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-3xl font-bold text-emerald-600">{college.placement_rate}%</p>
                  <p className="text-sm text-muted-foreground mt-1">Placement Rate</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">₹{college.avg_package} LPA</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Package</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-3xl font-bold text-amber-600">₹{college.highest_package} LPA</p>
                  <p className="text-sm text-muted-foreground mt-1">Highest Package</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">Placement Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Students Placed</span>
                    <span className="font-medium">{college.placement_rate}%</span>
                  </div>
                  <Progress value={college.placement_rate} className="h-2.5" />
                </div>
              </div>

              {college.top_recruiters?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-3">Top Recruiters</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.top_recruiters.map(company => (
                      <Badge key={company} className="bg-muted text-foreground font-normal px-3 py-1.5">
                        <Building2 className="w-3 h-3 mr-1.5" /> {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Student Reviews</h3>
              {college.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {college.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No reviews yet</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* News Feed */}
        <div className="mt-8">
          <CollegeNewsFeed collegeName={college.name} />
        </div>

        {/* Similar Colleges */}
        <SimilarColleges currentCollege={college} allColleges={allColleges} />

        {/* CTA row */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <h3 className="font-heading font-bold text-lg">Compare this college</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-4">See how it stacks up against others</p>
            <Link to={`/compare?college=${college.id}`}>
              <Button className="gap-2 shadow-lg shadow-primary/25">
                Compare <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <h3 className="font-heading font-bold text-lg">Track your application</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-4">Add to your application tracker</p>
            {isTracked(college) ? (
              <Button variant="outline" disabled className="gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Added to Tracker
              </Button>
            ) : (
              <Button variant="outline" onClick={() => addToTrackerMutation.mutate(college)}
                className="gap-2 border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/10">
                <ClipboardList className="w-4 h-4" /> Add to Tracker
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}