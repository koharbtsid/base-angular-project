import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  employee: any;
  employeeId: any;
  isLoading: boolean = false;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.employeeId = this._activeRoute.snapshot.paramMap.get('id');


    console.log(this.employeeId)
    this.getEmployeeById(this.employeeId)
  }

  getEmployeeById(id: string) {
    this.isLoading = true;
    this._employeeService.getListEmployee({})
    .subscribe(
      data => {
        this.employee = data;
        this.employee = this.employee.find((x: any) => x.id == id);

        this.isLoading = false;
      }
    );
  }

  goBack() {
    this._router.navigate(["employee-management"]);
  }

}
