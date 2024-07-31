import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProgramFeaturesService } from '../services/program-features.service';
@Component({
  selector: 'app-add-program',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule,],
  templateUrl: './add-program.component.html',
  styleUrl: './add-program.component.scss'
})
export class AddProgramComponent {
  addProgramForm : any;
  submitted = false;

  constructor(private programService:ProgramFeaturesService) {

  }

  ngOnInit(): void {
    this.initAddForm();
  }

  initAddForm() {
    this.addProgramForm = new FormGroup({
      programmeName: new FormControl<string>('',[Validators.required]),// ['', Validators.required],
      roe: new FormArray([]),
      assets: new FormArray([])
  });
  }

  addROEToFormGroup() {
    const roe = this.addProgramForm.get('roe') as FormArray;
    roe.push(this.createRoeFormGroup());
  }

  createRoeFormGroup(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }

  get roe(): FormArray {
    return <FormArray>this.addProgramForm.get('roe');
  }

  removeROEFormGroup(index: number) {
    const roe = this.addProgramForm.get('roe') as FormArray;
    roe.removeAt(index);
  }

  addAssetToFormGroup() {
    const roe = this.addProgramForm.get('assets') as FormArray;
    roe.push(this.createAssetFormGroup());
  }

  createAssetFormGroup(): FormGroup {
    return new FormGroup({
      'scopeName': new FormControl('', Validators.required),
      'scopeType': new FormControl('', Validators.required),
      'scopeStatus': new FormControl(0),
      'isActive':new FormControl(true)
    })
  }

  removeStatusFormGroup(index: number) {
    const roe = this.addProgramForm.get('assets') as FormArray;
    roe.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    this.programService.addProgram().subscribe((response: any)=>{
      console.log(response.programs);
      // this.programs = response.programs
      
   }, (error: any)=>{

   })
    
  }

}
