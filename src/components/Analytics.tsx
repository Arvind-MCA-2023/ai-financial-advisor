import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", income: 8000, expenses: 3200, savings: 4800 },
    { month: "Feb", income: 8200, expenses: 3400, savings: 4800 },
    { month: "Mar", income: 7800, expenses: 3100, savings: 4700 },
    { month: "Apr", income: 8500, expenses: 3600, savings: 4900 },
    { month: "May", income: 8200, expenses: 3450, savings: 4750 },
    { month: "Jun", income: 8800, expenses: 3200, savings: 5600 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 850, color: "#FF6B35", percentage: 24.6 },
    { name: "Transportation", value: 420, color: "#F7931E", percentage: 12.2 },
    { name: "Shopping", value: 680, color: "#FFD23F", percentage: 19.7 },
    { name: "Bills & Utilities", value: 1200, color: "#06D6A0", percentage: 34.8 },
    { name: "Entertainment", value: 300, color: "#118AB2", percentage: 8.7 },
  ];

  const spendingTrends = [
    { category: "Food & Dining", thisMonth: 850, lastMonth: 920, change: -7.6 },
    { category: "Transportation", thisMonth: 420, lastMonth: 380, change: 10.5 },
    { category: "Shopping", thisMonth: 680, lastMonth: 550, change: 23.6 },
    { category: "Bills & Utilities", thisMonth: 1200, lastMonth: 1150, change: 4.3 },
    { category: "Entertainment", thisMonth: 300, lastMonth: 450, change: -33.3 },
  ];

  const savingsGoalData = [
    { month: "Jan", actual: 4800, target: 5000 },
    { month: "Feb", actual: 4800, target: 5000 },
    { month: "Mar", actual: 4700, target: 5000 },
    { month: "Apr", actual: 4900, target: 5000 },
    { month: "May", actual: 4750, target: 5000 },
    { month: "Jun", actual: 5600, target: 5000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Financial Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your financial patterns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$5,600</div>
                <div className="text-sm text-muted-foreground">Monthly Savings</div>
              </div>
              <div className="flex items-center text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$3,200</div>
                <div className="text-sm text-muted-foreground">Avg Monthly Expenses</div>
              </div>
              <div className="flex items-center text-destructive">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">-2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">64%</div>
                <div className="text-sm text-muted-foreground">Savings Rate</div>
              </div>
              <div className="flex items-center text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$24,580</div>
                <div className="text-sm text-muted-foreground">Net Worth</div>
              </div>
              <div className="flex items-center text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Income vs Expenses vs Savings</CardTitle>
              <Badge className="badge-orange">Trending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success) / 0.1)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive) / 0.1)"
                  name="Expenses"
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stackId="3"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.1)"
                  name="Savings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Expense Distribution</CardTitle>
              <Badge className="badge-orange">AI Analyzed</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Savings Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsGoalData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Actual Savings"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <div className="font-medium text-sm">{trend.category}</div>
                    <div className="text-xs text-muted-foreground">
                      ${trend.thisMonth} this month
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${
                      trend.change > 0 ? "text-destructive" : "text-success"
                    }`}>
                      {trend.change > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(trend.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;