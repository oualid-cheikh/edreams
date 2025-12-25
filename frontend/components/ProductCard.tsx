import Link from 'next/link';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#6B9AB6]/50"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#6B9AB6] transition-colors mb-4 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-[#6B9AB6]">
              {product.price.toFixed(2)}
            </span>
            <span className="text-xl text-gray-500 ml-1">€</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Voir détails</span>
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}