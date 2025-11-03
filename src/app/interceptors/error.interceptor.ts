import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PatientDTO } from '../models/Patient';
import { PatientService } from '../services/patient.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private patientService: PatientService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let summary = 'Error desconocido';
        let detail = '';
        const severity: 'error' = 'error';

        if (error.status === 0 || error.error instanceof ErrorEvent) {
          summary = 'Error de conexión';
          detail = error.message;
          this.messageService.add({ severity, summary, detail, life: 5000 });
          return throwError(() => error);
        }

        switch (error.status) {
          case 400:
            summary = 'Solicitud incorrecta';
            detail = error.error?.message;
            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;

          case 422:
            summary = 'Error de validación';
            detail = JSON.stringify(error.error);
            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;

          case 401:
            summary = 'No autorizado';
            detail = 'Sin permisos o sesión inválida.';
            if (this.router.url !== '/home') this.router.navigate(['/home']);
            break;

          case 403:
            summary = 'Acceso denegado';
            detail = 'Tu sesión ha expirado.';
            if (this.router.url !== '/') this.router.navigate(['/']);
            break;

          case 404:
            summary = 'No encontrado';
            detail = 'El recurso solicitado no existe.';
            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;

          case 409:
            summary = 'Conflicto';
            detail = 'El recurso fue modificado por otro usuario.';

            let current = JSON.parse(error.error.message);
            let p: PatientDTO = {
              id: current.Id,
              document: current.Document,
              lastName: current.LastName,
              firstName: current.FirstName,
              birthDate: current.BirthDate,
              documentTypeId: current.DocumentTypeId,
              email: current.Email,
              phoneNumber: current.PhoneNumber,
              rowVersion: current.RowVersion,
            };
            try {
              this.patientService.refreshPatient(p);
              console.log(p);
            } catch (e) {
              console.warn('No se pudo parsear el body del 409:', e);
            }

            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;

          case 500:
            summary = 'Error del servidor';
            detail = 'Ocurrió un error inesperado en el servidor.';
            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;

          default:
            summary = `Error ${error.status}`;
            detail = error.error?.message || error.message;
            this.messageService.add({ severity, summary, detail, life: 5000 });
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
