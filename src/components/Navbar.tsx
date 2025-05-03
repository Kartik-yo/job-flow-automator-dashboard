
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4 border-b">
      <div className="flex items-center space-x-2 md:w-56">
        <h2 className="text-xl font-bold">JobFlow</h2>
      </div>
      
      <div className="flex-1 flex items-center justify-between md:justify-end">
        <form className="hidden md:flex-1 md:flex md:max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="pl-8 w-full bg-background"
            />
          </div>
        </form>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
