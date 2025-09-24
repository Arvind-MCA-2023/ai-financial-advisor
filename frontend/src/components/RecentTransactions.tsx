import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Car, 
  Coffee, 
  Zap, 
  Smartphone,
  MoreHorizontal,
  Eye
} from "lucide-react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: "Big Bazaar",
      category: "Food & Dining",
      amount: -8750,
      date: "Today, 2:30 PM",
      icon: ShoppingBag,
      color: "text-primary",
      aiCategory: true
    },
    {
      id: 2,
      description: "Petrol Pump",
      category: "Transportation",
      amount: -4520,
      date: "Today, 9:15 AM",
      icon: Car,
      color: "text-warning",
      aiCategory: true
    },
    {
      id: 3,
      description: "Salary Deposit",
      category: "Income",
      amount: 420000,
      date: "Yesterday",
      icon: Smartphone,
      color: "text-success",
      aiCategory: false
    },
    {
      id: 4,
      description: "Cafe Coffee Day",
      category: "Food & Dining",
      amount: -1245,
      date: "Yesterday, 8:00 AM",
      icon: Coffee,
      color: "text-primary",
      aiCategory: true
    },
    {
      id: 5,
      description: "Electric Bill",
      category: "Bills & Utilities",
      amount: -12000,
      date: "2 days ago",
      icon: Zap,
      color: "text-destructive",
      aiCategory: true
    }
  ];

  return (
    <Card className="financial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className="badge-orange">Auto-categorized</Badge>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${transaction.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{transaction.category}</span>
                      {transaction.aiCategory && (
                        <Badge variant="outline" className="text-xs px-1">AI</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? "text-success" : "text-foreground"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;