<?php

namespace App\Service;

use App\Entity\Product;
use App\Repository\ProductRepository;

class ProductService
{
    private ProductRepository $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAllProducts(?string $sort = null): array
    {
        $products = $this->repository->findAll();
        
        if ($sort !== null) {
            $products = $this->sortProducts($products, $sort);
        }
        
        return array_map(fn(Product $p) => $p->toArray(), $products);
    }

    public function getProductById(int $id): ?array
    {
        $product = $this->repository->findById($id);
        return $product ? $product->toArray() : null;
    }

    public function searchProducts(?float $minPrice, ?float $maxPrice, ?string $sort = null): array
    {
        $products = $this->repository->findByPriceRange($minPrice, $maxPrice);
        
        if ($sort !== null) {
            $products = $this->sortProducts($products, $sort);
        }
        
        return array_map(fn(Product $p) => $p->toArray(), $products);
    }

    private function sortProducts(array $products, string $sort): array
    {
        usort($products, function (Product $a, Product $b) use ($sort) {
            if ($sort === 'price_asc') {
                return $a->getPrice() <=> $b->getPrice();
            }
            
            if ($sort === 'price_desc') {
                return $b->getPrice() <=> $a->getPrice();
            }
            
            return 0;
        });
        
        return $products;
    }

    public function validatePriceParams(?string $minPrice, ?string $maxPrice): array
    {
        $errors = [];
        
        if ($minPrice !== null && !is_numeric($minPrice)) {
            $errors[] = 'minPrice must be a valid number';
        }
        
        if ($maxPrice !== null && !is_numeric($maxPrice)) {
            $errors[] = 'maxPrice must be a valid number';
        }
        
        if ($minPrice !== null && $maxPrice !== null) {
            if ((float)$minPrice > (float)$maxPrice) {
                $errors[] = 'minPrice cannot be greater than maxPrice';
            }
        }
        
        return $errors;
    }

    public function validateSortParam(?string $sort): ?string
    {
        if ($sort === null) {
            return null;
        }
        
        $allowedSorts = ['price_asc', 'price_desc'];
        
        if (!in_array($sort, $allowedSorts)) {
            return 'sort must be either price_asc or price_desc';
        }
        
        return null;
    }
}