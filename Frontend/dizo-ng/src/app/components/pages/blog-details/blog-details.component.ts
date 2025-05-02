import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blogService';
import { Blog } from 'src/app/models/blog';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId = params.get('id');
      if (blogId) {
        this.loadBlogDetails(blogId);
      }
    });
  }

  loadBlogDetails(blogId: string): void {
    this.blogService.getBlogById(+blogId).subscribe((data: Blog) => {
      this.blog = data;
    });
  }
  getSanitizedContent(content: string): SafeHtml {
    // Convert markdown to HTML using marked.
    const html = marked.parse(content);
    return this.sanitizer.bypassSecurityTrustHtml(html as string);
  }
}