package com.Proyect.Ecommerce.dto.user;

import com.Proyect.Ecommerce.model.Role;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
