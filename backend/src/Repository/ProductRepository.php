<?php

namespace App\Repository;

use App\Entity\Product;

class ProductRepository
{
    private array $products;

    public function __construct()
    {
        $this->products = [
            new Product(1, 'Clavier mécanique', 129.99, '2024-01-10'),
            new Product(2, 'Souris gaming', 59.99, '2024-01-12'),
            new Product(3, 'Écran 27 pouces', 299.99, '2024-01-15'),
            new Product(4, 'Casque audio', 89.99, '2024-01-18'),
            new Product(5, 'Webcam HD', 79.99, '2024-01-20'),
        ];
    }

    public function findAll(): array
    {
        return $this->products;
    }

    public function findById(int $id): ?Product
    {
        foreach ($this->products as $product) {
            if ($product->getId() === $id) {
                return $product;
            }
        }
        return null;
    }

    public function findByPriceRange(?float $minPrice, ?float $maxPrice): array
    {
        return array_filter($this->products, function (Product $product) use ($minPrice, $maxPrice) {
            $price = $product->getPrice();
            
            if ($minPrice !== null && $price < $minPrice) {
                return false;
            }
            
            if ($maxPrice !== null && $price > $maxPrice) {
                return false;
            }
            
            return true;
        });
    }
}