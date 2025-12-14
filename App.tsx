import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";

import { Dashboard } from "@/pages/Dashboard";
import { Merchants } from "@/pages/Merchants";
import { Branches } from "@/pages/Branches";
import { Devices } from "@/pages/Devices";
import { Users } from "@/pages/Users";
import { Sales } from "@/pages/Sales";
import { Inventory } from "@/pages/Inventory";
import { Subscriptions } from "@/pages/Subscriptions";
import { FeatureFlags } from "@/pages/FeatureFlags";
import { WhiteLabel } from "@/pages/WhiteLabel";
import { AuditLogs } from "@/pages/AuditLogs";
import { Notifications } from "@/pages/Notifications";
import { Profile } from "@/pages/Profile";
import { SignInPage } from "@/pages/SignIn";
import { SignUpPage } from "@/pages/SignUp";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="merchants" element={<Merchants />} />
            <Route path="branches" element={<Branches />} />
            <Route path="devices" element={<Devices />} />
            <Route path="users" element={<Users />} />
            <Route path="sales" element={<Sales />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="feature-flags" element={<FeatureFlags />} />
            <Route path="white-label" element={<WhiteLabel />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </QueryClientProvider>
  );
}
