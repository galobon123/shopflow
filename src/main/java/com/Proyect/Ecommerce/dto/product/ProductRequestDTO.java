package com.Proyect.Ecommerce.dto.product;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequestDTO {
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Long categoryId;
}
