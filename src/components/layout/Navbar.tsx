import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useGetProfileQuery } from "@/redux/api/userApi";
import { logout } from "@/redux/slices/authSlice";
import { DialogTitle } from "@radix-ui/react-dialog"; // <- Required for accessibility
import Cookie from "js-cookie";
import {
  CreditCard,
  HomeIcon,
  LogOut,
  Menu,
  User,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isUser = localStorage.getItem("userRole");
  const { data } = useGetProfileQuery();
  const user = data?.data;

  const isAuthenticated =
    Cookie.get("isAuthenticated") || localStorage.getItem("isAuthenticated");
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    Cookie.remove("token");
    Cookie.remove("userRole");
    Cookie.remove("isAuthenticated");
    Cookie.remove("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");

    toast.info("You have been logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">PayWallet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex  items-center ">
          {isAuthenticated === "true" && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user?.image ||
                          "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        }
                        alt={user?.name || user?.name}
                      />
                      <AvatarFallback>
                        {user?.name ||
                          user?.name
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
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      to={`${
                        isUser === "USER"
                          ? "/dashboard/user"
                          : isUser === "AGENT"
                          ? "/dashboard/agent"
                          : "/dashboard/admin"
                      }`}
                      className="flex items-center"
                    >
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to={`${
                        isUser === "USER"
                          ? "/dashboard/user/profile"
                          : isUser === "AGENT"
                          ? "/dashboard/agent/profile"
                          : "/dashboard/admin/transactions"
                      }`}
                      className="flex items-center"
                    >
                      {isUser === "USER" || isUser === "AGENT" ? (
                        <User className="mr-2 h-4 w-4" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      {isUser === "USER" || isUser === "AGENT"
                        ? "Profile"
                        : "Transactions"}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            {/* DialogTitle added for accessibility */}
            <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>

            <div className="flex flex-col space-y-4 mt-4 ml-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "underline underline-offset-4" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <NavLink
                      to={`${
                        isUser === "USER"
                          ? "/dashboard/user/profile"
                          : isUser === "AGENT"
                          ? "/dashboard/agent/profile"
                          : "/dashboard/admin/transactions"
                      }`}
                      className="flex items-center"
                    >
                      {isUser === "USER" || isUser === "AGENT" ? (
                        <User className="mr-2 h-4 w-4" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      {isUser === "USER" || isUser === "AGENT"
                        ? "Profile"
                        : "Transactions"}
                    </NavLink>
                  </div>
                </div>
              ) : (
                ""
              )}

              {!isAuthenticated ? (
                <div className="border-t pt-4 space-y-2">
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
