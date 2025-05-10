package topro.example.demo.services;


import org.springframework.stereotype.Service;

import topro.example.demo.model.Category;
import topro.example.demo.model.Product;
import topro.example.demo.repository.CategoryRepository;
import topro.example.demo.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository; // link the product to the category


    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository; 
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }
        Product savedProduct = productRepository.save(product);
        System.out.println("Received product: " + savedProduct);
        System.out.println("Received category: " + (savedProduct.getCategory() != null ? savedProduct.getCategory().getId() : "null"));
        return savedProduct;
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
    
        if (updatedProduct.getCategory() != null && updatedProduct.getCategory().getId() != null) {
            Category category = categoryRepository.findById(updatedProduct.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            existingProduct.setCategory(category);
        } else {
            existingProduct.setCategory(null);
        }
    
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
