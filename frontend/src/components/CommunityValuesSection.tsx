import { Users, Shield, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunityValuesSectionProps {
  onOpenReport: () => void;
}

const CommunityValuesSection = ({ onOpenReport }: CommunityValuesSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A calm space to do the right thing
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Every item matters to someone. CampusTrace keeps the process simple so you can focus on getting belongings back where they belong.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We keep steps minimal, communication clear, and expectations respectful for everyone involved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" onClick={onOpenReport} className="gap-2">
                Report a Found Item
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-xl border border-border/60 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Campus Unity
              </h3>
              <p className="text-muted-foreground text-sm">
                We treat each other's belongings with the same care we expect for our own.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-xl border border-border/60 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Trust & Safety
              </h3>
              <p className="text-muted-foreground text-sm">
                Clear verification steps keep exchanges safe and transparent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-xl border border-border/60 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Smart Technology
              </h3>
              <p className="text-muted-foreground text-sm">
                AI-assisted matching highlights likely results without overwhelming you.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-xl border border-border/60 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Acts of Care
              </h3>
              <p className="text-muted-foreground text-sm">
                Returning an item restores someone’s calm day. Small actions add up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityValuesSection;
