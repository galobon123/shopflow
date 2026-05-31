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
        try {
            List<ProductResponseDTO> products = productService.findAll();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        try {
            ProductResponseDTO product = productService.findById(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> findByCategoryId(@PathVariable Long categoryId) {
        try {
            List<ProductResponseDTO> products = productService.findByCategoryId(categoryId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/priceRange/{min}/{max}")
    public ResponseEntity<List<ProductResponseDTO>> findByPriceRange(@PathVariable BigDecimal min, @PathVariable BigDecimal max) {
        try {
            List<ProductResponseDTO> products = productService.findByPriceBetween(min, max);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/timeRange/{min}/{max}")
    public ResponseEntity<List<ProductResponseDTO>> findByCreatedBetween(@PathVariable LocalDateTime min, @PathVariable LocalDateTime max) {
        try {
            List<ProductResponseDTO> products = productService.findByCreatedAtBetween(min, max);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<ProductResponseDTO>> findActive() {
        try {
            List<ProductResponseDTO> products = productService.findActive();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ProductResponseDTO> findByName(@PathVariable String name) {
        try {
            ProductResponseDTO product = productService.findByName(name);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateById(@PathVariable Long id) {
        try {
            productService.deactivateById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> save(@RequestBody ProductRequestDTO productRequest) {
        try {
            ProductResponseDTO savedProduct = productService.save(productRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
