export interface PackFeature {
  name: string;
  included: boolean;
}

export interface Pack {
  id?: string;
  name: string;
  category: 'SITE VITRINE' | 'E-COMMERCE' | 'APPLICATION WEB' | 'SEO' | 'DESIGN' | 'SOCIAL MEDIA';
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  features: PackFeature[];
  isPopular: boolean;
  isActive: boolean;
  deliveryDays: number;
  whatsappMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
