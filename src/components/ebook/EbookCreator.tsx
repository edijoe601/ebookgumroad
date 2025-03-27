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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateEbookContent } from "@/lib/api";
import { Loader2, Plus, Trash } from "lucide-react";
import { EbookOutline } from "@/types/ebook";

interface EbookCreatorProps {
  onComplete: (content: string) => void;
  selectedNiche?: string;
}

const EbookCreator = ({
  onComplete,
  selectedNiche = "",
}: EbookCreatorProps) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState<string[]>([
    "Introduction",
    "Chapter 1",
    "Conclusion",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addChapter = () => {
    setChapters([...chapters, `Chapter ${chapters.length}`]);
  };

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const updateChapter = (index: number, value: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = value;
    setChapters(updatedChapters);
  };

  const handleGenerate = async () => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your ebook",
        variant: "destructive",
      });
      return;
    }

    if (chapters.length < 2) {
      toast({
        title: "Insufficient Chapters",
        description: "Please add at least 2 chapters to your outline",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateEbookContent(title, chapters);
      onComplete(result.content);
      toast({
        title: "Content Generated",
        description: "Your ebook content has been successfully generated",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate ebook content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Your Ebook</CardTitle>
        <CardDescription>
          {step === 1
            ? "Start by giving your ebook a compelling title"
            : "Outline the chapters of your ebook"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Ebook Title</Label>
              <Input
                id="title"
                placeholder="e.g. The Ultimate Guide to Digital Marketing"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {selectedNiche && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">
                  Selected Niche: {selectedNiche}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your ebook will be optimized for this niche
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Chapters</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addChapter}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Chapter
              </Button>
            </div>
            <div className="space-y-3">
              {chapters.map((chapter, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={chapter}
                    onChange={(e) => updateChapter(index, e.target.value)}
                    placeholder={`Chapter ${index + 1}`}
                  />
                  {chapters.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChapter(index)}
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 ? (
          <>
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => setStep(2)}
              disabled={!title.trim()}
            >
              Next: Outline Chapters
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Content with AI"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default EbookCreator;
