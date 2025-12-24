<?php

namespace App\Repository;

use App\Entity\Product;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class ProductRepository
{
    public function __construct(
        #[Autowire(param: 'kernel.project_dir')]
        private string  $rootdir
    )
    {
    }



    public function findAll(?string $sort): array
    {
        $products=$this->parseProducts();
        if ($sort){
            $this->sortProducts($products,$sort);
        }

        return $products;
    }

    public function findById(int $id): ?Product
    {
         $products=$this->parseProducts();
        foreach ($products as $product) {
            if ($product->getId() === $id) {
                return $product;
            }
        }
        return null;
    }

    public function findByPriceRange(?float $minPrice, ?float $maxPrice,?string $sort): array
    {
        $products=$this->parseProducts();
        $products = array_filter($products, function (Product $product) use ($minPrice, $maxPrice) {
            $price = $product->getPrice();
            
            if ($minPrice !== null && $price < $minPrice) {
                return false;
            }
            
            if ($maxPrice !== null && $price > $maxPrice) {
                return false;
            }
            
            return true;
        });

        if ($sort){
            $this->sortProducts($products,$sort);
        }
        
        return $products ; 


    }
     private function sortProducts(array $products, string $sort): void
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
        
        
    }
    private function parseProducts(){
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