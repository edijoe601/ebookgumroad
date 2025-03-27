import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectStatus {
  label: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  coverImage: string;
  status: "draft" | "published" | "in-progress";
  lastUpdated: string;
  salesCount?: number;
}

interface RecentProjectsProps {
  projects?: Project[];
  className?: string;
}

const statusConfig: Record<string, ProjectStatus> = {
  draft: { label: "Draft", color: "bg-yellow-100 text-yellow-800" },
  published: { label: "Published", color: "bg-green-100 text-green-800" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800" },
};

const RecentProjects = ({
  projects = defaultProjects,
  className,
}: RecentProjectsProps) => {
  return (
    <div
      className={cn("w-full max-w-7xl mx-auto px-4 py-8 bg-white", className)}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Projects</h2>
        <Button variant="outline" className="flex items-center gap-2">
          View All <ArrowRight size={16} />
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Start creating your first ebook project
          </p>
          <Button className="mt-4">Create New Ebook</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 w-full">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusConfig[project.status].color,
                    )}
                  >
                    {statusConfig[project.status].label}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock size={14} />
                  {project.lastUpdated}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.status === "published" && (
                  <p className="text-sm text-gray-500">
                    {project.salesCount} sales
                  </p>
                )}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  {project.status === "published"
                    ? "View Details"
                    : "Continue Editing"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Default projects for when no props are provided
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Passive Income",
    coverImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    status: "published",
    lastUpdated: "Updated 2 days ago",
    salesCount: 128,
  },
  {
    id: "2",
    title: "Mastering Digital Marketing in 2023",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    status: "draft",
    lastUpdated: "Updated 5 days ago",
  },
  {
    id: "3",
    title: "AI for Beginners: A Comprehensive Introduction",
    coverImage:
      "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&q=80",
    status: "in-progress",
    lastUpdated: "Updated yesterday",
  },
];

export default RecentProjects;
