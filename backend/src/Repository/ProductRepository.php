<?php

namespace App\Repository;

use App\Entity\Product;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class ProductRepository
{
    public function __construct(
        #[Autowire(param: 'kernel.project_dir')]
        private string $rootdir,
    ) {
    }

    public function findAll(?string $sort): array
    {
        $products = $this->parseProducts();

        if ($sort) {
            $products = $this->sortProducts($products, $sort);
        }

        return $products;
    }

    public function findById(int $id): ?Product
    {
        $products = $this->parseProducts();
        foreach ($products as $product) {
            if ($product->getId() === $id) {
                return $product;
            }
        }

        return null;
    }

    public function findByPriceRange(float $minPrice, float $maxPrice, ?string $sort): array
    {
        $products = $this->parseProducts();
        $products = array_filter($products, function (Product $product) use ($minPrice, $maxPrice) {
            $price = $product->getPrice();

            if ($price < $minPrice) {
                return false;
            }

            if ($price > $maxPrice) {
                return false;
            }

            return true;
        });

        if ($sort) {
            $products = $this->sortProducts($products, $sort);
        }

        return $products;
    }

    private function sortProducts(array $products, string $sort): array
    {
        usort($products, function (Product $a, Product $b) use ($sort) {
            return match ($sort) {
                'price_asc' => $a->getPrice() <=> $b->getPrice(),
                'price_desc' => $b->getPrice() <=> $a->getPrice(),
                default => 0,
            };
        });

        return $products;
    }

    private function parseProducts()
    {
        $products = \json_decode(file_get_contents("{$this->rootdir}/data.json"), true);

        $productsObjects = [];
        foreach ($products as $element) {
            $productsObjects[] = new Product(
                $element['id'],
                $element['name'],
                $element['price'],
                new \DateTimeImmutable($element['createdAt'])
            );
        }

        return $productsObjects;
    }
}
