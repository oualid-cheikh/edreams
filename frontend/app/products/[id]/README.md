# Catalogue de Produits - Application Full-Stack PHP/Next.js

Application web de gestion et consultation d'un catalogue de produits high-tech, développée avec une architecture moderne séparant backend API REST et frontend.

---

## Présentation du Projet

Cette application permet de consulter un catalogue de 5 produits avec les fonctionnalités suivantes :

- Affichage de la liste complète des produits
- Consultation du détail d'un produit spécifique
- Recherche par plage de prix (minimum et maximum)
- Tri par prix (croissant ou décroissant)
- Gestion complète des erreurs (produit non trouvé, paramètres invalides)

---

## Technologies Utilisées

### Backend - API REST

**PHP 8.1+**
- Langage serveur pour l'API REST

**Symfony 7 (architecture minimale)**
- `symfony/http-foundation` : Gestion des requêtes et réponses HTTP
- `symfony/routing` : Système de routage
- `symfony/serializer` : Transformation des objets en JSON
- `symfony/validator` : Validation des paramètres de requête
- `nelmio/cors-bundle` : Gestion des requêtes cross-origin

**Architecture**
- Pattern Repository pour la séparation des responsabilités
- DTO (Data Transfer Object) pour la validation déclarative
- Pas de base de données (données stockées dans un fichier JSON)

### Frontend - Interface Utilisateur

**Next.js 15**
- Framework React avec App Router
- Server-Side Rendering (SSR) pour l'optimisation SEO

**TypeScript**
- Typage statique pour plus de robustesse et de maintenabilité

**Tailwind CSS**
- Framework CSS utility-first pour un design moderne et responsive

---

## Structure du Projet

```
projet/
├── backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   └── ProductController.php    # Routes API
│   │   ├── Dto/
│   │   │   └── ProductQueryDto.php      # Validation des paramètres
│   │   ├── Entity/
│   │   │   └── Product.php              # Modèle de données
│   │   └── Repository/
│   │       └── ProductRepository.php    # Accès aux données
│   ├── config/
│   │   ├── packages/
│   │   │   └── nelmio_cors.yaml        # Configuration CORS
│   │   ├── routes.yaml                  # Configuration des routes
│   │   └── services.yaml                # Injection de dépendances
│   ├── public/
│   │   └── index.php                    # Point d'entrée
│   ├── data.json                        # Base de données (5 produits)
│   └── composer.json                    # Dépendances PHP
│
└── frontend/
    ├── app/
    │   ├── layout.tsx                   # Layout global (Header + Footer)
    │   ├── page.tsx                     # Page d'accueil avec liste produits
    │   ├── not-found.tsx                # Page 404
    │   └── products/[id]/
    │       └── page.tsx                 # Page détail produit
    ├── components/
    │   ├── Header.tsx                   # En-tête avec navigation
    │   ├── Footer.tsx                   # Pied de page
    │   ├── ProductCard.tsx              # Carte produit
    │   └── ProductFilters.tsx           # Filtres (prix, tri)
    ├── lib/
    │   └── api.ts                       # Client API (fonctions fetch)
    └── package.json                     # Dépendances JavaScript
```

---

## Installation et Lancement

### Prérequis

- PHP 8.1 ou supérieur
- Composer (gestionnaire de dépendances PHP)
- Node.js 18 ou supérieur
- npm

### Installation du Backend

```bash
# Accéder au dossier backend
cd backend

# Installer les dépendances PHP
composer install

# Lancer le serveur de développement PHP
php -S localhost:8000 -t public
```

L'API est accessible sur : `http://localhost:8000/api`

### Installation du Frontend

```bash
# Ouvrir un nouveau terminal
# Accéder au dossier frontend
cd frontend

# Installer les dépendances Node.js
npm install

# Lancer le serveur de développement Next.js
npm run dev
```

L'application est accessible sur : `http://localhost:3000`

---

## Documentation de l'API

### Routes Disponibles

#### 1. Liste complète des produits

```http
GET /api/products
```

**Paramètres optionnels :**
- `sort` : Tri des résultats (`price_asc` ou `price_desc`)

**Exemple :**
```bash
curl http://localhost:8000/api/products?sort=price_asc
```

**Réponse (200 OK) :**
```json
[
  {
    "id": 1,
    "name": "Clavier mécanique",
    "price": 129.99,
    "createdAt": "2024-01-10"
  },
  {
    "id": 2,
    "name": "Souris gaming",
    "price": 59.99,
    "createdAt": "2024-01-12"
  }
]
```

