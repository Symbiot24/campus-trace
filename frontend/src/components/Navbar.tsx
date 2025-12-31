import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Menu, X, MapPin } from "lucide-react";

interface NavbarProps {
  onOpenReport: () => void;
  onOpenSearch: () => void;
}

const Navbar = ({ onOpenReport, onOpenSearch }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors group-hover:border-primary">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              CampusTrace
            </span>
          </a>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onOpenSearch}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Smart Search
            </Button>
            <Button
              variant="hero"
              onClick={onOpenReport}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Report Item
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              <Button
                variant="ghost"
                onClick={() => {
                  onOpenSearch();
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start gap-2"
              >
                <Search className="h-4 w-4" />
                Smart Search
              </Button>
              <Button
                variant="hero"
                onClick={() => {
                  onOpenReport();
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start gap-2"
              >
                <Plus className="h-4 w-4" />
                Report Item
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
