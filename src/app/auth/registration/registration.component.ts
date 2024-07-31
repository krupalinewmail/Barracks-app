import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    HeaderComponent,
    MatFormFieldModule, 
    MatInputModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  loginForm : any;
  loading = false;
  submitted = false;
  returnUrl!: string;
  isPasswordMismatch = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      // private alertService: AlertService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {

      this.loginForm = new FormGroup({
          name: new FormControl<string>('', [Validators.required]),
          username: new FormControl<string>('', [Validators.required,Validators.email]),// ['', Validators.required],
          password: new FormControl<string>('', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),//['', Validators.required]
          confirmPassword: new FormControl<string>('')
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  inputChange(event:Event){
    let password = this.loginForm.value.password;
    let confirmPassword = this.loginForm.value.confirmPassword;
    if(password && password === confirmPassword) {
      this.isPasswordMismatch = false;
    } else {
      this.isPasswordMismatch = true;
    }
  }
  onSubmit() {
      console.log("submit button");
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      } else {
          const userDetails = {
              name:this.loginForm.value.name,
              email: this.loginForm.value.username,
              password: this.loginForm.value.password,
          }
          this.authenticationService.registerUser(userDetails).subscribe((response: any)=>{
             
          }, (error: any)=>{

          })
      }

      this.loading = true;
      // this.authenticationService.login(this.f.username.value, this.f.password.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             this.router.navigate([this.returnUrl]);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }
}