---

#### 2. Détail d'un produit

```http
GET /api/products/{id}
```

**Exemple :**
```bash
curl http://localhost:8000/api/products/1
```

**Réponse (200 OK) :**
```json
{
  "id": 1,
  "name": "Clavier mécanique",
  "price": 129.99,
  "createdAt": "2024-01-10"
}
```

**Réponse (404 Not Found) :**
```json
{
  "error": "Product not found"
}
```

---

#### 3. Recherche avec filtres

```http
GET /api/products/search
```

**Paramètres :**
- `minPrice` (optionnel) : Prix minimum (nombre positif ou zéro)
- `maxPrice` (optionnel) : Prix maximum (nombre positif, doit être supérieur à minPrice)
- `sort` (optionnel) : Tri (`price_asc` ou `price_desc`)

**Exemple :**
```bash
curl "http://localhost:8000/api/products/search?minPrice=50&maxPrice=150&sort=price_asc"
```

**Réponse (200 OK) :**
```json
[
  {
    "id": 2,
    "name": "Souris gaming",
    "price": 59.99,
    "createdAt": "2024-01-12"
  },
  {
    "id": 5,
    "name": "Webcam HD",
    "price": 79.99,
    "createdAt": "2024-01-20"
  },
  {
    "id": 4,
    "name": "Casque audio",
    "price": 89.99,
    "createdAt": "2024-01-18"
  },
  {
    "id": 1,
    "name": "Clavier mécanique",
    "price": 129.99,
    "createdAt": "2024-01-10"
  }
]
```

---

### Gestion des Erreurs

#### Erreur 400 - Paramètres Invalides

**Exemple : Paramètres non numériques**
```bash
curl "http://localhost:8000/api/products/search?minPrice=abc"
```

**Réponse :**
```json
{
  "errors": [
    "minPrice must be a valid number"
  ]
}
```

**Exemple : minPrice supérieur à maxPrice**
```bash
curl "http://localhost:8000/api/products/search?minPrice=200&maxPrice=100"
```

**Réponse :**
```json
{
  "errors": [
    "minPrice cannot be greater than maxPrice"
  ]
}
```

**Exemple : Tri invalide**
```bash
curl "http://localhost:8000/api/products?sort=invalid"
```

**Réponse :**
```json
{
  "error": "sort must be either price_asc or price_desc"
}
```

#### Erreur 404 - Produit Non Trouvé

```bash
curl http://localhost:8000/api/products/999
```

**Réponse :**
```json
{
  "error": "Product not found"
}
```

---

## Fonctionnalités Frontend

### Navigation
- En-tête avec logo et menus déroulants
- Menu Produits avec catégories
- Menu À Propos avec description
- Menu Contact avec informations

### Page d'Accueil
- Affichage des 5 produits en grille responsive
- Filtrage par prix minimum et maximum
- Tri par prix croissant ou décroissant
- Compteur de produits trouvés
- Message si aucun produit ne correspond aux critères

### Page Détail Produit
- Affichage complet : nom, prix, date d'ajout
- Informations supplémentaires : référence, disponibilité
- Description du produit
- Bouton retour vers la liste

### Footer
- Informations sur le site
- Liste des catégories de produits
- Liens rapides
- Informations de contact

---

## Choix Techniques

### Pourquoi Symfony Minimal (sans API Platform) ?

**Avantages :**
- Contrôle total du code : chaque ligne est maîtrisée et explicable
- Légèreté : seulement les composants nécessaires
- Architecture claire : Pattern Repository visible et maintenable
- Pas de sur-ingénierie pour un projet de cette taille

**API Platform aurait apporté :**
- Doctrine ORM (inutile sans base de données)
- Swagger/OpenAPI auto-généré (complexité non demandée)
- Serialization groups complexes (non nécessaire ici)
- Plus difficile à expliquer et à maintenir

### Pourquoi Next.js avec Server-Side Rendering ?

**Avantages :**
- SEO optimisé : les produits sont dans le HTML initial (essentiel pour un catalogue)
- Performance : affichage instantané sans page blanche
- Standard moderne : utilisé par les grandes plateformes e-commerce
- App Router : architecture moderne et maintenable

**React seul (Client-Side Rendering) aurait eu :**
- Mauvais référencement (page vide au chargement initial)
- Expérience utilisateur dégradée (loader visible)
- Moins adapté pour un site catalogue

