import { MapPin, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                CampusTrace
              </span>
            </div>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Clear steps, calm tone, and transparent handoffs. CampusTrace is built to make returning items feel effortless for everyone involved.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors underline-offset-4 underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors underline-offset-4 underline">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors underline-offset-4 underline">
                Code of Conduct
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3">
              <h4 className="font-display font-bold text-foreground">Quick help</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:support@retrace.edu" className="hover:text-foreground transition-colors">
                    support@retrace.edu
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span>Student Help Desk, Admin Block</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3">
              <h4 className="font-display font-bold text-foreground">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Report an item
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Search lost items
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Success stories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built to keep campus belongings moving back to their owners.
          </p>
          <span className="text-sm text-muted-foreground">Made for students who value calm, clear exchanges.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
