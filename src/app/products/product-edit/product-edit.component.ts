import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productedit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit{
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
   }

  product!: Product;
  productForm: FormGroup;

  ngOnInit(): void {
    this.productService.selectedProductChanges$.subscribe((currentProduct) => {
      this.displayProduct(currentProduct!);
    })
  }

  displayProduct(currentProduct:Product ) {
    this.product = currentProduct;

    this.productForm?.setValue({
      title: this.product?.title,
      subtitle:this.product?.subtitle,
      price: this.product?.price,
      category: this.product?.category,
    })
    
  }

  
  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.title}?`)) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => this.productService.changeSelectedProduct(null),
        });
      }

      this.productForm.reset();

    } else {
      // No need to delete, it was never saved
      this.productService.changeSelectedProduct(null);
    }
  }


  
  

}
