import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowRight } from "lucide-react";

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
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-card text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Take action in a minute
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Keep belongings moving to the right owner
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you are searching or reporting, CampusTrace guides you with a minimal flow so you can help quickly without second guessing.
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
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            {[
              {
                title: "Guided steps",
                description: "A short flow keeps posting or searching simple.",
              },
              {
                title: "Respectful exchanges",
                description: "Clear wording reduces back-and-forth and builds trust.",
              },
              {
                title: "Always accessible",
                description: "Works on any device so you can act quickly on campus.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card p-5 text-left space-y-2"
              >
                <div className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
