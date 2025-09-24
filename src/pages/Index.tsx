import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ExpenseTracking from "@/components/ExpenseTracking";
import Analytics from "@/components/Analytics";
import AIForecasting from "@/components/AIForecasting";
import AIAdvisor from "@/components/AIAdvisor";
import Reports from "@/components/Reports";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

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
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveModule()}
        </div>
      </div>
    </div>
  );
};

export default Index;
