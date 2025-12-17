import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded || !userLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Hardcoded super admin check
  const superAdminEmail = "anesuelsha4@gmail.com";
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (location.pathname === "/dashboard") {
    if (email === superAdminEmail) {
      return <>{children}</>;
    } else if (email) {
      // Redirect other users to their role-based dashboard or show error
      // Here you can fetch user role from backend or Clerk metadata if needed
      // For now, redirect to /profile as a placeholder
      return <Navigate to="/profile" replace />;
    } else {
      return <Navigate to="/sign-in" replace />;
    }
  }

  // For all other routes, allow access if signed in
  return <>{children}</>;
}
