import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  BookOpen,
  Edit,
  Eye,
  BarChart,
  Plus,
  Trash2,
  RefreshCw,
  Upload,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { fetchUserEbooks } from "@/lib/api";
import { Ebook } from "@/types/ebook";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";

const MyEbooks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isGumroadConnected, requireGumroadAuth } = useGumroadAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [ebooks, setEbooks] = useState<Ebook[]>(allEbooks);

  useEffect(() => {
    if (isGumroadConnected) {
      fetchEbooks();
    }
  }, [isGumroadConnected]);

  const fetchEbooks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUserEbooks();
      setEbooks(data);
      toast({
        title: "Ebooks Updated",
        description: "Your ebooks have been synced with Gumroad",
      });
    } catch (error) {
      toast({
        title: "Failed to Fetch Ebooks",
        description: "Could not retrieve your ebooks from Gumroad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (requireGumroadAuth()) {
      fetchEbooks();
    }
  };

  const handleCreateEbook = () => {
    if (requireGumroadAuth("/create-ebook")) {
      navigate("/create-ebook");
    }
  };

  const handleEditEbook = (id: string) => {
    if (requireGumroadAuth(`/edit-ebook/${id}`)) {
      navigate(`/edit-ebook/${id}`);
    }
  };

  const handleViewEbook = (id: string) => {
    if (requireGumroadAuth()) {
      // Open in new tab or navigate to view page
      window.open(`https://gumroad.com/l/${id}`, "_blank");
    }
  };

  const handleDeleteEbook = (id: string) => {
    if (requireGumroadAuth()) {
      setShowDeleteConfirm(id);
    }
  };

  const confirmDeleteEbook = async () => {
    if (!showDeleteConfirm) return;

    // In a real app, you would call an API to delete the ebook
    setEbooks(ebooks.filter((ebook) => ebook.id !== showDeleteConfirm));

    toast({
      title: "Ebook Deleted",
      description: "Your ebook has been deleted",
    });

    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Ebooks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your ebook projects
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
              {isLoading ? "Syncing..." : "Sync with Gumroad"}
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handleCreateEbook}
            >
              <Plus className="h-4 w-4" />
              Create New Ebook
            </Button>
          </div>
        </div>

        {!isGumroadConnected && (
          <Card className="mb-6 border-dashed border-2 border-primary/20">
            <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
              <div>
                <h3 className="text-lg font-semibold">Connect to Gumroad</h3>
                <p className="text-muted-foreground mt-1">
                  Connect your Gumroad account to sync and publish your ebooks
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

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Ebooks</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ebooks.map((ebook, index) => (
                <EbookCard
                  key={index}
                  ebook={ebook}
                  onEdit={() => handleEditEbook(ebook.id || "")}
                  onView={() => handleViewEbook(ebook.id || "")}
                  onDelete={() => handleDeleteEbook(ebook.id || "")}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ebooks
                .filter((ebook) => ebook.status === "published")
                .map((ebook, index) => (
                  <EbookCard
                    key={index}
                    ebook={ebook}
                    onEdit={() => handleEditEbook(ebook.id || "")}
                    onView={() => handleViewEbook(ebook.id || "")}
                    onDelete={() => handleDeleteEbook(ebook.id || "")}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ebooks
                .filter(
                  (ebook) =>
                    ebook.status === "draft" || ebook.status === "in-progress",
                )
                .map((ebook, index) => (
                  <EbookCard
                    key={index}
                    ebook={ebook}
                    onEdit={() => handleEditEbook(ebook.id || "")}
                    onView={() => handleViewEbook(ebook.id || "")}
                    onDelete={() => handleDeleteEbook(ebook.id || "")}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!showDeleteConfirm}
          onOpenChange={() => setShowDeleteConfirm(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this ebook? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteEbook}>
                Delete Ebook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface EbookCardProps {
  ebook: Ebook;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

const EbookCard = ({ ebook, onEdit, onView, onDelete }: EbookCardProps) => {
  const statusConfig = {
    draft: { label: "Draft", color: "bg-yellow-100 text-yellow-800" },
    published: { label: "Published", color: "bg-green-100 text-green-800" },
    "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <img
          src={ebook.coverImage}
          alt={ebook.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[ebook.status].color}`}
          >
            {statusConfig[ebook.status].label}
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{ebook.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{ebook.lastUpdated}</p>
      </CardHeader>
      <CardContent>
        {ebook.status === "published" && (
          <p className="text-sm flex items-center gap-1">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            {ebook.salesCount} sales
          </p>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex gap-2">
        {ebook.status === "published" ? (
          <>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-1"
              onClick={onView}
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-1"
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-1"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center w-10 h-10 p-0"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

// Default ebooks for when no props are provided
const allEbooks: Ebook[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Passive Income",
    description:
      "Learn how to generate passive income through multiple channels",
    coverImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    content: "# Introduction\n\nPassive income is...",
    price: 29.99,
    status: "published",
    lastUpdated: "Updated 2 days ago",
    salesCount: 128,
    categories: ["Finance", "Business"],
    tags: ["passive income", "investing", "side hustle"],
  },
  {
    id: "2",
    title: "Mastering Digital Marketing in 2023",
    description: "A comprehensive guide to digital marketing strategies",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    content: "# Digital Marketing Overview\n\nIn today's digital age...",
    price: 24.99,
    status: "draft",
    lastUpdated: "Updated 5 days ago",
    categories: ["Marketing", "Business"],
    tags: ["digital marketing", "SEO", "social media"],
  },
  {
    id: "3",
    title: "AI for Beginners: A Comprehensive Introduction",
    description: "Learn the fundamentals of artificial intelligence",
    coverImage:
      "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&q=80",
    content: "# What is Artificial Intelligence?\n\nAI refers to...",
    price: 19.99,
    status: "in-progress",
    lastUpdated: "Updated yesterday",
    categories: ["Technology", "Education"],
    tags: ["AI", "machine learning", "technology"],
  },
];

export default MyEbooks;
