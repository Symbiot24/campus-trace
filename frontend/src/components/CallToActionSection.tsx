import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface CallToActionSectionProps {
  onOpenReport: () => void;
  onOpenSearch: () => void;
}

const CallToActionSection = ({
  onOpenReport,
  onOpenSearch,
}: CallToActionSectionProps) => {
  return (
    <section className="py-16 bg-gradient-card border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Help return lost items to their owners
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Report found items or search for your lost belongings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              onClick={onOpenSearch}
              className="gap-2 w-full sm:w-auto"
            >
              <Search className="h-5 w-5" />
              Search lost items
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={onOpenReport}
              className="gap-2 w-full sm:w-auto"
            >
              <Plus className="h-5 w-5" />
              Report found item
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
