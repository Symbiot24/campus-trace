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
    <section id="cta" className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border-t border-border/60 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Ready to get started?
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Report found items or search for your lost belongings. Together, we make campus a better place.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={onOpenSearch}
              className="gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <Search className="h-5 w-5" />
              Search lost items
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenReport}
              className="gap-2"
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
