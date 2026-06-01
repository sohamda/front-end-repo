export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
