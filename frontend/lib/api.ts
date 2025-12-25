const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
}

export async function getProducts(sort?: string): Promise<Product[]> {
  const url = sort ? `${API_URL}/products?sort=${sort}` : `${API_URL}/products`;
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Product not found');
  }
  
  return res.json();
}

export async function searchProducts(
  minPrice?: number,
  maxPrice?: number,
  sort?: string
): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
  if (sort) params.append('sort', sort);
  
  const url = `${API_URL}/products/search?${params.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to search products');
  }
  
  return res.json();
}