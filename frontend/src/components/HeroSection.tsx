import { Button } from "@/components/ui/button";
import { Search, Plus, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenReport: () => void;
  onOpenSearch: () => void;
}

const HeroSection = ({ onOpenReport, onOpenSearch }: HeroSectionProps) => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-card text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Designed for calm returns
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Find and return items with clarity
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                CampusTrace keeps attention on the details that matter: what was lost, where it was found, and how to get it home. No clutter, just a guided path to the right match.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="hero" size="xl" onClick={onOpenSearch} className="gap-2 w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Start a search
              </Button>
              <Button variant="hero-outline" size="xl" onClick={onOpenReport} className="gap-2 w-full sm:w-auto">
                <Plus className="h-5 w-5" />
                Report an item
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Stay focused",
                  description: "Clear prompts keep you sharing the right details without extra steps.",
                },
                {
                  title: "Stay kind",
                  description: "Calm language and guided actions make handoffs feel easy for everyone.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border/60 bg-card px-4 py-3 flex flex-col gap-1"
                >
                  <span className="font-display text-lg font-semibold text-foreground">{item.title}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-glow p-6 space-y-6 animate-fade-up">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Guided flow</p>
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  One place to report or search
                </h3>
              </div>
              <Sparkles className="h-6 w-6 text-primary/80" />
            </div>

            <div className="space-y-4">
              {[
                { title: "Share the essentials", description: "Add a short description, photo, and location so others recognize it immediately." },
                { title: "Search in plain language", description: "Describe colors, materials, or engravings and see confident matches appear." },
                { title: "Coordinate calmly", description: "We surface the right contact prompts so handoffs stay safe and simple." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <p className="font-display text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/60 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Need a fast start?</p>
                <p className="text-sm text-muted-foreground">
                  Use semantic search or report in under a minute. We guide you with clear prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
