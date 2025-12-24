<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use App\Repository\ProductRepository as RepositoryProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{

    #[Route('/', name: 'get_products', methods: ['GET'])]
    public function getProducts(Request $request,ProductRepository $repository): JsonResponse
    {
        $sort = $request->query->get('sort');
        
        /*$sortError = $this->productService->validateSortParam($sort);
        if ($sortError) {
            return new JsonResponse(['error' => $sortError], Response::HTTP_BAD_REQUEST);
        }*/
        
        $products = $repository->findAll($sort);
        
        return $this->json($products);
    }

    #[Route('/{id}', name: 'get_product', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function getProduct(int $id,ProductRepository $repository): JsonResponse
    {
        $product = $repository->findById($id);
        
        if ($product === null) {
            return new JsonResponse(
                ['error' => 'Product not found'],
                Response::HTTP_NOT_FOUND
            );
        }
        
         return $this->json($product);
    }

    #[Route('/search', name: 'search_products', methods: ['GET'])]
    public function searchProducts(Request $request,ProductRepository $repository): JsonResponse
    {
        $minPrice = $request->query->get('minPrice');
        $maxPrice = $request->query->get('maxPrice');
        $sort = $request->query->get('sort');
        
       /* $priceErrors = $this->productService->validatePriceParams($minPrice, $maxPrice);
        if (!empty($priceErrors)) {
            return new JsonResponse(['errors' => $priceErrors], Response::HTTP_BAD_REQUEST);
        }
        
        $sortError = $this->productService->validateSortParam($sort);
        if ($sortError) {
            return new JsonResponse(['error' => $sortError], Response::HTTP_BAD_REQUEST);
        }*/
        
        $minPriceFloat = $minPrice !== null ? floatval($minPrice) : null;
        $maxPriceFloat = $maxPrice !== null ? floatval($maxPrice) : null;
        
        $products = $repository->findByPriceRange($minPriceFloat, $maxPriceFloat, $sort);
        
          // return $this->json($products,Response::HTTP_OK,['groups' => ['product:get']]);
                     return $this->json($products);

    }
}