import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productshell',
  templateUrl: './productshell.component.html',
  styleUrls: ['./productshell.component.css']
})
export class ProductshellComponent {
  @Input() editButton = false;

  onEditProduct() {
    this.editButton = !this.editButton;
  }
  
}
