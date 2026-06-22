# ShopFlow — Agent Instructions

## Project Overview

ShopFlow is a full-stack e-commerce application built as a learning project at UTN FRC. The goal is to build a real, functional e-commerce system while learning industry-standard tools and practices hands-on.

**Primary learning objectives:** Spring Boot microservices, Angular SPA, JWT authentication, JPA/Hibernate, Docker, SOLID principles, REST API design.

---

## Repository Structure

```
shopflow/
├── back-end/          ← Spring Boot 4 / Java 21 API
└── shopflow-ui/       ← Angular 17+ SPA
```

---

## Backend — Spring Boot 4 / Java 21

### Tech Stack
- **Spring Boot 4** with Spring Web MVC
- **Spring Security 7** + JWT (jjwt 0.12.6)
- **Spring Data JPA** + Hibernate 7
- **PostgreSQL 16** (Docker container, port 5432)
- **Lombok** for boilerplate reduction
- **Bean Validation** (jakarta.validation)

### Package Structure
```
com.Proyect.Ecommerce/
├── controller/        ← HTTP layer only, no business logic
├── service/           ← Business logic, mapping, transactions
├── repository/        ← Data access interfaces (Spring Data JPA)
├── model/             ← JPA entities
├── dto/
│   ├── auth/          ← AuthRequestDTO, AuthResponseDTO, RegisterRequestDTO
│   ├── category/      ← CategoryRequestDTO, CategoryResponseDTO
│   ├── product/       ← ProductRequestDTO, ProductResponseDTO
│   └── user/          ← UserRequestDTO, UserResponseDTO
├── security/          ← JwtService, JwtAuthFilter, SecurityConfig, CorsConfig, UserDetailsServiceImpl
└── exception/         ← GlobalExceptionHandler
```

### Existing Entities

**User** — id, name, email, password (BCrypt), role (USER/ADMIN), createdAt
**Category** — id, name (unique), description
**Product** — id, name, description, price (BigDecimal), stock, category (ManyToOne LAZY), createdBy (ManyToOne LAZY), active (soft delete), imageUrl, createdAt

### Existing Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | Public | Register new user, returns JWT |
| POST | /api/auth/login | Public | Login, returns JWT |
| GET | /api/products | Public | All products |
| GET | /api/products/{id} | Public | Product by ID |
| GET | /api/products/active | Public | Active products only |
| GET | /api/products/name/{name} | Public | Product by name |
| GET | /api/products/category/{categoryId} | Public | Products by category |
| GET | /api/products/priceRange/{min}/{max} | Public | Products by price range |
| POST | /api/products | Authenticated | Create product |
| PUT | /api/products/{id}/deactivate | Authenticated | Soft delete |
| GET | /api/categories | Public | All categories |
| GET | /api/categories/{id} | Public | Category by ID |
| POST | /api/categories | Authenticated | Create category |
| DELETE | /api/categories/{id} | Authenticated | Delete category |
| GET | /api/users | ADMIN only | All users |
| GET | /api/users/{id} | ADMIN only | User by ID |
| POST | /api/users | ADMIN only | Create user |
| DELETE | /api/users/{id} | ADMIN only | Delete user |

### Security Configuration
- JWT stored in Authorization header as `Bearer <token>`
- Token contains: subject (email), role (ROLE_USER or ROLE_ADMIN), iat, exp
- Token expiration: 24 hours (86400000ms)
- Stateless sessions — no cookies, no server-side session
- CORS: allowed origin `http://localhost:4200`
- Timezone: UTC forced via `@PostConstruct` in main class

### Running the Backend
```bash
# Start PostgreSQL container
docker compose up db -d

# Run Spring Boot
./mvnw spring-boot:run
```

The app runs on `http://localhost:8080`.

---

## Frontend — Angular 17+ / Tailwind CSS

### Tech Stack
- **Angular 17+** with standalone components
- **Tailwind CSS** with `@tailwindcss/forms` plugin
- **RxJS** for reactive HTTP calls
- **Angular Signals** for state management

