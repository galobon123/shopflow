package com.Proyect.Ecommerce.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Proyect.Ecommerce.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

    List<User> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
