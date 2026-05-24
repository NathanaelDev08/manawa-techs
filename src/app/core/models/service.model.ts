export interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
