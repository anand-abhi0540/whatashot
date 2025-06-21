import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastService } from '../../../services/toast.service';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ProgressSpinnerModule,
    SelectModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  public form: FormGroup;
  public loading: boolean = false;
  contactType: any[] = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Whatsapp', value: 'whatsapp' }
  ];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [ Validators.email]],
      phone: [''],
      brandName: ['', Validators.required],
      productType: [''],
      productUnits: ['', Validators.required],
      creativePhotoUnits: ['', Validators.required],
      listingPhotoUnits: ['', Validators.required],
      cinematicVideos: ['', Validators.required],
      preferredContactMode: ['phone', Validators.required],
      otherRequirements: [''],
      status: ['Lead Received'],
      remarks: ['Follow up'],
    });
  }
  public requestQuote() {
    this.loading = true;
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        console.log(`Field: ${key}`, controlErrors);
      }
    });
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      this.toast.error('Form invalid!');
      return;
    }
    const formData = this.form.value;
    const url =
      'https://script.google.com/macros/s/AKfycbxb5bZmc5pFf5fplADc02szOE9013qyGGAEMg4_tMfg7O50M4KbWRGPi2Yv4Ub5P8DHvg/exec';
    this.http
      .post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.toast.success('Form submitted successfully!');
        },
        error: (err) => {
          console.log('error', err);
          this.toast.error('Something went wrong');
          this.loading = false;
        },
      });
  }
}
