package com.Proyect.Ecommerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Proyect.Ecommerce.dto.wishlist.WishListResponseDTO;
import com.Proyect.Ecommerce.service.WishListService;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {
    private final WishListService wishListService;

    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @GetMapping
    public ResponseEntity<List<WishListResponseDTO>> getWishlist(Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        return ResponseEntity.ok(wishListService.getWishlist(userId));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable Long productId, Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        wishListService.addToWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long productId, Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        wishListService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Boolean> isInWishlist(@PathVariable Long productId, Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        return ResponseEntity.ok(wishListService.isInWishlist(userId, productId));
    }
}
