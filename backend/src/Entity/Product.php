<?php

namespace App\Entity;

class Product
{
    private int $id;
    private string $name;
    private float $price;
    private \DateTimeInterface $createdAt;

    public function __construct(int $id, string $name, float $price, string $createdAt)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->createdAt = new \DateTime($createdAt);
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'createdAt' => $this->createdAt->format('Y-m-d'),
        ];
    }
}