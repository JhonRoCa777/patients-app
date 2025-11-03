import { PatientResponsable } from './Patient';

export interface AuditLog {
  id: number;
  responsable: PatientResponsable;
  entityId: number;
  entity: string;
  changes: string;
  createdAt: string;
}
