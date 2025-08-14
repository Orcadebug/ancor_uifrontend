import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  LayoutDashboard,
  Rocket,
  Settings,
  Activity,
  Users,
  Shield,
  FileText,
  MessageSquare,
  Workflow
} from "lucide-react";

export function Navigation() {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AIM Platform</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link to="/deploy">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Rocket className="h-4 w-4" />
                  <span>Deploy</span>
                </Button>
              </Link>
              <Link to="/manage">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Manage</span>
                </Button>
              </Link>
              <Link to="/monitoring">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Monitoring</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
