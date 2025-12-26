"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productsRef.current &&
        !productsRef.current.contains(event.target as Node)
      ) {
        setIsProductsOpen(false);
      }
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setIsAboutOpen(false);
      }
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setIsContactOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productCategories = [
    { name: "Claviers", icon: "⌨️" },
    { name: "Souris", icon: "🖱️" },
    { name: "Écrans", icon: "🖥️" },
    { name: "Casques", icon: "🎧" },
    { name: "Webcams", icon: "📷" },
  ];

  return (
    <header className="bg-[#6B9AB6] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-white/90 transition-colors"
          >
            eDreams
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* PRODUITS avec dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => {
                  setIsProductsOpen(!isProductsOpen);
                  setIsAboutOpen(false);
                  setIsContactOpen(false);
                }}
                className="text-white hover:text-white/80 font-medium transition-colors uppercase text-sm tracking-wide flex items-center gap-1"
              >
                PRODUITS
                <svg
                  className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Catégories
                    </p>
                  </div>
                  {productCategories.map((category) => (
                    <Link
                      key={category.name}
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-gray-700 font-medium">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* À PROPOS avec dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => {
                  setIsAboutOpen(!isAboutOpen);
                  setIsProductsOpen(false);
                  setIsContactOpen(false);
                }}
                className="text-white hover:text-white/80 font-medium transition-colors uppercase text-sm tracking-wide flex items-center gap-1"
              >
                À PROPOS
                <svg
                  className={`w-4 h-4 transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isAboutOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    eDreams Factory
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Spécialiste de la vente en ligne de produits high-tech. Nous
                    proposons une sélection d'équipements pour gamers et
                    professionnels : claviers, souris, écrans, casques et
                    webcams de qualité premium.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      🎯 Votre setup, notre passion
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CONTACT avec dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => {
                  setIsContactOpen(!isContactOpen);
                  setIsProductsOpen(false);
                  setIsAboutOpen(false);
                }}
                className="text-white hover:text-white/80 font-medium transition-colors uppercase text-sm tracking-wide flex items-center gap-1"
              >
                CONTACT
                <svg
                  className={`w-4 h-4 transition-transform ${isContactOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isContactOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Contactez-nous
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#6B9AB6] mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a
                          href="mailto:edreamsfactory@gmail.com"
                          className="text-[#6B9AB6] hover:text-[#5A8AA5] font-medium text-sm break-all"
                        >
                          edreamsfactory@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Notre équipe vous répond sous 24h
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
