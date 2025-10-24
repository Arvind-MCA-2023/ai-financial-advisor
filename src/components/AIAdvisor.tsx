import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Lightbulb, TrendingUp, PiggyBank, AlertTriangle } from "lucide-react";

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your AI Financial Advisor. I've analyzed your spending patterns and I'm ready to help you optimize your finances. What would you like to know?",
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickQuestions = [
    "How can I reduce my monthly expenses?",
    "What's the best savings strategy for me?",
    "Should I invest my emergency fund?",
    "Help me create a budget plan",
    "Analyze my spending patterns",
    "How to improve my credit score?"
  ];

  const financialTips = [
    {
      icon: PiggyBank,
      title: "Automate Your Savings",
      description: "Set up automatic transfers to save 20% of your income without thinking about it.",
      impact: "High",
      difficulty: "Easy"
    },
    {
      icon: TrendingUp,
      title: "Diversify Investments",
      description: "Consider index funds to spread risk across multiple stocks and sectors.",
      impact: "High",
      difficulty: "Medium"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Fund Priority",
      description: "Build 6 months of expenses in savings before aggressive investing.",
      impact: "Critical",
      difficulty: "Medium"
    }
  ];

  const personalizedInsights = [
    {
      type: "positive",
      title: "Great Progress!",
      message: "You've reduced dining expenses by 15% this month (saved ₹12,750) while maintaining your lifestyle.",
      confidence: "94%"
    },
    {
      type: "opportunity",
      title: "Optimization Opportunity",
      message: "Switching to a high-yield savings account could earn you an extra ₹24,000 annually.",
      confidence: "87%"
    },
    {
      type: "warning",
      title: "Budget Alert",
      message: "Entertainment spending is trending 30% above your monthly budget allocation (₹9,000 over limit).",
      confidence: "91%"
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      type: "user",
      content: inputMessage,
      timestamp: "Just now"
    };

    // Simulate AI response
    const aiResponse = {
      type: "bot",
      content: "Based on your spending patterns, I recommend focusing on reducing your entertainment expenses by 20%. Here are some specific strategies...",
      timestamp: "Just now"
    };

    setMessages([...messages, newUserMessage, aiResponse]);
    setInputMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Bot className="w-6 h-6 text-primary" />
            <span>AI Financial Advicer</span>
          </h1>
          <p className="text-muted-foreground">Get personalized financial advice powered by large language models</p>
        </div>
        <Badge className="badge-orange">GPT-4 Powered</Badge>
      </div>

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personalizedInsights.map((insight, index) => (
          <Card key={index} className={`financial-card border-l-4 ${
            insight.type === "positive" 
              ? "border-success bg-success/5" 
              : insight.type === "warning"
              ? "border-warning bg-warning/5"
              : "border-primary bg-primary/5"
          }`}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">{insight.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{insight.message}</p>
              <Badge variant="outline" className="text-xs">
                {insight.confidence} confidence
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="financial-card h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>AI Chat Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] flex items-start space-x-2 ${
                      message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        {message.type === "user" ? 
                          <User className="w-4 h-4" /> : 
                          <Bot className="w-4 h-4" />
                        }
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your finances..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="text-sm">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>Smart Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-start space-x-2">
                        <Icon className="w-4 h-4 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {tip.impact} Impact
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {tip.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;