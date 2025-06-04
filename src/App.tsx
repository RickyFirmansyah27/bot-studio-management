
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BotProvider } from "@/contexts/BotContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import AdminDashboard from "./pages/AdminDashboard";
import SearchHistory from "./pages/SearchHistory";
import ConversationFilters from "./pages/ConversationFilters";
import TotalUsers from "./pages/analytics/TotalUsers";
import ActiveSessions from "./pages/analytics/ActiveSessions";
import MessageVolume from "./pages/analytics/MessageVolume";
import BotManagement from "./pages/BotManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BotProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes with Sidebar via AppLayout */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="/bot-management" element={<BotManagement />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/search-history" element={<SearchHistory />} />
                <Route path="/conversation-filters" element={<ConversationFilters />} />
                <Route path="/analytics/users" element={<TotalUsers />} />
                <Route path="/analytics/sessions" element={<ActiveSessions />} />
                <Route path="/analytics/messages" element={<MessageVolume />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BotProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
