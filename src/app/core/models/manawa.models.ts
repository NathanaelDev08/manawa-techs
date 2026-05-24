export interface Service {
  id: number; title: string; description: string; icon: string; category: string;
}
export interface Pack {
  id: number; name: string; price: number; currency: string;
  features: string[]; category: string; categoryName: string;
  popular?: boolean; customPrice?: boolean;
}
export interface FAQ {
  question: string; answer: string;
}
export interface Founder {
  name: string; title: string; description: string; skills: string[];
}
