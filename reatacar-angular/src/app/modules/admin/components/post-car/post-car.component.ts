import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-post-car',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzIconModule,
    NzButtonModule,
    NzSpinModule,
    NzInputModule,
    NzFormModule,
    NzLayoutModule,
    FormsModule,
    NzSelectModule,
    NzSpinModule,
    NzDatePickerModule,
    NzUploadModule,


  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss',

})
export class PostCarComponent {
  postCarForm!:FormGroup;
  selectedFile: File | null = null;
  isSpinning: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOptions: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "Mercedes", "Audi", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Volkswagen", "Hyundai"];
  listOftype = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible", "Van", "Wagon"];
  listOfColor = ["Red", "Blue", "Green", "Black", "White", "Silver", "Gray", "Yellow", "Orange", "Purple"];
  listOfTransmission = ["Automatic", "Manual"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private notification: NzNotificationService){ }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar(): void {
    console.log(this.postCarForm.value);

    const formData: FormData = new FormData();

    // Agregar campos del formulario
    const fields = ['brand', 'name', 'type', 'color', 'year', 'transmission', 'description', 'price'];
    fields.forEach(field => {
      const value = this.postCarForm.get(field)?.value;
      if (value !== null && value !== undefined) {
        formData.append(field, value);
      }
    });

    // Subir imagen si existe
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Enviar al backend
    this.adminService.postCar(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.notification.success('Success', 'Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        console.error(err);
        this.notification.error('Error', 'Error posting car', { nzDuration: 5000 });
      }
    });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }



}
