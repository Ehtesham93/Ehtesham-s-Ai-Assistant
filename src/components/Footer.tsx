import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="mt-16 pb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="backdrop-blur-lg bg-glass border border-glass-border rounded-xl px-6 py-8 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center text-foreground">Connect With Me</h3>
        <div className="flex justify-center gap-4 mb-6">
          {/* GitHub */}
          <Button
            variant="outline"
            size="icon"
            className="border-glass-border hover:bg-primary/20 hover:border-primary transition-all hover:scale-110"
            asChild
          >
            <a href="https://github.com/Ehtesham93" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          </Button>

          {/* LinkedIn */}
          <Button
            variant="outline"
            size="icon"
            className="border-glass-border hover:bg-accent/20 hover:border-accent transition-all hover:scale-110"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>

          {/* Email */}
          <Button
            variant="outline"
            size="icon"
            className="border-glass-border hover:bg-primary/20 hover:border-primary transition-all hover:scale-110"
            asChild
          >
            <a href="mailto:nitehtesham9393@gmail.com">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">@_Ehtesham Alam</p>
      </div>
    </footer>
  );
};
