import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface HeroSectionProps {
  onOpenReport: () => void;
  onOpenSearch: () => void;
}

const HeroSection = ({ onOpenReport, onOpenSearch }: HeroSectionProps) => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Find and return lost items
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                A platform to report found items and search for lost belongings on campus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="hero" size="xl" onClick={onOpenSearch} className="gap-2 w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Search for items
              </Button>
              <Button variant="hero-outline" size="xl" onClick={onOpenReport} className="gap-2 w-full sm:w-auto">
                <Plus className="h-5 w-5" />
                Report an item
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-glow p-6 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                How it works
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { title: "Report found items", description: "Add a description, photo, and location to help owners identify their belongings." },
                { title: "Search for lost items", description: "Browse reported items or use search to find matches." },
                { title: "Connect safely", description: "Contact information is provided to coordinate the return." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <p className="font-display text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
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
