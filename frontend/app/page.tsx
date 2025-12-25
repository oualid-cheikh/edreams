import { Suspense } from 'react';
import { getProducts, searchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

async function getFilteredProducts(searchParams: SearchParams) {
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const sort = searchParams.sort;

  if (minPrice !== undefined || maxPrice !== undefined) {
    return searchProducts(minPrice, maxPrice, sort);
  }
  
  return getProducts(sort);
}

function Hero() {
  return (
    <div className="text-center mb-12 py-8">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Catalogue eDreams
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto">
        Découvrez notre sélection de produits high-tech premium
      </p>
    </div>
  );
}

function ProductsGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-xl text-white font-medium">Aucun produit trouvé</p>
        <p className="text-white/70 mt-2">Essayez de modifier vos filtres</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-sm text-white/80 font-medium">
        {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams;
  let products;
  
  try {
    products = await getFilteredProducts(resolvedSearchParams);
  } catch (error) {
    return (
      <div className="bg-[#6B9AB6] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Erreur de chargement</h2>
            <p className="text-white/80">Impossible de charger les produits</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#6B9AB6] min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <Hero />
        
        <Suspense fallback={<div>Chargement...</div>}>
          <ProductFilters />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <ProductsGrid products={products} />
        </Suspense>
      </div>
    </div>
  );
}