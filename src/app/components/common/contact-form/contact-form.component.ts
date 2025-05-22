import { Component } from '@angular/core';
import { WasButtonComponent } from '../was-button/was-button.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToastService } from '../../../services/toast.service';
@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  public form: FormGroup;
  public loading: boolean = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      brandName: ['', Validators.required],
      productType: ['', Validators.required],
      productUnits: ['', Validators.required],
      creativePhotoUnits: ['', Validators.required],
      listingPhotoUnits: ['', Validators.required],
      cinematicVideos: ['', Validators.required],
      preferredContactMode: ['', Validators.required],
      otherRequirements: [''],
      status: ['Lead Received'],
      remarks: ['Follow up'],
    });
  }
  public requestQuote() {
    this.loading = true;
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
        next: () => (this.loading = false),
        error: (err) => {
          console.log('error', err);
          this.loading = false;
        },
      });
  }
}
