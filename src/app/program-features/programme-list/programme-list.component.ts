import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RetentionService } from '../../auth/services/retention.service';
import { ProgramFeaturesService } from '../services/program-features.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-programme-list',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatIconModule],
  templateUrl: './programme-list.component.html',
  styleUrl: './programme-list.component.scss'
})
export class ProgrammeListComponent implements OnInit{
  members = [{'url':'','title':'title 1'},{'url':'','title':'title 1'}]
  programs:any = [];
  constructor(private retentionService: RetentionService,
    private router: Router,private programService: ProgramFeaturesService){

  }
  ngOnInit(): void {
    this.programService.getProgramDetails().subscribe((response: any)=>{
      console.log(response.programs);
      this.programs = response.programs
      
   }, (error: any)=>{

   })
  }
  programDetails(id:any){
    this.router.navigate(['/program/details'],{ queryParams: {id: id}});
  }
  addProgram(){
    this.router.navigate(['/program/add'])
  }
}
