import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { DeploymentStatus } from "@/components/DeploymentStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  DollarSign,
  Zap,
  AlertTriangle,
  TrendingUp,
  Rocket,
  Brain,
  Shield,
  FileText,
  MessageSquare,
  Workflow,
  Database,
  Clock,
  Users,
  Target,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Infrastructure Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage and monitor your AI model deployments across cloud providers
              </p>
            </div>
            <Link to="/deploy">
              <Button size="lg" className="flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span>Deploy New Model</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Deployments"
            value="12"
            icon={Brain}
            trend={{ value: "+2 this week", isPositive: true }}
            color="text-primary"
          />
          <MetricCard
            title="API Requests (24h)"
            value="24.8K"
            icon={Activity}
            trend={{ value: "+12.5%", isPositive: true }}
            color="text-green-600"
          />
          <MetricCard
            title="Avg Response Time"
            value="247ms"
            icon={Zap}
            trend={{ value: "-15ms", isPositive: true }}
            color="text-blue-600"
          />
          <MetricCard
            title="Monthly Cost"
            value="$1,247"
            icon={DollarSign}
            trend={{ value: "+8.2%", isPositive: false }}
            color="text-orange-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DeploymentStatus />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/deploy" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy New Model
                </Button>
              </Link>
              <Link to="/manage" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Manage Instances
                </Button>
              </Link>
              <Link to="/monitoring" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Setup Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GPT-4 Production deployment successful</p>
                  <p className="text-xs text-muted-foreground">AWS us-east-1 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Claude-3 Staging scaled up to 3 instances</p>
                  <p className="text-xs text-muted-foreground">Google Cloud us-central1 • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Cost alert: Monthly spend at 85% of limit</p>
                  <p className="text-xs text-muted-foreground">All providers • 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
