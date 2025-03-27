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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Ebook } from "@/types/ebook";
import { Save, Image, Book, Tag, DollarSign } from "lucide-react";

interface EbookEditorProps {
  initialData?: Partial<Ebook>;
  onSave: (ebook: Partial<Ebook>) => void;
}

const EbookEditor = ({ initialData = {}, onSave }: EbookEditorProps) => {
  const [ebook, setEbook] = useState<Partial<Ebook>>({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    price: 9.99,
    tags: [],
    categories: [],
    ...initialData,
  });

  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEbook({ ...ebook, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setEbook({ ...ebook, price: isNaN(value) ? 0 : value });
  };

  const addTag = () => {
    if (newTag && !ebook.tags?.includes(newTag)) {
      setEbook({ ...ebook, tags: [...(ebook.tags || []), newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setEbook({ ...ebook, tags: ebook.tags?.filter((t) => t !== tag) });
  };

  const addCategory = () => {
    if (newCategory && !ebook.categories?.includes(newCategory)) {
      setEbook({
        ...ebook,
        categories: [...(ebook.categories || []), newCategory],
      });
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setEbook({
      ...ebook,
      categories: ebook.categories?.filter((c) => c !== category),
    });
  };

  const handleSubmit = () => {
    if (!ebook.title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your ebook",
        variant: "destructive",
      });
      return;
    }

    if (!ebook.content) {
      toast({
        title: "Missing Content",
        description: "Your ebook needs content",
        variant: "destructive",
      });
      return;
    }

    onSave(ebook);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Your Ebook</CardTitle>
        <CardDescription>
          Refine your ebook details before publishing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <Book className="h-4 w-4" /> Details
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1">
              <Book className="h-4 w-4" /> Content
            </TabsTrigger>
            <TabsTrigger value="cover" className="flex items-center gap-1">
              <Image className="h-4 w-4" /> Cover
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> Metadata
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" /> Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={ebook.title}
                onChange={handleChange}
                placeholder="Enter your ebook title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={ebook.description}
                onChange={handleChange}
                placeholder="Write a compelling description"
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={ebook.content}
                onChange={handleChange}
                placeholder="Your ebook content"
                rows={15}
                className="font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="cover" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={ebook.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            {ebook.coverImage && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-md overflow-hidden w-48 h-64">
                  <img
                    src={ebook.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="metadata" className="space-y-4">
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add a category"
                />
                <Button type="button" onClick={addCategory} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ebook.categories?.map((category) => (
                  <div
                    key={category}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ebook.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-primary/70 hover:text-primary ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.99"
                value={ebook.price}
                onChange={handlePriceChange}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} className="flex items-center gap-2">
          <Save className="h-4 w-4" /> Save Ebook
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EbookEditor;
