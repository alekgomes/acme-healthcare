export interface IPatientService {
  Create: (formData: FormData) => void;
  FindAll: () => Promise<any[]>; // type Pacient[]
  FindUnique: (query: any) => Promise<any>; // type Pacient
}
