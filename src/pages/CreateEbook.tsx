import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import EbookCreator from "@/components/ebook/EbookCreator";
import EbookEditor from "@/components/ebook/EbookEditor";
import PublishToGumroad from "@/components/ebook/PublishToGumroad";
import GumroadLogin from "@/components/auth/GumroadLogin";
import { Ebook } from "@/types/ebook";
import { ArrowLeft, Book, Edit, Upload } from "lucide-react";

const CreateEbook = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [ebook, setEbook] = useState<Partial<Ebook>>({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    price: 9.99,
    status: "draft",
    lastUpdated: new Date().toISOString(),
    tags: [],
    categories: [],
  });
  const [showGumroadLogin, setShowGumroadLogin] = useState(false);
  const [isGumroadConnected, setIsGumroadConnected] = useState(false);

  const handleContentGenerated = (content: string) => {
    setEbook({ ...ebook, content });
    setStep(2);
  };

  const handleEbookSave = (updatedEbook: Partial<Ebook>) => {
    const newEbook = {
      ...updatedEbook,
      lastUpdated: new Date().toISOString(),
      status: "draft",
    };
    setEbook(newEbook);
    toast({
      title: "Ebook Saved",
      description: "Your ebook has been saved as a draft",
    });
    setStep(3);
  };

  const handlePublish = () => {
    if (!isGumroadConnected) {
      setShowGumroadLogin(true);
      return;
    }
    setStep(3);
  };

  const handleGumroadLoginSuccess = () => {
    setIsGumroadConnected(true);
    setShowGumroadLogin(false);
    setStep(3);
  };

  const handlePublishSuccess = (publishedEbookId: string) => {
    toast({
      title: "Published Successfully",
      description: "Your ebook has been published to Gumroad",
    });
    navigate("/my-ebooks");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="mr-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Ebook
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and publish your ebook to Gumroad
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Tabs value={`step-${step}`} className="w-full">
            <TabsList className="w-full justify-start mb-8">
              <TabsTrigger
                value="step-1"
                onClick={() => step > 1 && setStep(1)}
                disabled={step < 1}
                className="flex items-center"
              >
                <Book className="mr-2 h-4 w-4" />
                1. Generate Content
              </TabsTrigger>
              <TabsTrigger
                value="step-2"
                onClick={() => step > 2 && setStep(2)}
                disabled={step < 2}
                className="flex items-center"
              >
                <Edit className="mr-2 h-4 w-4" />
                2. Edit & Format
              </TabsTrigger>
              <TabsTrigger
                value="step-3"
                onClick={() => step > 3 && setStep(3)}
                disabled={step < 3}
                className="flex items-center"
              >
                <Upload className="mr-2 h-4 w-4" />
                3. Publish
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="mt-6">
              <EbookCreator onComplete={handleContentGenerated} />
            </TabsContent>

            <TabsContent value="step-2" className="mt-6">
              <EbookEditor initialData={ebook} onSave={handleEbookSave} />
            </TabsContent>

            <TabsContent value="step-3" className="mt-6">
              <PublishToGumroad
                ebook={ebook as Ebook}
                onSuccess={handlePublishSuccess}
                onCancel={() => setStep(2)}
              />
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={showGumroadLogin} onOpenChange={setShowGumroadLogin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect to Gumroad</DialogTitle>
              <DialogDescription>
                You need to connect your Gumroad account to publish your ebook
              </DialogDescription>
            </DialogHeader>
            <GumroadLogin
              onSuccess={handleGumroadLoginSuccess}
              onCancel={() => setShowGumroadLogin(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateEbook;
