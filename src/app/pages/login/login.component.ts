import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentTypeService } from '../../services/document-type.service';
import { Observable } from 'rxjs';
import { DocumentTypeDTO } from 'src/app/models/DocumentType';
import { AuthService } from 'src/app/services/auth.service';
import { PatientLoginDTO } from 'src/app/models/Patient';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _documentTypeService = inject(DocumentTypeService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm!: FormGroup;
  documentTypes$: Observable<DocumentTypeDTO[]> =
    this._documentTypeService.getDocumentTypes();

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      DocumentTypeId: [null, Validators.required],
      Document: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const PatientLogin: PatientLoginDTO = {
      DocumentTypeId: this.loginForm.value.DocumentTypeId,
      Document: this.loginForm.value.Document.toString(),
    };

    this._authService.login(PatientLogin).subscribe((resp) => {
      this._router.navigate(['/home']);
    });
  }
}