### Project Structure
```
src/app/
├── core/
│   ├── models/        ← TypeScript interfaces matching backend DTOs
│   │   ├── auth.model.ts
│   │   ├── product.model.ts
│   │   └── category.model.ts
│   ├── services/      ← HTTP services using HttpClient
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   └── category.service.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts   ← Adds JWT to every request automatically
│   └── guards/
│       └── auth.guard.ts         ← authGuard and adminGuard
├── features/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   └── products/
│       ├── product-list/         ← ProductsGrid component with category filter
│       └── product-form/
└── shared/
    └── components/
        └── navbar/
```

### Environment Config
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### Running the Frontend
```bash
cd shopflow-ui
ng serve
```

The app runs on `http://localhost:4200`.

---

## Coding Standards and Best Practices

### SOLID Principles — Applied

**Single Responsibility**
- Controllers only handle HTTP: receive request, call service, return response. No SQL, no business logic.
- Services contain all business logic: validation, mapping, transactions.
- Repositories only define data access queries.
- One service class per domain entity.

**Open/Closed**
- Add new behavior via new classes or methods, not by modifying existing ones.
- New entity types get their own Controller/Service/Repository — don't add product logic to CategoryService.

**Liskov Substitution**
- Depend on interfaces, not implementations. Use `UserDetailsService` (interface), not `UserDetailsServiceImpl` (class) where possible.

**Interface Segregation**
- DTOs are specific to their use case: separate Request and Response DTOs. Never reuse the same DTO for input and output.

**Dependency Inversion**
- Always inject dependencies via constructor, never use `new` inside a service or controller.
- Spring manages all bean lifecycle — don't instantiate Spring-managed classes manually.

### Backend Patterns

**DTO Mapping — always manual, in the Service layer**
```java
// CORRECT — map inside the service while the JPA session is open
private ProductResponseDTO toResponseDTO(Product product) {
    ProductResponseDTO dto = new ProductResponseDTO();
    dto.setId(product.getId());
    dto.setName(product.getName());
    dto.setCategoryName(product.getCategory().getName()); // safe: session open here
    dto.setImageUrl(product.getImageUrl());               // never skip fields
    // ... map ALL fields including new ones
    return dto;
}
```

