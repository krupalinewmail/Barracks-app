import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  forgotPasswordForm: any;
  loading = false;
  returnUrl!: string;
  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit() {

    this.forgotPasswordForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),// ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log("submit button");
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      const userDetails = {
        Username: this.forgotPasswordForm.value.username,
      }
      // future scope
      // this.authenticationService.authenticateUser(userDetails).subscribe((response: any)=>{

      // }, (error: any)=>{

      // })
    }

    this.loading = true;
  }
}
