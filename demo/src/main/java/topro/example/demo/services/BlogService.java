package topro.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import topro.example.demo.model.Blog;
import topro.example.demo.repository.BlogRepository;


import java.util.List;
@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Page<Blog> getBlogs(int page, int size) {
        return blogRepository.findAll(PageRequest.of(page, size));
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }
    /**public String saveImage(MultipartFile file) throws IOException {
        // Define the directory to save the uploaded files
        String uploadDir = "uploads/";
        Path uploadPath = Paths.get(uploadDir);

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // Save the file to the directory
        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        // Return the URL of the uploaded file
        return "/uploads/" + fileName;
    }*/

    public Blog updateBlog(Long id, Blog updatedBlog) {
        Blog existingBlog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setContent(updatedBlog.getContent());
        existingBlog.setAuthor(updatedBlog.getAuthor());
        existingBlog.setImageUrlblog(updatedBlog.getImageUrlblog());
        existingBlog.setCreatedAt(updatedBlog.getCreatedAt());
        existingBlog.setProduct(updatedBlog.getProduct());
        existingBlog.setCategory(updatedBlog.getCategory());
        return blogRepository.save(existingBlog);
    }

    public void deleteBlog(Long id) {
        Blog existingBlog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        blogRepository.delete(existingBlog);
    }
}
