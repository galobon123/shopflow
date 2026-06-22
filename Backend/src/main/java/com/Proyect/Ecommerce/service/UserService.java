package com.Proyect.Ecommerce.service;

import com.Proyect.Ecommerce.dto.user.UserRequestDTO;
import com.Proyect.Ecommerce.dto.user.UserResponseDTO;
import com.Proyect.Ecommerce.model.User;
import com.Proyect.Ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public UserResponseDTO findById(Long id) {
        return toResponseDTO(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id)));
    }

    public UserResponseDTO save(UserRequestDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
        return toResponseDTO(userRepository.save(user));
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserResponseDTO> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end) {
        return userRepository.findByCreatedAtBetween(start, end)
                .stream().map(this::toResponseDTO).toList();
    }

    private UserResponseDTO toResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}