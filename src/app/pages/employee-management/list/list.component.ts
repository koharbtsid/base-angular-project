import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/core/services';
import { Employee } from 'src/app/core/interfaces';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentUrl: string;
  dataSource = new MatTableDataSource<Employee>();
  data: any;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'status', 'group', 'action'];
  haveSearchEmployeeText: any;
  isApplyPevSearch: boolean = false;
  searchText: string;
  previousUrl: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
  ) {
   
  }

  ngOnInit(): void {
    this.getListEmployee();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue;
    this.filterData(filterValue);
  }

  clickDelete() {
    Swal.fire({
      icon: 'error',
      text: `Delete clicked!`
    });
  }

  clickEdit() {
    Swal.fire({
      icon: 'warning',
      text: `Edit clicked!`
    });
  }

  filterData(searchEmployeeText: string) {
    if (searchEmployeeText.length > 0) {
      const foundData = this.data.filter((d: any) => (d.username.toLocaleLowerCase().includes(searchEmployeeText.toLocaleLowerCase())
        ||
        d.firstName?.toLocaleLowerCase().includes(searchEmployeeText.toLocaleLowerCase())
        ||
        d.lastName?.toLocaleLowerCase().includes(searchEmployeeText.toLocaleLowerCase())
      ));

      this.dataSource = new MatTableDataSource<Employee>(foundData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<Employee>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getListEmployee() {
    this._employeeService.getListEmployee({})
    .subscribe(
      data => {
        this.data = data;
        this.dataSource = new MatTableDataSource<Employee>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.getHostorySearch();
      }
    );
  }

  showDetailEmployee(data: any) {
    if (this.searchText) {
      localStorage.setItem('searchEmployeeText', this.searchText);
    }
    this._router.navigate(["employee-management/detail", data.id]);
  }

  getHostorySearch() {
    const fromDetailEmployee = localStorage.getItem('fromDetailEmployee');
    const searchEmployeeText = localStorage.getItem('searchEmployeeText');
    if (searchEmployeeText != undefined && fromDetailEmployee == 'true') {
      this.filterData(searchEmployeeText);
      this.searchText = searchEmployeeText;
    } 
    localStorage.removeItem('fromDetailEmployee');
    localStorage.removeItem('searchEmployeeText');
  }
}
