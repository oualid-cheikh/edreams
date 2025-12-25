'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);
    
    router.push(params.toString() ? `/?${params.toString()}` : '/');
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    router.push('/');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrer les produits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Prix minimum
          </label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AB6] focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Prix maximum
          </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000"
            className="w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AB6] focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AB6] focus:border-transparent appearance-none bg-white cursor-pointer"
          >
            <option value="">Par défaut</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </div>
        
        <div className="flex items-end gap-2">
          <button
            onClick={handleFilter}
            className="flex-1 bg-[#6B9AB6] hover:bg-[#5A8AA5] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 active:scale-95"
          >
            Filtrer
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}