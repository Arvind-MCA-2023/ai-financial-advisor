import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from "recharts";
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Calendar } from "lucide-react";

const AIForecasting = () => {
  const forecastData = [
    { month: "Jul", actual: 5600, predicted: 5800, confidence: 95 },
    { month: "Aug", actual: null, predicted: 6100, confidence: 92 },
    { month: "Sep", actual: null, predicted: 6200, confidence: 89 },
    { month: "Oct", actual: null, predicted: 5900, confidence: 85 },
    { month: "Nov", actual: null, predicted: 6300, confidence: 82 },
    { month: "Dec", actual: null, predicted: 6500, confidence: 78 },
  ];

  const expenseForecast = [
    { category: "Food & Dining", current: 850, predicted: 920, change: 8.2 },
    { category: "Transportation", current: 420, predicted: 380, change: -9.5 },
    { category: "Shopping", current: 680, predicted: 750, change: 10.3 },
    { category: "Bills & Utilities", current: 1200, predicted: 1250, change: 4.2 },
    { category: "Entertainment", current: 300, predicted: 280, change: -6.7 },
  ];

  const budgetAlerts = [
    {
      type: "warning",
      title: "Shopping Budget Alert",
      message: "Predicted to exceed shopping budget by 15% next month",
      confidence: "89%",
      impact: "Medium"
    },
    {
      type: "success",
      title: "Transportation Savings",
      message: "Expected to save $40 on transportation costs",
      confidence: "92%",
      impact: "Low"
    },
    {
      type: "info",
      title: "Seasonal Adjustment",
      message: "Holiday spending typically increases by 25% in December",
      confidence: "95%",
      impact: "High"
    }
  ];

  const goalProgress = [
    { goal: "Emergency Fund", current: 12000, target: 15000, progress: 80, timeframe: "3 months" },
    { goal: "Vacation Fund", current: 3200, target: 5000, progress: 64, timeframe: "6 months" },
    { goal: "New Car", current: 8500, target: 25000, progress: 34, timeframe: "18 months" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <span>AI Budget Forecasting</span>
          </h1>
          <p className="text-muted-foreground">Machine learning predictions for your financial future</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="badge-orange">Facebook Prophet Model</Badge>
          <Button variant="outline">
            <Zap className="w-4 h-4 mr-2" />
            Retrain Model
          </Button>
        </div>
      </div>

      {/* Forecast Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="financial-card border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-success">$6,500</div>
                <div className="text-sm text-muted-foreground">Predicted Dec Savings</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-success">78% confidence</div>
                <div className="text-xs text-muted-foreground">vs $5,600 current</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="financial-card border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-warning">$3,580</div>
                <div className="text-sm text-muted-foreground">Predicted Expenses</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-warning">85% confidence</div>
                <div className="text-xs text-muted-foreground">+3.8% increase</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="financial-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">16</div>
                <div className="text-sm text-muted-foreground">Weeks to Goal</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">Emergency Fund</div>
                <div className="text-xs text-muted-foreground">$3,000 remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Forecast Chart */}
      <Card className="financial-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>6-Month Savings Forecast</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Time Series Analysis</Badge>
              <Select defaultValue="savings">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="Actual"
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Forecast & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Category Forecast (Next Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseForecast.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <div className="font-medium text-sm">{item.category}</div>
                    <div className="text-xs text-muted-foreground">
                      Current: ${item.current}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${item.predicted}</div>
                    <div className={`text-xs flex items-center space-x-1 ${
                      item.change > 0 ? "text-destructive" : "text-success"
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${item.change < 0 ? "rotate-180" : ""}`} />
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>AI Budget Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === "warning"
                      ? "bg-warning/5 border-warning"
                      : alert.type === "success"
                      ? "bg-success/5 border-success"
                      : "bg-primary/5 border-primary"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      alert.type === "warning"
                        ? "text-warning"
                        : alert.type === "success"
                        ? "text-success"
                        : "text-primary"
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.confidence} confidence
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {alert.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Financial Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goalProgress.map((goal, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{goal.goal}</h4>
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goal.progress}% complete</span>
                    <span>{goal.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIForecasting;