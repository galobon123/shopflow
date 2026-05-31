package com.Proyect.Ecommerce.dto.user;

import com.Proyect.Ecommerce.model.Role;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
}