export interface NicheData {
  name: string;
  growth: string;
  avgPrice: string;
  salesVolume: string;
  competition: "Low" | "Medium" | "High";
  icon?: React.ReactNode;
  description?: string;
  topSellingProducts?: {
    title: string;
    price: string;
    sales: number;
  }[];
  keywords?: string[];
  recommendedTopics?: string[];
}
