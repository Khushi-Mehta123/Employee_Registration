import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/EmplyeeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSericeService {

  url = 'http://localhost:5000/api/v1/employee'

  constructor(private http : HttpClient) {

  }
  addEmployee(emp : Employee){
    // console.log(emp);

    return this.http.post(this.url,emp)
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  deleteEmp(_id : any) : Observable<Employee[]> {
    return this.http.delete<Employee[]> (`${this.url}/${_id}`)
  }

//   updateEmp(emp: Employee): Observable<Employee> {
//     return this.http.patch<Employee>(`${this.url}/${emp._id}`, emp);
// }

updateEmp(emp : Employee) {
  return this.http.put(`${this.url}/${emp._id}`, emp)
}

}
