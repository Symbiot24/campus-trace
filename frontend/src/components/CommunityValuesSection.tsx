import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CommunityValuesSectionProps {
  onOpenReport: () => void;
}

const CommunityValuesSection = ({ onOpenReport }: CommunityValuesSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Help reunite items with their owners
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            A platform built to make it easy to return lost belongings on campus.
          </p>

          <Button variant="hero" size="lg" onClick={onOpenReport} className="gap-2">
            <Plus className="h-5 w-5" />
            Report a found item
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityValuesSection;
