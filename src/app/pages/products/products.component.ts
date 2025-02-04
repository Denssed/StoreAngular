import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { StoreService } from '../../services/store.service';
import { HttpResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../../app.component';
import { CrudModalComponent } from '../../components/crud-modal/crud-modal.component';
import { CommonModule } from '@angular/common';
import { batchData, product, productDto } from '../../utils/types';

@Component({
  selector: 'app-products',
  imports: [MatButtonModule, MatTableModule, MatIconModule, CrudModalComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  inCreateBatch: boolean = false;
  inUpdateBatch: boolean = false;
  inDeleteBatch: boolean = false;
  idBatch: number | undefined;
  quantityDiscuont: number = 25;
  onDiscount: boolean = false;

  products: product[] = [
    { idProduct: 1, name: 'Product 1', description: 'Description 1', price: 100, idBatch: 1, quantity: 10 , onDiscount: false},
    { idProduct: 2, name: 'Product 2', description: 'Description 2', price: 200, idBatch: 2, quantity: 20, onDiscount: false},
    // ...more products
  ];

  displayedColumns: string[] = ['idProduct', 'name', 'description', 'price', 'idBatch', 'quantity'];

  constructor(private readonly appComponent: AppComponent, private readonly storeService: StoreService) { }

  ngOnInit() {
    this.getInventary();

  }

  getInventary() {
    this.storeService.getInventary().subscribe((response: HttpResponse<any>) => {
      this.products = response.body;
      this.products.map((product: any) => {
        if (product.quantity < this.quantityDiscuont)  {
          product.price = product.price - (product.price * 0.3);
          product.onDiscount = true;
        }
      });
    });
  }

  openOnCreateBatchModal() {
    this.inCreateBatch = true;
    this.appComponent.onModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeOnCreateBatchModal() {
    this.inCreateBatch = false;
    document.body.classList.remove('overflow-hidden');
    this.getInventary(); // Call getInventary to refresh the batch list
  }

  openOnUpdateBatchModal(IdBatch: number) {
    this.inUpdateBatch = true;
    this.appComponent.onModal = true;
    this.idBatch = IdBatch;
    document.body.classList.add('overflow-hidden');
  }

  closeOnUpdateBatchModal() {
    this.inUpdateBatch = false;
    document.body.classList.remove('overflow-hidden');
    this.getInventary(); // Call getInventary to refresh the batch list
  }

  openOnDeleteBatchModal(IdBatch: number) {
    this.inDeleteBatch = true;
    this.appComponent.onModal = true;
    this.idBatch = IdBatch;
    document.body.classList.add('overflow-hidden');
  }

  closeOnDeleteBatchModal() {
    this.inDeleteBatch = false;
    document.body.classList.remove('overflow-hidden');
    this.getInventary(); // Call getInventary to refresh the batch list
  }
}
