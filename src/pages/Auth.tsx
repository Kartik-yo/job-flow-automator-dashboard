
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/use-auth-appwrite';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { user, loading } = useAuth();
  
  // Redirect to dashboard if user is already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">JobFlowAutomator</h1>
          <p className="text-muted-foreground mt-2">
            Your personal job application automation tool
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
