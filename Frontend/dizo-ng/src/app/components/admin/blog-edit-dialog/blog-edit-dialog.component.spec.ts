import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditDialogComponent } from './blog-edit-dialog.component';

describe('BlogEditDialogComponent', () => {
  let component: BlogEditDialogComponent;
  let fixture: ComponentFixture<BlogEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
