// toast.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, panelClass: string = '', duration = 30000) {
    console.log(message);
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  success(message: string) {
    this.open(message, 'toast-success');
  }

  error(message: string) {
    this.open(message, 'toast-error');
  }

  info(message: string) {
    this.open(message, 'toast-info');
  }

  warn(message: string) {
    this.open(message, 'toast-warn');
  }
}
