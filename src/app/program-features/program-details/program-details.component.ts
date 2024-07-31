import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetentionService } from '../../auth/services/retention.service';
import { ProgramFeaturesService } from '../services/program-features.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ScopeListComponent } from '../scope-list/scope-list.component';

@Component({
  selector: 'app-program-details',
  standalone: true,
  imports: [CommonModule,MatCardModule,ScopeListComponent],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.scss'
})
export class ProgramDetailsComponent implements OnInit{
  programDetail: any
  constructor(
    private route: ActivatedRoute,
    private retentionService: RetentionService,
    private router: Router,private programService: ProgramFeaturesService
  ) {}
  ngOnInit(): void {
    const id: string = this.route.snapshot.queryParamMap.get('id')?? '';
    console.log(id);
    this.programService.getProgramByID(id).subscribe((response: any)=>{
      console.log(response);
      this.programDetail = response
      console.log(this.programDetail.assets);
      
   }, (error: any)=>{

   })
  }

}
