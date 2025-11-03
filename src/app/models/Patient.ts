import { DocumentTypeDTO } from './DocumentType';

export interface PatientLoginDTO {
  DocumentTypeId: number;
  Document: string;
}

export interface PatientTableDTO {
  id: number;
  documentType: DocumentTypeDTO;
  document: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
}

export interface PatientDTO {
  id: number;
  documentTypeId: number;
  document: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber?: string;
  email?: string;
  rowVersion?: string;
}

export interface PatientRequestDTO {
  documentTypeId: number;
  document: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber?: string;
  email?: string;
  rowVersion?: string;
}

export interface PatientResponsable {
  id: number;
  document: string;
  firstName: string;
  lastName: string;
}
