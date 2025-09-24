import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard, Target } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$24,580.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Compared to last month"
    },
    {
      title: "Monthly Income",
      value: "$8,200.00",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      description: "This month's earnings"
    },
    {
      title: "Monthly Expenses",
      value: "$3,450.00",
      change: "-5.1%",
      trend: "down",
      icon: CreditCard,
      description: "Spending this month"
    },
    {
      title: "Savings Goal",
      value: "78%",
      change: "On track",
      trend: "up",
      icon: Target,
      description: "Annual savings target"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="financial-card hover:border-primary/20 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${
                  stat.trend === "up" ? "text-success" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;