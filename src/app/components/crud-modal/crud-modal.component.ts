import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { PresentationModalComponent } from '../presentation-modal/presentation-modal.component';
import { AppComponent } from '../../app.component';
import { batchData, productData, productDto } from '../../utils/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crud-modal',
  imports: [ReactiveFormsModule, CommonModule, PresentationModalComponent, MatFormFieldModule, MatSelectModule],
  templateUrl: './crud-modal.component.html',
  styleUrl: './crud-modal.component.scss'
})
export class CrudModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<void>();

  //Modal Type
  @Input() inCreateBatch: boolean = false;
  @Input() inUpdateBatch: boolean = false;
  @Input() inDeleteBatch: boolean = false;
  @Input() products: productDto | undefined;
  @Input() idBatch: number | undefined;

  form!: FormGroup;
  productsType: productData[] | undefined = [];
  batchData: batchData | undefined = undefined;
  isServerError: boolean = false;
  title: string = '';


  constructor(private readonly appComponent: AppComponent, private fb: FormBuilder, private storeService: StoreService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      product: [null, Validators.required] // Ensure this is a number
    });
    this.getProductsType();
    if (this.inCreateBatch) this.onCreateBatch()
    if (this.inUpdateBatch) {
      this.getBatchById();
      this.onOnUpdateBatch()
    }
    if (this.inDeleteBatch) {
      this.getBatchById();
      this.onDeleteBatch()
    }
  }

  getProductsType() {
    this.storeService.getProducts().subscribe(response => {
      this.productsType = response.body;
    });
  }

  getBatchById() {
    if (this.idBatch) {
      console.log(this.idBatch);
      this.storeService.getBatchById(this.idBatch).subscribe(response => {
        this.batchData = response.body;
        if (this.inUpdateBatch) this.updateFormWithBatchData();
        console.log(this.batchData);
      });
    }
  }

  updateFormWithBatchData() {
    if (this.batchData) {
      const selectedProduct = this.productsType?.find(product => product.idProduct === this.batchData?.idProduct);
      this.form.patchValue({
        price: this.batchData.price,
        quantity: this.batchData.quantity,
        product: selectedProduct ? selectedProduct.name : null
      });
    }
  }

  onCreateBatch() {
    this.title = 'Add Batch';
  }

  onOnUpdateBatch() {
    this.title = 'Update Batch';
  }

  onDeleteBatch() {
    this.title = 'Delete Batch';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const selectedProduct = this.productsType?.find(product => product.name === this.form.value.product);

      const BatchData: batchData = {
        Idbatch: this.idBatch ?? 0,
        idProduct: selectedProduct?.idProduct ?? 0,
        entryDate: new Date(),
        price: this.form.value.price,
        quantity: this.form.value.quantity,
        active: true
      };
      console.log("from submit", BatchData);

      if (this.inCreateBatch) {
        this.storeService.createBatch(BatchData).subscribe({
          next: () => {
            this.close();
          },
          error: () => {
            this.openOnServerErrorModal();
          }
        });
      }

      if (this.inUpdateBatch) {
        this.storeService.UpdateBatch(BatchData).subscribe({
          next: () => {
            this.close();
          },
          error: () => {
            this.openOnServerErrorModal();
          }
        });
      }

    }
  }

  deleteBatch() {
    if (this.idBatch !== undefined) {
      this.storeService.DeleteBatch(this.idBatch).subscribe({
        next: () => {
          this.close();
        },
        error: () => {
          this.openOnServerErrorModal();
        }
      });
    }
  }

  openOnServerErrorModal() {
    this.isServerError = true;
    this.appComponent.onModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeOnServerErrorModal() {
    this.isServerError = false;
    document.body.classList.remove('overflow-hidden');
  }

  close() {
    this.closeModal.emit();
  }
}
