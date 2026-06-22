package com.Proyect.Ecommerce.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Proyect.Ecommerce.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);

    List<Product> findByActiveTrue();

    List<Product> findByPriceBetween(BigDecimal min, BigDecimal max);

    List<Product> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Product> findByCategoryId(Long categoryId);
}
