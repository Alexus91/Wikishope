package topro.example.demo.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import topro.example.demo.model.Blog;
import topro.example.demo.services.BlogService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;
    
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Public: Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // Public: Get paginated blogs
    @GetMapping("/paginated")
    public Page<Blog> getBlogs(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "12") int size) {
        return blogService.getBlogs(page, size);
    }

    // Public: Get a single blog by ID
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    // Admin Only: Create a blog
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        System.out.println(123);
        return blogService.createBlog(blog);
    }
    @PostMapping("/uploads")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
    try {
        // Check if the file is empty
        if (file.isEmpty()) {
            System.out.println("Uploaded file is empty!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"Uploaded file is empty\"}");
        }
        
        System.out.println("File name: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize());
        
        // Define the absolute uploads directory using the current working directory.
        Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");
        System.out.println("Uploading to directory: " + uploadDir.toAbsolutePath().toString());
        
        // Create the directory if it doesn't exist
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
            System.out.println("Created upload directory: " + uploadDir.toAbsolutePath().toString());
        }
        
        // Clean the original filename
        String fileName = org.springframework.util.StringUtils.cleanPath(
                java.util.Objects.requireNonNull(file.getOriginalFilename(), "Uploaded file must have a non-null filename"));
        System.out.println("Cleaned file name: " + fileName);
        
        // Save the file to the uploads directory, replacing existing files if necessary
        Path filePath = uploadDir.resolve(fileName);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        System.out.println("File saved to: " + filePath.toAbsolutePath().toString());
        
        String imageUrl = "http://localhost:8080/uploads/" + fileName;
        return ResponseEntity.ok("{\"imageUrl\": \"" + imageUrl + "\"}");
    } catch (IOException ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"error\": \"Could not save file: " + ex.getMessage() + "\"}");
    }
}

    // Admin Only: Update a blog
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id, @RequestBody Blog updatedBlog) {
        return blogService.updateBlog(id, updatedBlog);
    }

    // Admin Only: Delete a blog
    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
    }
}
