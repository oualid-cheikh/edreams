<?php
namespace App\Dto;

use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class ProductQueryDto
{
    public function __construct(
        #[Assert\NotBlank(groups:['ProductSearch'])]
        #[Assert\PositiveOrZero(groups:['ProductSearch'])]
        public ?float $minPrice = null,

        #[Assert\GreaterThan( propertyPath:'minPrice',groups:['ProductSearch'])]
        #[Assert\NotBlank(groups:['ProductSearch'])]
        #[Assert\PositiveOrZero(groups:['ProductSearch'])]
        public ?float $maxPrice = null,

        #[Assert\Choice(choices: ['price_asc', 'price_desc'])]
        public ?string $sort = null,
    ) {
    }
}
