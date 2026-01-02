import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface HeroSectionProps {
  onOpenReport: () => void;
  onOpenSearch: () => void;
}

const HeroSection = ({ onOpenReport, onOpenSearch }: HeroSectionProps) => {
  return (
    <section id="hero" className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Find and return lost items
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A simple platform to report found items and search for lost belongings on campus. Help reunite items with their owners.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button 
                variant="default" 
                size="lg" 
                onClick={onOpenSearch} 
                className="gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Search className="h-5 w-5" />
                Search for items
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onOpenReport} 
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                Report an item
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-xl p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Quick Start Guide
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { title: "Report found items", description: "Add a description, photo, and location to help owners identify their belongings.", icon: "📋" },
                { title: "Search for lost items", description: "Browse reported items or use search to find matches.", icon: "🔍" },
                { title: "Connect safely", description: "Contact information is provided to coordinate the return.", icon: "🤝" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/60 bg-muted/50 p-4 hover:bg-muted/70 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
