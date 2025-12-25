import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productCategories = [
    'Claviers mécaniques',
    'Souris gaming',
    'Écrans 27 pouces',
    'Casques audio',
    'Webcams HD'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 : À propos */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">eDreams</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Votre destination en ligne pour l'équipement high-tech. 
              Claviers, souris, écrans et accessoires gaming de qualité.
            </p>
          </div>

          {/* Colonne 2 : Produits */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nos Produits</h4>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category}>
                  <Link 
                    href="/"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Liens rapides */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#6B9AB6] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:edreamsfactory@gmail.com"
                  className="text-sm hover:text-white transition-colors break-all"
                >
                  edreamsfactory@gmail.com
                </a>
              </div>
              <p className="text-xs text-gray-500">
                Réponse sous 24h
              </p>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} eDreams Factory. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}