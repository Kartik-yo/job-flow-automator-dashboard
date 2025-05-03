
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  List,
  FileText,
  Settings,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      path: '/',
    },
    {
      title: 'Job Tracker',
      icon: <List className="h-5 w-5" />,
      path: '/jobs',
    },
    {
      title: 'Generate Content',
      icon: <FileText className="h-5 w-5" />,
      path: '/generate',
    },
    {
      title: 'History',
      icon: <Clock className="h-5 w-5" />,
      path: '/history',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings',
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-card h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b justify-between">
        {!collapsed && (
          <span className="font-semibold text-lg">JobFlow</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-full",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <span className="mr-2">{item.icon}</span>
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="border-t p-4">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-start space-x-3"
        )}>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            JD
          </div>
          {!collapsed && (
            <div className="text-sm font-medium">John Doe</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
