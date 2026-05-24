export interface Testimonial {
  id?: string;
  clientName: string;
  clientCompany?: string;
  clientPhoto?: string;
  content: string;
  rating: number;
  serviceName: string;
  isActive: boolean;
  createdAt: Date;
}