**Critical rule: when you add a field to an entity, you must update in 3 places:**
1. The entity class (`model/`)
2. The request DTO (if it's an input field)
3. The response DTO AND the `toResponseDTO` mapper in the service

**Lazy Loading — never return entities from controllers**
- All `@ManyToOne` and `@OneToMany` use `FetchType.LAZY`
- Always use DTOs — never return JPA entities directly from controllers
- The `toResponseDTO` method is called inside the service while the session is open, so `product.getCategory().getName()` is safe there

**Exception Handling**
- Never use try/catch in controllers
- Throw `RuntimeException` with descriptive messages from services
- `GlobalExceptionHandler` catches and formats all errors centrally
- Return 400 for validation errors, 404 for not-found, 500 for unexpected

**Validation**
- All `@NotBlank`, `@NotNull`, `@Size`, `@Email`, `@DecimalMin`, `@Min` annotations go on the RequestDTO fields
- Always pair with `@Valid` on the `@RequestBody` parameter in the controller
- Validation messages in English

**Transactions**
- Use `@Transactional` on service methods that write to the database
- Never put `@Transactional` on controllers

**Soft Delete**
- Products are never deleted from the database — use `product.setActive(false)`
- Always filter with `findByActiveTrue()` for customer-facing queries

**Security**
- Passwords are always encoded with BCrypt before saving — never store plain text
- JWT tokens never include passwords or sensitive data
- Use `@PreAuthorize("hasRole('ADMIN')")` for admin-only operations
- CORS is configured at the Spring Security level, not with `@CrossOrigin`

**Naming Conventions**
- Entities: PascalCase singular (`Product`, not `Products`)
- Tables: snake_case plural (`products`, `categories`)
- DTOs: `EntityNameRequestDTO` / `EntityNameResponseDTO`
- Services: `EntityNameService`
- Repositories: `EntityNameRepository`
- Packages: all lowercase (`com.proyect.ecommerce` — ideally no uppercase)

### Angular Patterns

**Components**
- Always standalone components (`imports: [CommonModule, ...]`)
- Use `OnInit` lifecycle hook to load data, never in the constructor
- Use Angular Signals (`signal()`, `computed()`) for state — avoid manual change detection
- Template syntax: use `@if` / `@for` (Angular 17+), never `*ngIf` / `*ngFor`
- Always use `track` in `@for`: `@for (item of items(); track item.id)`

**Services**
- One service per backend resource (`ProductService`, `CategoryService`, `AuthService`)
- All HTTP calls return `Observable<T>` — never subscribe inside a service
- Subscribe only in components, inside `ngOnInit`
- Use the `tap` operator for side effects (storing tokens) without transforming the stream

**State with Signals**
```typescript
// Base signals for raw data
products = signal<ProductResponse[]>([]);
categories = signal<CategoryResponse[]>([]);
selectedCategory = signal<string | null>(null);
loading = signal<boolean>(true);

// Derived signals with computed() — recalculate automatically
filteredProducts = computed(() => {
  const cat = this.selectedCategory();
  return cat ? this.products().filter(p => p.categoryName === cat) : this.products();
});
```

**HTTP and Subscriptions**
```typescript
// CORRECT — subscribe in ngOnInit with next/error handlers
ngOnInit(): void {
  this.productService.getAll().subscribe({
    next: data => {
      this.products.set(data);
      this.loading.set(false);
    },
    error: err => {
      this.error.set('Error loading products');
      this.loading.set(false);
    }
  });
}

// WRONG — never subscribe inside a service, never assign Observable to signal directly
products = signal<ProductResponse[]>([this.productService.getAll()]); // BAD
```

**JWT Auth Flow**
- Token stored in `localStorage` after login/register
- `authInterceptor` attaches `Authorization: Bearer <token>` to every outgoing request
- `authGuard` blocks protected routes and redirects to `/login`
- `adminGuard` blocks admin routes and redirects to `/products`
- `AuthService.isLoggedIn()` checks for token presence
- `AuthService.isAdmin()` checks `role === 'ROLE_ADMIN'`

**TypeScript Interfaces**
- Mirror backend DTOs exactly — same field names, same types
- Use `number` for Java `Long`/`Integer`/`BigDecimal`
- Use `string` for Java `LocalDateTime` (ISO string from JSON)
- Optional fields use `?`: `description?: string`

**Tailwind CSS**
- Use utility classes directly in templates — no custom CSS unless unavoidable
- Responsive breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Grid layout: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Never use inline styles — always Tailwind utilities
- Form inputs use `@tailwindcss/forms` plugin classes

---

## Docker

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-bookworm   # bookworm has full timezone data
    container_name: shopflow-db
    environment:
      POSTGRES_DB: shopflow
      POSTGRES_USER: shopflow_user
      POSTGRES_PASSWORD: shopflow_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Common commands:**
```bash
docker compose up db -d          # start database in background
docker compose down              # stop (data preserved)
docker compose down -v           # stop and delete data volume
docker logs shopflow-db          # check database logs
```

---

## Common Mistakes to Avoid

**Backend**
- Forgetting to map new entity fields in `toResponseDTO()` — fields arrive null on the frontend
- Using try/catch in controllers — breaks the GlobalExceptionHandler
- Returning JPA entities instead of DTOs — causes LazyInitializationException or circular JSON
- `@Transactional` on controllers — it belongs on services
- Using `double`/`float` for money — always use `BigDecimal`
- Using `@Enumerated(EnumType.ORDINAL)` — always use `STRING`
- Running with `ddl-auto=create` in production — use `none` + Flyway migrations

**Angular**
- Assigning an Observable directly to a signal — must subscribe first
- Forgetting `track` in `@for` — causes rendering performance issues
- Using `*ngIf`/`*ngFor` instead of `@if`/`@for` (Angular 17+)
- Subscribing inside a service — subscribe only in components
- `text-2x1` instead of `text-2xl` (common Tailwind typo)
- Variable names starting with uppercase in `@for` — use camelCase
- Forgetting to register `provideHttpClient(withInterceptors([authInterceptor]))` in `app.config.ts`

---

## Next Steps (Pending Implementation)

- `@PreAuthorize` role-based method security on admin endpoints
- MongoDB integration for product reviews
- Redis for shopping cart (key: `cart:{userId}`)
- Login and Register Angular components
- Admin panel for product/category management
- CI/CD pipeline with GitHub Actions
- Docker multi-stage build for deployment
