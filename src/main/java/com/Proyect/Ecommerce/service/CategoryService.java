package com.Proyect.Ecommerce.service;

import com.Proyect.Ecommerce.dto.category.CategoryRequestDTO;
import com.Proyect.Ecommerce.dto.category.CategoryResponseDTO;
import com.Proyect.Ecommerce.model.Category;
import com.Proyect.Ecommerce.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponseDTO> findAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public CategoryResponseDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada: " + id));
        return toResponseDTO(category);
    }

    public CategoryResponseDTO save(CategoryRequestDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return toResponseDTO(categoryRepository.save(category));
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO toResponseDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        return dto;
    }
}