// toast.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: MessageService ) {}

  private open(severity: string, summary: string, detail: string, styleClass: string) {
    this.toastr.add({
      severity,
      detail,
      life: 3000,
      styleClass
    });
  }

  success(message: string) {
    this.open('contrast','Success', message, 'toast-success');
  }

  error(message: string) {
    this.open('error', 'Error', message, 'toast-error');
  }

  info(message: string) {
    this.open('info', 'Info', message, 'toast-info');
  }

  warn(message: string) {
    this.open('warn', 'Warn', message, 'toast-warn');
  }
}
