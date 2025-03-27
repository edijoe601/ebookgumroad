import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/dashboard/HeroSection";
import FeatureHighlights from "@/components/dashboard/FeatureHighlights";
import RecentProjects from "@/components/dashboard/RecentProjects";
import { Button } from "@/components/ui/button";
import { Plus, PieChart, Settings, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateEbook = () => {
    navigate("/my-ebooks");
  };

  const handleExploreNiches = () => {
    navigate("/niche-analysis");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="mb-8 flex flex-wrap gap-4">
            <Button
              className="flex items-center gap-2"
              size="lg"
              onClick={handleCreateEbook}
            >
              <Plus className="h-5 w-5" />
              Create New Ebook
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              size="lg"
              onClick={handleExploreNiches}
            >
              <PieChart className="h-5 w-5" />
              Explore Niches
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 ml-auto"
              size="sm"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </div>

          {/* Hero Section */}
          <HeroSection
            title="Welcome to Your Dashboard"
            subtitle="Create, manage, and track your ebook projects all in one place."
            ctaText="Create New Ebook"
            onCtaClick={handleCreateEbook}
          />

          {/* Feature Highlights */}
          <div className="my-12">
            <FeatureHighlights
              title="Tools & Features"
              subtitle="Everything you need to create successful ebooks"
            />
          </div>

          {/* Recent Projects */}
          <div className="mt-12">
            <RecentProjects />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
