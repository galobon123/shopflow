package com.Proyect.Ecommerce.dto.auth;

import com.Proyect.Ecommerce.model.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequestDTO {
    @NotBlank @Size(min = 2, max = 100)
    private String name;
    @NotBlank @Email
    private String email;
    @NotBlank @Size(min = 8)
    private String password;
    @NotNull
    private Role role;
}