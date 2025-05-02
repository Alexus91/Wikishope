package topro.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import topro.example.demo.repository.BlogRepository;
import topro.example.demo.repository.CategoryRepository;
import topro.example.demo.repository.ProductRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public Map<String, Long> getDashboardStats() {
        long totalBlogs = blogRepository.count();
        long totalProducts = productRepository.count();
        long totalCategories = categoryRepository.count();
        return Map.of(
                "totalBlogs", totalBlogs,
                "totalProducts", totalProducts,
                "totalCategories", totalCategories
        );
    }
}
