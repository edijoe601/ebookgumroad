export interface Ebook {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  content: string;
  price: number;
  status: "draft" | "published" | "in-progress";
  lastUpdated: string;
  salesCount?: number;
  categories: string[];
  tags: string[];
}

export interface EbookChapter {
  title: string;
  content: string;
}

export interface EbookOutline {
  title: string;
  chapters: string[];
}
