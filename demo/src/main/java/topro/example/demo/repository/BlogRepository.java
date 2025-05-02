package topro.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import topro.example.demo.model.Blog;



public interface BlogRepository extends JpaRepository<Blog, Long>{
}