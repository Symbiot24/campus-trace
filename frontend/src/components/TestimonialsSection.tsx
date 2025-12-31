import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I lost my laptop with my entire thesis on it. Someone found it in the library and posted it here. I was reunited with 6 months of work in just 4 hours. I can't thank this community enough.",
    name: "Priya Sharma",
    role: "PhD Student, Computer Science",
  },
  {
    quote:
      "Found a wallet with ₹5000 cash near the cafeteria. Posted it on ReTrace and the owner claimed it within a day. The relief on his face when I returned it — that's what being part of a community feels like.",
    name: "Arjun Mehta",
    role: "3rd Year, Mechanical Engineering",
  },
  {
    quote:
      "My late grandmother's ring slipped off during a lecture. I was devastated. Thanks to the semantic search, someone who found 'a silver ring with blue stone' matched my search for 'family heirloom band'. Priceless.",
    name: "Sarah Johnson",
    role: "2nd Year, Psychology",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of trust
          </h2>
          <p className="text-muted-foreground text-lg">
            Quiet, honest returns that kept stress low and days on track.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-primary/15" />
              <blockquote className="text-foreground mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-4 border-t border-border/50">
                <div className="font-display font-bold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
