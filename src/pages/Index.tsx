import Navigation from "@/components/Navigation";
import DashboardStats from "@/components/DashboardStats";
import ExpenseChart from "@/components/ExpenseChart";
import AIInsights from "@/components/AIInsights";
import QuickActions from "@/components/QuickActions";
import RecentTransactions from "@/components/RecentTransactions";
import heroImage from "@/assets/financial-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      {/* Hero Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img 
              src={heroImage} 
              alt="Financial Dashboard Analytics" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
              <div className="px-8">
                <h1 className="text-4xl font-bold mb-2">
                  Welcome to Your AI Financial Advisor
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  Smart insights, automated tracking, and personalized recommendations
                </p>
                <div className="flex items-center space-x-2">
                  <span className="badge-orange">Machine Learning Powered</span>
                  <span className="badge-orange">Real-time Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="mb-8">
            <DashboardStats />
          </div>

          {/* Charts Section */}
          <div className="mb-8">
            <ExpenseChart />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentTransactions />
              <QuickActions />
            </div>
            <div className="lg:col-span-1">
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
