// Portfolio Image Metadata Storage
export interface PortfolioImage {
  id: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  title: string;
  location: string;
  category: string[];
  uploadedAt: string;
}

// This will be stored in a JSON file that acts as our database
export const PORTFOLIO_DATA_PATH = 'data/portfolio.json';
