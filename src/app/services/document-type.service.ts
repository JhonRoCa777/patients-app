import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentTypeDTO } from '../models/DocumentType';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  private _http = inject(HttpClient);
  private CONTROLLER = `${environment.apiBaseUrl}/DocumentType`;

  getDocumentTypes(): Observable<DocumentTypeDTO[]> {
    return this._http.get<DocumentTypeDTO[]>(`${this.CONTROLLER}`);
  }
}
