import { MapPin, Mail, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="border-t border-border/50 bg-muted/20 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                CampusTrace
              </span>
            </div>
            <p className="text-muted-foreground max-w-xl leading-relaxed text-sm sm:text-base">
              Clear steps, calm tone, and transparent handoffs. CampusTrace is built to make returning items feel effortless for everyone involved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <button 
                onClick={() => scrollToSection("hero")}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => scrollToSection("hero")}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => scrollToSection("hero")}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Code of Conduct
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3 shadow-sm">
              <h4 className="font-display font-bold text-foreground">Quick help</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="mailto:support@campustrace.edu" className="hover:text-foreground transition-colors break-all">
                    support@campustrace.edu
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Student Help Desk, Admin Block</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 space-y-3 shadow-sm">
              <h4 className="font-display font-bold text-foreground">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("recent-items")}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    Browse items
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("community")}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("cta")}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    Get started
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} CampusTrace. Built to keep campus belongings moving back to their owners.
          </p>
          <span className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
            Made with ❤️ for students who value clear communication
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
