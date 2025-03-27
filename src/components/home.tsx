import { useNavigate } from "react-router-dom";
import HeroSection from "./dashboard/HeroSection";
import FeatureHighlights from "./dashboard/FeatureHighlights";
import RecentProjects from "./dashboard/RecentProjects";
import { Button } from "@/components/ui/button";

function Home() {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <HeroSection
          title="Create Popular Ebooks with AI!"
          subtitle="Discover the best niches, create quality content, and upload to Gumroad in minutes."
          ctaText="Start Now"
          onCtaClick={handleStartNow}
          className="mb-12"
          showTags={true}
        />

        <FeatureHighlights
          title="Key Features"
          subtitle="Everything you need to create and sell successful ebooks"
          className="my-16"
        />

        <div className="text-center my-16">
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your ebook journey?
          </h2>
          <Button
            size="lg"
            onClick={handleStartNow}
            className="px-8 py-6 text-lg h-auto"
          >
            Get Started for Free
          </Button>
        </div>

        <RecentProjects className="my-16" />
      </div>
    </div>
  );
}

export default Home;
