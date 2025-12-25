import { getProduct } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  if (isNaN(id)) {
    notFound();
  }

  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="bg-[#6B9AB6] min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link 
          href="/"
          className="inline-flex items-center text-white hover:text-white/80 font-medium mb-8 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux produits
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#6B9AB6] to-[#5A8AA5] p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center text-white/90">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Disponible depuis le {formatDate(product.createdAt)}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#6B9AB6]/10 to-[#6B9AB6]/5 rounded-xl p-6 border-2 border-[#6B9AB6]/20">
                  <p className="text-sm font-medium text-gray-600 mb-2">Prix</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-[#6B9AB6]">
                      {product.price.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-500 ml-2">€</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Référence</p>
                    <p className="text-lg font-semibold text-gray-900">
                      PROD-{product.id.toString().padStart(5, '0')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Disponibilité</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-lg font-semibold text-green-600">En stock</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#6B9AB6] hover:bg-[#5A8AA5] text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl">
                Acheter maintenant
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.name} est un produit de haute qualité conçu pour répondre à tous vos besoins. 
                  Profitez d'une expérience exceptionnelle avec ce produit premium qui allie performance, 
                  design élégant et fiabilité. Idéal pour un usage quotidien, ce produit vous accompagnera 
                  dans toutes vos activités.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}