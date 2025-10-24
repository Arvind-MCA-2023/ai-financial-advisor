import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2, Download } from "lucide-react";
import { useApi, useAsyncAction } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { Transaction } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";

const ExpenseTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const { data: transactions, loading, refetch } = useApi<Transaction[]>(() => 
    apiService.getTransactions({ limit: 100 })
  );

  const { data: analytics, loading: analyticsLoading } = useApi(() => 
    apiService.getIncomeExpenseSummary()
  );

  const { execute: deleteTransaction } = useAsyncAction((id: number) =>
    apiService.deleteTransaction(id)
  );

  const handleDeleteTransaction = async (id: number) => {
    const result = await deleteTransaction(id);
    if (result) {
      toast({
        title: "Transaction deleted",
        description: "Transaction has been successfully deleted.",
      });
      refetch();
    }
  };

  const mockTransactions = [
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

  const displayTransactions = transactions || mockTransactions;
  const filteredTransactions = displayTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateStats = () => {
    if (analytics) {
      return {
        totalIncome: analytics.total_income || 0,
        totalExpenses: analytics.total_expenses || 0,
        netIncome: analytics.net_income || 0,
        transactionCount: displayTransactions.length
      };
    }
    
    const income = displayTransactions.filter(t => 
      (transactions ? t.transaction_type === 'income' : t.type === 'income')
    ).reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = displayTransactions.filter(t => 
      (transactions ? t.transaction_type === 'expense' : t.type === 'expense')
    ).reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      netIncome: income - expenses,
      transactionCount: displayTransactions.length
    };
  };

  const stats = calculateStats();

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
            <div className="text-2xl font-bold text-success">₹{stats.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-muted-foreground">Total Income</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">₹{stats.totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{stats.netIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-muted-foreground">Net Income</div>
          </CardContent>
        </Card>
        <Card className="financial-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.transactionCount}</div>
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
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex items-center space-x-4 p-4">
                    <div className="w-20 h-4 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="w-24 h-4 bg-muted rounded"></div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-muted rounded"></div>
                      <div className="w-8 h-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground w-20">
                      {transactions ? new Date(transaction.date).toLocaleDateString() : transaction.date}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        {(transactions || transaction.aiCategory) && (
                          <Badge className="badge-orange text-xs">AI Classified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`font-semibold ${
                      (transactions ? transaction.transaction_type === 'income' : transaction.type === 'income') ? "text-success" : "text-foreground"
                    }`}>
                      {(transactions ? transaction.transaction_type === 'income' : transaction.type === 'income') ? "+" : "-"}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracking;