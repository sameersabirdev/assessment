export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: Rating;
};

export type ViewTab = "dashboard" | "form";
