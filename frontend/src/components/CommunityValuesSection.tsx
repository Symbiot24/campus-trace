import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CommunityValuesSectionProps {
  onOpenReport: () => void;
}

const CommunityValuesSection = ({ onOpenReport }: CommunityValuesSectionProps) => {
  return (
    <section id="community" className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 to-secondary/10 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Help reunite items with their owners
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8">
            A platform built to make it easy to return lost belongings on campus. Together, we create a caring community where no item stays lost for long.
          </p>

          <Button 
            variant="default" 
            size="lg" 
            onClick={onOpenReport} 
            className="gap-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="h-5 w-5" />
            Report a found item
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityValuesSection;
