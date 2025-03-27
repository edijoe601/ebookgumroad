import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { publishToGumroad } from "@/lib/api";
import { Ebook } from "@/types/ebook";
import { Loader2, Upload } from "lucide-react";

interface PublishToGumroadProps {
  ebook: Ebook;
  onSuccess: (publishedEbookId: string) => void;
  onCancel: () => void;
}

const PublishToGumroad = ({
  ebook,
  onSuccess,
  onCancel,
}: PublishToGumroadProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [options, setOptions] = useState({
    generatePdf: true,
    optimizeSeo: true,
    addWatermark: false,
  });
  const { toast } = useToast();

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      const result = await publishToGumroad({
        ...ebook,
        status: "published",
      });

      toast({
        title: "Published Successfully",
        description: "Your ebook has been published to Gumroad",
      });

      onSuccess(result.id);
    } catch (error) {
      toast({
        title: "Publishing Failed",
        description: "Failed to publish to Gumroad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Publish to Gumroad</CardTitle>
        <CardDescription>
          Your ebook will be published to your Gumroad account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Ebook Details</h3>
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium">{ebook.title}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Price: ${ebook.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Publishing Options</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="generatePdf"
                checked={options.generatePdf}
                onCheckedChange={() => handleOptionChange("generatePdf")}
              />
              <Label htmlFor="generatePdf" className="text-sm">
                Generate PDF from content
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="optimizeSeo"
                checked={options.optimizeSeo}
                onCheckedChange={() => handleOptionChange("optimizeSeo")}
              />
              <Label htmlFor="optimizeSeo" className="text-sm">
                Optimize SEO for Gumroad
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="addWatermark"
                checked={options.addWatermark}
                onCheckedChange={() => handleOptionChange("addWatermark")}
              />
              <Label htmlFor="addWatermark" className="text-sm">
                Add watermark to PDF
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Publish to Gumroad
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PublishToGumroad;
