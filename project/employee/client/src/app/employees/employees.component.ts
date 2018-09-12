import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  employee: Employee;
  first_name: string;
  last_name: string;
  phone: string;


  addEmployee() {
    const newEmployee = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }


    this.employeeService.addEmployee(newEmployee).
      subscribe(employee => {
        this.employees.push(employee);

        this.employeeService.getEmployees()
          .subscribe(employees =>
            this.employees = employees);

      });
  }

  deleteEmployee(id: any) {

    var employees = this.employees;
    this.employeeService.deleteEmployee(id).subscribe(data => {
      if (data.length == 1) {

        for (var i = 0; i < employees.length; i++) {
          if (employees[i]._id == id) {
            employees.splice(i, 1);
          }
        }
      }
    });
  }



  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {

    this.employeeService.getEmployees()
      .subscribe(employees =>
        this.employees = employees);

  }

}
