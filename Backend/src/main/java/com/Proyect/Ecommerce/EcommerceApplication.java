package com.Proyect.Ecommerce;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class EcommerceApplication {

	@PostConstruct
    public void init() {
        // Fuerza a la aplicación a usar UTC antes de conectar con Postgres
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

}
