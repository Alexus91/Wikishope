import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // Example: Hide preloader after 1 second (replace with your own logic)
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'pointerEvents', 'none');
      // Optionally remove from DOM after transition
      setTimeout(() => this.renderer.removeChild(this.el.nativeElement.parentNode, this.el.nativeElement), 300);
    }, 1000);
  }
}
