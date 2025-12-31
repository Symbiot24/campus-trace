import { Search, Upload, Handshake, Heart } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Report & Share",
    description:
      "Found something? Add a clear description and photo so it is easy to recognize.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Describe your item in everyday language and let the system surface close matches.",
  },
  {
    icon: Handshake,
    title: "Connect & Return",
    description:
      "When there's a match, we help you verify ownership and coordinate the return.",
  },
  {
    icon: Heart,
    title: "Spread Kindness",
    description:
      "Returning items keeps our campus thoughtful and stress-free for everyone.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How CampusTrace Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple flow that keeps the focus on the item, not the interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="group animate-fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-muted/70 text-xs font-medium">Step {index + 1}</span>
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
