import { Component, Input, input, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserDetail } from '../../auth/models/user';
// import {MatInputModule} from '@angular/material/input';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProgramFeaturesService } from '../services/program-features.service';
@Component({
  selector: 'app-scope-list',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule],
  templateUrl: './scope-list.component.html',
  styleUrl: './scope-list.component.scss'
})
export class ScopeListComponent implements AfterViewInit,OnInit{
  @Input() scopList?:any;
  displayedColumns: string[] = ['id', 'type', 'asset'];
  dataSource!: MatTableDataSource<UserDetail>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private progrmSerivce:ProgramFeaturesService) {
    
  }
  ngOnInit() {
    this.progrmSerivce.getProgramDetails().subscribe((response: any)=>{
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.scopList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }, (error: any)=>{

   })
  }
  ngAfterViewInit() {
  
  }
  /** Builds and returns a new User. */
 createNewUser(id: number): any {
  const name =
  "Netra shah"

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
  };
}
}
