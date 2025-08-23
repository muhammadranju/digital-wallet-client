import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "user" | "agent" | "admin";
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const navigationItems = {
  user: [
    { icon: Home, label: "Overview", href: "/dashboard/user" },
    { icon: Wallet, label: "Wallet", href: "/dashboard/user/wallet" },
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/dashboard/user/transactions",
    },
    { icon: User, label: "Profile", href: "/dashboard/user/profile" },
  ],
  agent: [
    { icon: Home, label: "Overview", href: "/dashboard/agent" },
    {
      icon: Wallet,
      label: "Cash Operations",
      href: "/dashboard/agent/cash-operations",
    },
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/dashboard/agent/transactions",
    },
    {
      icon: TrendingUp,
      label: "Commission",
      href: "/dashboard/agent/commission",
    },
    { icon: User, label: "Profile", href: "/dashboard/agent/profile" },
  ],
  admin: [
    { icon: Home, label: "Overview", href: "/dashboard/admin" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: UserCheck, label: "Agents", href: "/dashboard/admin/agents" },
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/dashboard/admin/transactions",
    },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
};

const roleColors = {
  user: "bg-blue-500",
  agent: "bg-green-500",
  admin: "bg-purple-500",
};

const roleLabels = {
  user: "User",
  agent: "Agent",
  admin: "Admin",
};

export function DashboardLayout({
  children,
  userRole,
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  // update activeItem whenever route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const navItems = navigationItems[userRole];

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex h-full flex-col bg-sidebar ${className}`}>
      <Link to={"/"}>
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-lg ${roleColors[userRole]} flex items-center justify-center`}
            >
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                PayWallet
              </span>
              <Badge variant="secondary" className="text-xs w-fit">
                {roleLabels[userRole]}
              </Badge>
            </div>
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "outline" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
              onClick={() => {
                navigate(item.href); // ✅ navigate
              }}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex-1" />

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
