import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department';

@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient) { }

  loadDeparmentList(condition: any = {}) {
    return this.http.get<Department[]>('/workshop-api/api/department', {params: condition});
  }

  editDepartment(department: Department){
    return this.http.put('/workshop-api/api/department', department);
  }

  addDepartment(department: Department) {
  return this.http.post('/workshop-api/api/department', department);
  }

  deletDepartment(departmentCode: string) {
      return this.http.delete(`/workshop-api/api/department/${departmentCode}`);
    }
  }



