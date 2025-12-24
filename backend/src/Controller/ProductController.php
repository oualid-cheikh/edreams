<?php

namespace App\Controller;

use App\Dto\ProductQueryDto;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    #[Route('/', name: 'get_products', methods: ['GET'])]
    public function getProducts(
        Request $request,
        ProductRepository $repository,
        #[MapQueryString(
            validationFailedStatusCode: Response::HTTP_BAD_REQUEST
        )] ProductQueryDto $dto,
    ): JsonResponse {
        
        $products = $repository->findAll($dto->sort);

        return $this->json($products);
    }

    #[Route('/{id}', name: 'get_product', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function getProduct(int $id, ProductRepository $repository): JsonResponse
    {
        $product = $repository->findById($id);

        if (null === $product) {
            return new JsonResponse(
                ['error' => 'Product not found'],
                Response::HTTP_NOT_FOUND
            );
        }

        return $this->json($product);
    }

    #[Route('/search', name: 'search_products', methods: ['GET'])]
    public function searchProducts(
        Request $request,
        ProductRepository $repository,
        #[MapQueryString(
            validationGroups: ['Default', 'ProductSearch'],
            validationFailedStatusCode: Response::HTTP_BAD_REQUEST
        )] ProductQueryDto $dto,
    ): JsonResponse {
        $products = $repository->findByPriceRange($dto->minPrice, $dto->maxPrice, $dto->sort);

        return $this->json($products);
    }
}
