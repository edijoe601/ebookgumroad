import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, FileText, Upload, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description = "Feature description",
}: FeatureCardProps) => {
  const { requireGumroadAuth } = useGumroadAuth();
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    let path = "/dashboard";

    if (title === "Niche Analysis") {
      path = "/niche-analysis";
    } else if (
      title === "Content Creation" ||
      title === "Automated Publishing"
    ) {
      path = "/create-ebook";
    } else if (title === "Performance Tracking") {
      path = "/my-ebooks";
    }

    if (requireGumroadAuth(path)) {
      navigate(path);
    }
  };
  return (
    <Card
      className="h-full transition-all hover:shadow-md cursor-pointer"
      onClick={handleFeatureClick}
    >
      <CardHeader className="pb-2">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground mb-4">
          {description}
        </CardDescription>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleFeatureClick}
        >
          Explore Feature
        </Button>
      </CardContent>
    </Card>
  );
};

interface FeatureHighlightsProps {
  features?: FeatureCardProps[];
  title?: string;
  subtitle?: string;
}

const FeatureHighlights = ({
  features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Niche Analysis",
      description:
        "Discover profitable ebook niches based on real Gumroad sales data and market trends.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Content Creation",
      description:
        "Generate high-quality ebook content with AI, including titles, outlines, and full chapters.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Automated Publishing",
      description:
        "Seamlessly publish your ebooks to Gumroad with optimized product details and SEO.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Performance Tracking",
      description:
        "Monitor your ebook sales, reviews, and engagement metrics in real-time.",
    },
  ],
  title = "Key Features",
  subtitle = "Everything you need to create and sell successful ebooks",
}: FeatureHighlightsProps) => {
  return (
    <section className="w-full bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
