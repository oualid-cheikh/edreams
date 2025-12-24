<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class ProductController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    #[Route('/products', name: 'get_products', methods: ['GET'])]
    public function getProducts(Request $request): JsonResponse
    {
        $sort = $request->query->get('sort');
        
        $sortError = $this->productService->validateSortParam($sort);
        if ($sortError) {
            return new JsonResponse(['error' => $sortError], Response::HTTP_BAD_REQUEST);
        }
        
        $products = $this->productService->getAllProducts($sort);
        
        return new JsonResponse($products);
    }

    #[Route('/products/{id}', name: 'get_product', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function getProduct(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        
        if ($product === null) {
            return new JsonResponse(
                ['error' => 'Product not found'],
                Response::HTTP_NOT_FOUND
            );
        }
        
        return new JsonResponse($product);
    }

    #[Route('/products/search', name: 'search_products', methods: ['GET'])]
    public function searchProducts(Request $request): JsonResponse
    {
        $minPrice = $request->query->get('minPrice');
        $maxPrice = $request->query->get('maxPrice');
        $sort = $request->query->get('sort');
        
        $priceErrors = $this->productService->validatePriceParams($minPrice, $maxPrice);
        if (!empty($priceErrors)) {
            return new JsonResponse(['errors' => $priceErrors], Response::HTTP_BAD_REQUEST);
        }
        
        $sortError = $this->productService->validateSortParam($sort);
        if ($sortError) {
            return new JsonResponse(['error' => $sortError], Response::HTTP_BAD_REQUEST);
        }
        
        $minPriceFloat = $minPrice !== null ? (float)$minPrice : null;
        $maxPriceFloat = $maxPrice !== null ? (float)$maxPrice : null;
        
        $products = $this->productService->searchProducts($minPriceFloat, $maxPriceFloat, $sort);
        
        return new JsonResponse($products);
    }
}