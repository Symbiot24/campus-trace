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
    <section id="how-it-works" className="py-16 lg:py-20 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
            Simple steps to report or find lost items on campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="group">
              <div className="flex flex-col gap-4 h-full rounded-2xl border border-border/60 bg-card p-6 lg:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    Step {index + 1}
                  </span>
                  <step.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-2">
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
