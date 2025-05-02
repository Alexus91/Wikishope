package topro.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import topro.example.demo.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}