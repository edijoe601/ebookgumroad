import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  showTags?: boolean;
}

const HeroSection = ({
  title = "Create Popular Ebooks with AI!",
  subtitle = "Discover the best niches, create quality content, and upload to Gumroad in minutes.",
  ctaText = "Start Now",
  onCtaClick = () => console.log("CTA clicked"),
  className,
  showTags = true,
}: HeroSectionProps) => {
  const { requireGumroadAuth } = useGumroadAuth();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (requireGumroadAuth("/niche-analysis")) {
      navigate("/niche-analysis");
    }
  };
  return (
    <div
      className={cn(
        "w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 rounded-xl shadow-lg",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl">{subtitle}</p>

        <Button
          onClick={handleCtaClick}
          size="lg"
          className="bg-white text-blue-700 hover:bg-blue-50 font-semibold text-lg px-8 py-6 h-auto"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {showTags && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Niche Analysis</span>
            </div>
            <div className="bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">AI Content Creation</span>
            </div>
            <div className="bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Gumroad Integration</span>
            </div>
            <div className="bg-blue-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Performance Tracking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
