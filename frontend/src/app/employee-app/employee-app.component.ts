import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeSericeService } from '../AppServices/employee-serice.service';
import { Employee } from '../Models/EmplyeeModel';

@Component({
  selector: 'app-employee-app',
  templateUrl: './employee-app.component.html',
  styleUrls: ['./employee-app.component.css']
})
export class EmployeeAppComponent {

  empForm!: FormGroup;
  showModal:boolean = false;
  editMode:boolean = false;

  searchstring :string = ''

  AllEmployees: Employee[] = [];
  departments: string[] = ['Design', 'Development'];


  constructor(
    private fb: FormBuilder,
    private _employee : EmployeeSericeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();

    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: ['Design', Validators.required],

      salary: [200000, Validators.required]
    })

  }

  // get data
  getEmployees() {
    this._employee.getEmployeeList().subscribe(
      (value : Employee[] ) => {

        this.AllEmployees = value;
        console.log(this.AllEmployees);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Create employee -> post data
  onEmpSubmit(){
    this.showModal=false
    // console.log(this.empForm.value);
    if(!this.empForm.valid){
      alert("Please Provide proper details")
      this.showModal=true
    }
    if(this.editMode == true){
      this._employee.updateEmp(this.empForm.value).subscribe(value => {
        console.log(value);
        this.getEmployees()
      })
    }
    else{
      if(this.empForm.valid){

        this._employee.addEmployee(this.empForm.value).subscribe
        (value =>{
          console.log(value);
          this.getEmployees()
        },
        (err) => {
          console.log(err);

        })
      }
    }
  }
  //Delete data

  deleteEmployee(_id: any,name : any){
    if(confirm(`Do you want to delete ${name}`)){
      this._employee.deleteEmp(_id).subscribe
      (value =>{
        console.log(value);
        this.getEmployees()
      },
      (err) => {
        console.log(err);

      })
    }
  }

  // Update data

  updateEmployee(employee : Employee){
    this.showModal = true
    this.editMode = true
    console.log(this.editMode);

    this.empForm.patchValue(employee)
  }

  onAddEmployee(){
    this.showModal = true;
    this.editMode=false
  }

  onCloseModal(){
    this.showModal = false;
    this.editMode=false
    console.log(this.editMode);
  }

}
