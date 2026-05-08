import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Colleges from '@/pages/Colleges';
import CollegeDetail from '@/pages/CollegeDetail';
import Compare from '@/pages/Compare';
import Predictor from '@/pages/Predictor';
import SavedColleges from '@/pages/SavedColleges';
import AIcounselor from '@/pages/AIcounselor';
import ApplicationTracker from '@/pages/ApplicationTracker';
import Scholarships from '@/pages/Scholarships';
import CollegeMap from '@/pages/CollegeMap';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground font-medium">Loading CollegeHub...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/college/:id" element={<CollegeDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/saved" element={<SavedColleges />} />
        <Route path="/ai-counselor" element={<AIcounselor />} />
        <Route path="/tracker" element={<ApplicationTracker />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/map" element={<CollegeMap />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App