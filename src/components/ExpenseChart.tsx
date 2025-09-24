import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const ExpenseChart = () => {
  const monthlyData = [
    { month: "Jan", income: 8000, expenses: 3200 },
    { month: "Feb", income: 8200, expenses: 3400 },
    { month: "Mar", income: 7800, expenses: 3100 },
    { month: "Apr", income: 8500, expenses: 3600 },
    { month: "May", income: 8200, expenses: 3450 },
    { month: "Jun", income: 8800, expenses: 3200 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 850, color: "#FF6B35" },
    { name: "Transportation", value: 420, color: "#F7931E" },
    { name: "Shopping", value: 680, color: "#FFD23F" },
    { name: "Bills & Utilities", value: 1200, color: "#06D6A0" },
    { name: "Entertainment", value: 300, color: "#118AB2" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="financial-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Income vs Expenses</CardTitle>
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
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.1)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="financial-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expense Categories</CardTitle>
            <Badge className="badge-orange">AI Classified</Badge>
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
  );
};

export default ExpenseChart;