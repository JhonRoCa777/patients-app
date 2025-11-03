import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CalendarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    CardModule,
    DialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CalendarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    CardModule,
    DialogModule,
  ],
})
export class SharedModule {}
