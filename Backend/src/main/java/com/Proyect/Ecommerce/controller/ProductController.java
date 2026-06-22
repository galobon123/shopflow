package com.Proyect.Ecommerce.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Proyect.Ecommerce.dto.product.ProductRequestDTO;
import com.Proyect.Ecommerce.dto.product.ProductResponseDTO;
import com.Proyect.Ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> findAll() {
        List<ProductResponseDTO> products = productService.findAll();
        return ResponseEntity.ok(products);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        ProductResponseDTO product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> findByCategoryId(@PathVariable Long categoryId) {
        List<ProductResponseDTO> products = productService.findByCategoryId(categoryId);
        return ResponseEntity.ok(products);

    }

    @GetMapping("/priceRange/{min}/{max}")
    public ResponseEntity<List<ProductResponseDTO>> findByPriceRange(@PathVariable BigDecimal min, @PathVariable BigDecimal max) {
        List<ProductResponseDTO> products = productService.findByPriceBetween(min, max);
        return ResponseEntity.ok(products);

    }

    @GetMapping("/timeRange/{min}/{max}")
    public ResponseEntity<List<ProductResponseDTO>> findByCreatedBetween(@PathVariable LocalDateTime min, @PathVariable LocalDateTime max) {
        List<ProductResponseDTO> products = productService.findByCreatedAtBetween(min, max);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/active")
    public ResponseEntity<List<ProductResponseDTO>> findActive() {
        List<ProductResponseDTO> products = productService.findActive();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ProductResponseDTO> findByName(@PathVariable String name) {
        ProductResponseDTO product = productService.findByName(name);
        return ResponseEntity.ok(product);
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateById(@PathVariable Long id) {
        productService.deactivateById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> save(@RequestBody ProductRequestDTO productRequest) {
        ProductResponseDTO savedProduct = productService.save(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

}
