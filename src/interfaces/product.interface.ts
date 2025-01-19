export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  thumbnail: string;
  tags: string[];
  rating: number;
  availabilityStatus: string;
  stock: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


export type ProductCategoryResponse = ProductCategory[];

export type ProductCategory = string;