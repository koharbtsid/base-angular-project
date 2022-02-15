import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Employee } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private _http: HttpClient
  ) { }

  getListEmployee(payload: any): Observable<Employee> {
    let employees = this._http.get<Employee>("../../../../assets/MOCK_DATA.json");
    return employees;
  }
}
