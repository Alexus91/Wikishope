import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blogService';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  page: number = 1;
  totalPages: number;
  pagesArray: number[] = [];    

  

  constructor(private blogService: BlogService,private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    console.log("Fetching page: " + (this.page - 1) + ", size: 12");
    this.blogService.getBlogs(this.page - 1, 12).subscribe((data: any) => {
      console.log("Total pages: " + data.totalPages);
      this.blogs = data.content;
      this.totalPages = data.totalPages;
      this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    });
  }

  pageChange(newPage: number): void {
    this.page = newPage;
    this.loadBlogs();
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  
  getSanitizedContent(content: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
  
}
