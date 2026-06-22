export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl?: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryName: string;
  active: boolean;
  createdAt: string;
  imageUrl?: string;
}