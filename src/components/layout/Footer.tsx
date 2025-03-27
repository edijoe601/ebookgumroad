import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
  simplified?: boolean;
}

const Footer = ({ className = "", simplified = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  if (simplified) {
    return (
      <footer
        className={cn("w-full py-4 px-4 bg-background border-t", className)}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} EbookAI. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook size={16} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter size={16} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram size={16} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={cn("w-full py-8 px-4 bg-background border-t", className)}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EbookAI</h3>
            <p className="text-sm text-muted-foreground">
              Create, publish, and monetize ebooks with the power of AI.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Github">
                <Github size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Documentation
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Tutorials
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Blog
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Support
                </Button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  Cookie Policy
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">
                  GDPR
                </Button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>123 AI Avenue</p>
              <p>Tech District, TD 12345</p>
              <p>support@ebookai.com</p>
            </address>
            <Button variant="outline" size="sm" className="mt-2">
              <Mail size={16} className="mr-2" />
              Contact Us
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} EbookAI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by
            EbookAI Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
