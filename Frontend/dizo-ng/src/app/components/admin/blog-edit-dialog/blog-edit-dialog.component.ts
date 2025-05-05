import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-edit-dialog',
  templateUrl: './blog-edit-dialog.component.html',
  styleUrls: ['./blog-edit-dialog.component.scss']
})
export class BlogEditDialogComponent {
  editedBlog: any;
  editorModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<BlogEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.editedBlog = { ...data }; }

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
