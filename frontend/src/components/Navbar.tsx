import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Menu, X, MapPin, User, LogOut, Home, List } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { NavLink } from "./NavLink";

interface NavbarProps {
  onOpenReport?: () => void;
  onOpenSearch?: () => void;
}

const Navbar = ({ onOpenReport, onOpenSearch }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleReportClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to report an item");
      navigate("/login");
      return;
    }
    if (onOpenReport) {
      onOpenReport();
    }
  };

  const handleSearchClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to search for items");
      navigate("/login");
      return;
    }
    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-all duration-200 group-hover:border-primary group-hover:shadow-md">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground hidden sm:inline">
              CampusTrace
            </span>
          </NavLink>

          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("recent-items")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Browse Items
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {onOpenSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchClick}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </Button>
            )}
            {onOpenReport && (
              <Button
                variant="default"
                size="sm"
                onClick={handleReportClick}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden lg:inline">Report Item</span>
              </Button>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                activeClassName="text-foreground bg-muted"
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>
              
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
              >
                How It Works
              </button>
              
              <button
                onClick={() => scrollToSection("recent-items")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
              >
                <List className="h-4 w-4" />
                Browse Items
              </button>

              <div className="h-px bg-border my-2" />

              {onOpenSearch && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleSearchClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search Items
                </Button>
              )}
              
              {onOpenReport && (
                <Button
                  variant="default"
                  onClick={() => {
                    handleReportClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Report Item
                </Button>
              )}

              <div className="h-px bg-border my-2" />

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 rounded-lg bg-muted">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
