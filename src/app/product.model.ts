export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  landOfOrigin: string;
  inStock: number;
  owner: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
