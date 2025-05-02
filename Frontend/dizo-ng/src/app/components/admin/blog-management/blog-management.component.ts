import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blogService';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss'],
})
export class BlogManagementComponent implements OnInit {
  newBlog: Blog = {
    id: '',
    title: '',
    content: '',
    author: '',
    date: new Date(),
    imageUrlblog: ''
  };

  blogs: Blog[] = [];
  selectedFile: File | null = null;
  page: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];

  // Improved Quill Editor Configuration (Supports Headings, Lists, Bold, Images)
  editorModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }], // Only H1 and H2
      ['bold', 'italic'],           // Fewer formatting buttons
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  constructor(private blogService: BlogService, private sanitizer: DomSanitizer,private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  // Fetch Blogs with Pagination
  loadBlogs(): void {
    console.log(`Fetching page: ${this.page - 1}, size: 12`);
    this.blogService.getBlogs(this.page - 1, 12).subscribe((data: any) => {
      this.blogs = data.content;
      this.totalPages = data.totalPages;
      this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  // Handle File Selection for Image Upload
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

// Note: Quill editor sends HTML content, not Markdown.
onSubmit(): void {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.blogService.uploadImage(formData).subscribe({
      next: (response: any) => {
        this.newBlog.imageUrlblog = response.imageUrl; // Backend returns image URL
        this.createBlog();
      },
      error: (err) => {
        // Handle upload error (optional)
        console.error('Image upload failed', err);
      }
    });
  } else {
    this.createBlog();
  }
}

  // Save Blog to Backend
  createBlog(): void {
    this.blogService.createBlog(this.newBlog).subscribe(() => {
      this.loadBlogs();
      this.resetNewBlog();
    });
  }

  //Delete Blog
  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      this.loadBlogs();
    });
  }
  openDeleteDialog(blogId: number, enterAnimationDuration: string = '300ms', exitAnimationDuration: string = '200ms'): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      disableClose: true, // <-- This makes the dialog truly modal
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBlog(blogId.toString());
      }
    });
  }
  

  

  // modify Blog 
  updateBlog(blog: Blog): void {
    this.newBlog = blog;
  }

  //Sanitize Blog Content Before Displaying
  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  //Reset New Blog Form
  resetNewBlog(): void {
    this.newBlog = {
      id: '',
      title: '',
      content: '',
      author: '',
      date: new Date(),
      imageUrlblog: ''
    };
    this.selectedFile = null;
  }

  // Handle Pagination Change
  pageChange(newPage: number): void {
    this.page = newPage;
    this.loadBlogs();
    this.scrollToTop();
  }

  // Scroll to Top on Page Change
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}


