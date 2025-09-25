import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ExpenseTracking from "@/components/ExpenseTracking";
import Analytics from "@/components/Analytics";
import AIForecasting from "@/components/AIForecasting";
import AIAdvisor from "@/components/AIAdvisor";
import Reports from "@/components/Reports";
import AuthForm from "@/components/AuthForm";
import { apiService } from "@/services/api";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          await apiService.getCurrentUser();
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setActiveModule("dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return <ExpenseTracking />;
      case "analytics":
        return <Analytics />;
      case "forecasting":
        return <AIForecasting />;
      case "advisor":
        return <AIAdvisor />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        onLogout={handleLogout}
      />
      
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveModule()}
        </div>
      </div>
    </div>
  );
};

export default Index;
