import { Search, Upload, Handshake } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Report items",
    description: "Found something? Add a description and photo to help identify it.",
  },
  {
    icon: Search,
    title: "Search",
    description: "Lost something? Search through reported items to find matches.",
  },
  {
    icon: Handshake,
    title: "Connect",
    description: "Coordinate with the finder or owner to return the item.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple steps to report or find lost items on campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="group">
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-muted/70 text-xs font-medium">Step {index + 1}</span>
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
