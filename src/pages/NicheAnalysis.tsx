import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  PieChart,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { fetchNicheAnalytics } from "@/lib/api";
import { NicheData } from "@/types/niche";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";

const NicheAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isGumroadConnected, requireGumroadAuth } = useGumroadAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<NicheData | null>(null);
  const [niches, setNiches] = useState({
    trending: trendingNiches,
    profitable: profitableNiches,
    competition: competitionNiches,
  });

  useEffect(() => {
    if (isGumroadConnected) {
      fetchNicheData();
    }
  }, [isGumroadConnected]);

  const fetchNicheData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNicheAnalytics();
      setNiches({
        trending: data.trending.map(addIconToNiche),
        profitable: data.profitable.map(addIconToNiche),
        competition: data.competition.map(addIconToNiche),
      });
      toast({
        title: "Data Updated",
        description: "Niche analysis data has been updated from Gumroad",
      });
    } catch (error) {
      toast({
        title: "Failed to Fetch Data",
        description: "Could not retrieve niche data from Gumroad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addIconToNiche = (niche: NicheData) => ({
    ...niche,
    icon: <BarChart className="h-5 w-5 text-primary" />,
  });

  const handleRefresh = () => {
    if (requireGumroadAuth()) {
      fetchNicheData();
    }
  };

  const handleExploreNiche = (niche: NicheData) => {
    if (requireGumroadAuth()) {
      setSelectedNiche(niche);
    }
  };

  const handleCreateEbookFromNiche = () => {
    if (selectedNiche && requireGumroadAuth("/create-ebook")) {
      navigate("/create-ebook", {
        state: { selectedNiche: selectedNiche.name },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Niche Analysis
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover profitable ebook niches based on real Gumroad market data
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {!isGumroadConnected && (
          <Card className="mb-6 border-dashed border-2 border-primary/20">
            <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Connect to Gumroad for Real-Time Data
                </h3>
                <p className="text-muted-foreground mt-1">
                  Get accurate niche analysis based on real Gumroad sales data
                </p>
              </div>
              <Button
                className="mt-4 md:mt-0"
                onClick={() => setShowGumroadLogin(true)}
              >
                Connect Gumroad Account
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="trending">
          <TabsList className="mb-6">
            <TabsTrigger value="trending">Trending Niches</TabsTrigger>
            <TabsTrigger value="profitable">Most Profitable</TabsTrigger>
            <TabsTrigger value="competition">Competition Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niches.trending.map((niche, index) => (
                <NicheCard
                  key={index}
                  niche={niche}
                  onExplore={() => handleExploreNiche(niche)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profitable" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niches.profitable.map((niche, index) => (
                <NicheCard
                  key={index}
                  niche={niche}
                  onExplore={() => handleExploreNiche(niche)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niches.competition.map((niche, index) => (
                <NicheCard
                  key={index}
                  niche={niche}
                  onExplore={() => handleExploreNiche(niche)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!selectedNiche}
          onOpenChange={() => setSelectedNiche(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedNiche?.name}</DialogTitle>
              <DialogDescription>
                Detailed analysis and recommendations for this niche
              </DialogDescription>
            </DialogHeader>

            {selectedNiche && (
              <div className="mt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Growth
                        </span>
                        <span className="text-sm font-medium flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          {selectedNiche.growth}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg. Price
                        </span>
                        <span className="text-sm font-medium">
                          {selectedNiche.avgPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Sales Volume
                        </span>
                        <span className="text-sm font-medium">
                          {selectedNiche.salesVolume}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Competition
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${competitionColor[selectedNiche.competition]}`}
                        >
                          {selectedNiche.competition}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Recommended Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedNiche.recommendedTopics ? (
                          selectedNiche.recommendedTopics.map(
                            (topic, index) => (
                              <li key={index} className="text-sm">
                                • {topic}
                              </li>
                            ),
                          )
                        ) : (
                          <>
                            <li className="text-sm">
                              • The Ultimate Guide to {selectedNiche.name}
                            </li>
                            <li className="text-sm">
                              • {selectedNiche.name} for Beginners
                            </li>
                            <li className="text-sm">
                              • Advanced {selectedNiche.name} Strategies
                            </li>
                            <li className="text-sm">
                              • {selectedNiche.name} Case Studies
                            </li>
                            <li className="text-sm">
                              • {selectedNiche.name} Tools and Resources
                            </li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Top Selling Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedNiche.topSellingProducts ? (
                        selectedNiche.topSellingProducts.map(
                          (product, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-2 border-b last:border-0"
                            >
                              <span className="font-medium">
                                {product.title}
                              </span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                  {product.sales} sales
                                </span>
                                <span className="text-sm font-medium">
                                  {product.price}
                                </span>
                              </div>
                            </div>
                          ),
                        )
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Connect your Gumroad account to see top selling
                          products in this niche
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    onClick={handleCreateEbookFromNiche}
                    className="flex items-center gap-2"
                  >
                    Create Ebook in This Niche
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface NicheCardProps {
  niche: NicheData;
  onExplore: () => void;
}

const NicheCard = ({ niche, onExplore }: NicheCardProps) => {
  const competitionColor = {
    Low: "text-green-600 bg-green-100",
    Medium: "text-yellow-600 bg-yellow-100",
    High: "text-red-600 bg-red-100",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{niche.name}</CardTitle>
          <div className="p-2 rounded-full bg-primary/10">{niche.icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Growth</span>
            <span className="text-sm font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {niche.growth}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Avg. Price</span>
            <span className="text-sm font-medium">{niche.avgPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Sales Volume</span>
            <span className="text-sm font-medium">{niche.salesVolume}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Competition</span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${competitionColor[niche.competition]}`}
            >
              {niche.competition}
            </span>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={onExplore}>
          Explore Niche
        </Button>
      </CardContent>
    </Card>
  );
};

const competitionColor = {
  Low: "text-green-600 bg-green-100",
  Medium: "text-yellow-600 bg-yellow-100",
  High: "text-red-600 bg-red-100",
};

const trendingNiches: NicheData[] = [
  {
    name: "AI Productivity",
    growth: "+45%",
    avgPrice: "$24.99",
    salesVolume: "High",
    competition: "Medium",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "AI Tools for Daily Productivity",
      "Automating Your Workflow with AI",
      "AI for Content Creators",
      "ChatGPT Productivity Hacks",
      "AI Tools for Small Business Owners",
    ],
  },
  {
    name: "Digital Minimalism",
    growth: "+38%",
    avgPrice: "$19.99",
    salesVolume: "Medium",
    competition: "Low",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Digital Decluttering Guide",
      "Minimalist Productivity Systems",
      "Focus in the Age of Distraction",
      "Digital Detox Strategies",
      "Mindful Technology Usage",
    ],
  },
  {
    name: "Creator Economy",
    growth: "+52%",
    avgPrice: "$29.99",
    salesVolume: "High",
    competition: "High",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Monetizing Your Audience",
      "Building a Personal Brand",
      "Content Creation Strategies",
      "From Creator to Entrepreneur",
      "Sustainable Creator Business Models",
    ],
  },
];

const profitableNiches: NicheData[] = [
  {
    name: "Personal Finance",
    growth: "+28%",
    avgPrice: "$34.99",
    salesVolume: "High",
    competition: "High",
    icon: <PieChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Investing for Beginners",
      "Debt-Free Living Strategies",
      "Financial Independence Guide",
      "Retirement Planning Essentials",
      "Smart Money Management",
    ],
  },
  {
    name: "Sustainable Living",
    growth: "+22%",
    avgPrice: "$27.99",
    salesVolume: "Medium",
    competition: "Medium",
    icon: <PieChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Zero-Waste Home Guide",
      "Sustainable Shopping Practices",
      "Eco-Friendly Lifestyle Changes",
      "Green Living on a Budget",
      "Sustainable Food Choices",
    ],
  },
  {
    name: "Remote Work",
    growth: "+41%",
    avgPrice: "$32.99",
    salesVolume: "High",
    competition: "Medium",
    icon: <PieChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Remote Work Productivity",
      "Setting Up Your Home Office",
      "Remote Team Management",
      "Work-Life Balance for Remote Workers",
      "Finding Remote Job Opportunities",
    ],
  },
];

const competitionNiches: NicheData[] = [
  {
    name: "Mental Wellness",
    growth: "+18%",
    avgPrice: "$22.99",
    salesVolume: "Medium",
    competition: "Low",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Daily Mindfulness Practices",
      "Anxiety Management Techniques",
      "Building Mental Resilience",
      "Digital Wellness Strategies",
      "Sleep Optimization Guide",
    ],
  },
  {
    name: "No-Code Development",
    growth: "+35%",
    avgPrice: "$39.99",
    salesVolume: "Medium",
    competition: "Low",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Building Apps Without Code",
      "No-Code Business Automation",
      "From Idea to Launch Without Coding",
      "No-Code Tools Comparison",
      "Monetizing Your No-Code Projects",
    ],
  },
  {
    name: "Side Hustles",
    growth: "+31%",
    avgPrice: "$24.99",
    salesVolume: "High",
    competition: "High",
    icon: <BarChart className="h-5 w-5 text-primary" />,
    recommendedTopics: [
      "Profitable Side Hustles for 2023",
      "From Side Hustle to Full-Time Business",
      "Passive Income Strategies",
      "Side Hustles for Different Skill Sets",
      "Managing Time Between Job and Side Hustle",
    ],
  },
];

export default NicheAnalysis;
