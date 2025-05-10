# Wikishope

## Overview

Wikishope is a full-stack web application for e-commerce and blogging, featuring an admin dashboard for managing products, categories, and blogs.

---

## Technologies Used

### Backend
- **Java 17+**
- **Spring Boot** (REST API)
- **Spring Data JPA** (Hibernate ORM)
- **MySQL** (or compatible RDBMS)
- **Jackson** (JSON serialization)
- **Maven** (build tool)

### Frontend
- **Angular 16+**
- **Angular Material** (UI components)
- **Bootstrap** (styling)
- **RxJS** (reactive programming)
- **TypeScript**

### Dev Tools
- **Visual Studio Code**
- **Spring Boot Dashboard**
- **Postman** (API testing)
- **Git** (version control)

---

## Features

- **Admin Dashboard**
  - Create, update, delete categories
  - Create, update, delete products (assign category)
  - Create, update, delete blogs (assign category and product)
- **Product Management**
  - Category dropdown selection
  - Product cards display category
- **Category Management**
  - CRUD operations
  - Categories auto-populate product forms
- **Blog Management**
  - Assign blogs to products and categories
- **Authentication**
  - JWT-based (if enabled)
- **Error Handling**
  - Handles lazy loading and serialization issues

---

## How to Run

1. **Backend**
   - Configure your database in `application.properties`
   - Run with `mvn spring-boot:run` or from your IDE

2. **Frontend**
   - `cd Frontend/dizo-ng`
   - `npm install`
   - `ng serve`

3. **Access**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8080/api/...`

---

## Notes

- Ensure categories exist before creating products/blogs.
- Category selection is required for products.
- All entity relationships are managed and serialized safely.

---

## License

MIT
