import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2, Download } from "lucide-react";

const ExpenseTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const transactions = [
    { id: 1, date: "2024-01-15", description: "Big Bazaar", category: "Food & Dining", amount: 8750, type: "expense" },
    { id: 2, date: "2024-01-15", description: "Petrol Pump", category: "Transportation", amount: 4520, type: "expense" },
    { id: 3, date: "2024-01-14", description: "Salary Deposit", category: "Income", amount: 420000, type: "income" },
    { id: 4, date: "2024-01-14", description: "Cafe Coffee Day", category: "Food & Dining", amount: 1245, type: "expense" },
    { id: 5, date: "2024-01-13", description: "Electric Bill", category: "Bills & Utilities", amount: 12000, type: "expense" },
    { id: 6, date: "2024-01-13", description: "Amazon Purchase", category: "Shopping", amount: 6499, type: "expense" },
    { id: 7, date: "2024-01-12", description: "Netflix Subscription", category: "Entertainment", amount: 1599, type: "expense" },
    { id: 8, date: "2024-01-12", description: "Freelance Payment", category: "Income", amount: 75000, type: "income" },
  ];

  const categories = ["All", "Food & Dining", "Transportation", "Shopping", "Bills & Utilities", "Entertainment", "Income"];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expense Tracking</h1>
          <p className="text-muted-foreground">Manage and categorize your transactions</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">₹4,95,000.00</div>
            <div className="text-sm text-muted-foreground">Total Income</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">₹34,613.00</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹4,60,387.00</div>
            <div className="text-sm text-muted-foreground">Net Income</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">Transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="financial-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground w-20">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <Badge className="badge-orange text-xs">AI Classified</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`font-semibold ${
                    transaction.type === "income" ? "text-success" : "text-foreground"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default ExpenseTracking;