package com.Proyect.Ecommerce.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Proyect.Ecommerce.dto.product.ProductRequestDTO;
import com.Proyect.Ecommerce.dto.product.ProductResponseDTO;
import com.Proyect.Ecommerce.model.Category;
import com.Proyect.Ecommerce.model.Product;
import com.Proyect.Ecommerce.repository.CategoryRepository;
import com.Proyect.Ecommerce.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public List<ProductResponseDTO> findActive() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public ProductResponseDTO findById(Long id) {
        return toResponseDTO(productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + id)));
    }

    public ProductResponseDTO findByName(String name) {
        return toResponseDTO(productRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + name)));
    }

    public List<ProductResponseDTO> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream().map(this::toResponseDTO).toList();
    }

    public List<ProductResponseDTO> findByPriceBetween(BigDecimal min, BigDecimal max) {
        return productRepository.findByPriceBetween(min, max)
                .stream().map(this::toResponseDTO).toList();
    }

    public List<ProductResponseDTO> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end) {
        return productRepository.findByCreatedAtBetween(start, end)
                .stream().map(this::toResponseDTO).toList();
    }

    public ProductResponseDTO save(ProductRequestDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada: " + dto.getCategoryId()));
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(category);
        return toResponseDTO(productRepository.save(product));
    }

    public void deactivateById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + id));
        product.setActive(false);
        productRepository.save(product);
    }

    private ProductResponseDTO toResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCategoryName(product.getCategory().getName());
        dto.setActive(product.isActive());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }
}