### Pattern Repository

**Séparation des responsabilités :**
```
Controller → Reçoit la requête HTTP et valide les paramètres
     ↓
Repository → Récupère les données du fichier JSON
     ↓
Controller → Retourne la réponse JSON
```

**Avantage :** Si demain on passe à une vraie base de données (MySQL, PostgreSQL), seul le `ProductRepository` doit être modifié. Le reste du code reste identique.

### Validation avec DTO (Data Transfer Object)

Au lieu de valider manuellement dans le Controller, on utilise un DTO avec attributs Symfony :

```php
class ProductQueryDto {
    #[Assert\PositiveOrZero]
    public ?float $minPrice = null;
    
    #[Assert\GreaterThan(propertyPath: 'minPrice')]
    public ?float $maxPrice = null;
}
```

**Avantages :**
- Validation déclarative (on décrit ce qu'on veut)
- Réutilisable et testable
- Messages d'erreur automatiques
- Code plus propre et maintenable

---

## Données du Catalogue

Le catalogue contient 5 produits codés dans `backend/data.json` :

| ID | Nom | Prix | Date d'ajout |
|----|-----|------|--------------|
| 1 | Clavier mécanique | 129.99 | 2024-01-10 |
| 2 | Souris gaming | 59.99 | 2024-01-12 |
| 3 | Écran 27 pouces | 299.99 | 2024-01-15 |
| 4 | Casque audio | 89.99 | 2024-01-18 |
| 5 | Webcam HD | 79.99 | 2024-01-20 |

---

## Tests Manuels

### Test 1 : Liste complète
```bash
curl http://localhost:8000/api/products
```
Résultat attendu : 5 produits retournés

### Test 2 : Tri croissant
```bash
curl "http://localhost:8000/api/products?sort=price_asc"
```
Résultat attendu : Souris gaming (59.99) en premier

### Test 3 : Filtrage par prix
```bash
curl "http://localhost:8000/api/products/search?minPrice=50&maxPrice=150"
```
Résultat attendu : 4 produits (Souris, Webcam, Casque, Clavier)

### Test 4 : Produit spécifique
```bash
curl http://localhost:8000/api/products/1
```
Résultat attendu : Détails du Clavier mécanique

### Test 5 : Erreur 404
```bash
curl http://localhost:8000/api/products/999
```
Résultat attendu : Message d'erreur "Product not found"

### Test 6 : Validation des paramètres
```bash
curl "http://localhost:8000/api/products/search?minPrice=abc"
```
Résultat attendu : Erreur 400 avec message explicite

---

## Configuration CORS

Le backend autorise les requêtes depuis n'importe quelle origine en développement :

```yaml
# backend/config/packages/nelmio_cors.yaml
nelmio_cors:
    defaults:
        allow_origin: ['*']
        allow_methods: ['GET', 'OPTIONS']
        allow_headers: ['Content-Type', 'Authorization']
```

En production, il faudrait remplacer `['*']` par l'URL exacte du frontend pour plus de sécurité.

---

## Notes Importantes

### Pas de Base de Données

Les produits sont stockés dans un fichier JSON (`backend/data.json`). Ce choix a été fait pour :
- Simplifier le setup (pas de configuration MySQL/PostgreSQL nécessaire)
- Respecter les contraintes du projet (pas de base de données demandée)
- Faciliter la démonstration et les tests

Pour migrer vers une vraie base de données, il suffit de modifier la classe `ProductRepository.php` pour utiliser Doctrine ORM ou PDO. Le reste du code reste inchangé grâce au pattern Repository.

### Warnings d'Hydratation en Développement

Des warnings peuvent apparaître dans la console navigateur concernant l'hydratation React. Ces warnings sont causés par des extensions navigateur (gestionnaires de mots de passe, Bitwarden) qui modifient le DOM en ajoutant des attributs.

Ces warnings :
- Ne concernent que l'environnement de développement
- N'affectent pas le fonctionnement de l'application
- N'apparaissent pas en production
- Peuvent être évités en utilisant le mode navigation privée

---

## Récapitulatif des Technologies

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| PHP | 8.1+ | Langage backend |
| Symfony | 7.x | Framework PHP |
| Composer | 2.x | Gestionnaire de dépendances PHP |
| Node.js | 18+ | Runtime JavaScript |
| Next.js | 15.x | Framework React |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.x | Framework CSS |
| React | 19.x | Bibliothèque UI |