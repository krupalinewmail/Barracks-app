import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RetentionService } from '../services/retention.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
    loginForm : any;
    loading = false;
    submitted = false;
    returnUrl!: string;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private retentionService: RetentionService,
        private _snackBar: MatSnackBar
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {

        this.loginForm = new FormGroup({
            username: new FormControl<string>('',[Validators.required]),// ['', Validators.required],
            password: new FormControl<string>('',[Validators.required])//['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else{
            const userDetails = {
                email: this.loginForm.value.username,
                password: this.loginForm.value.password
            }
            this.authenticationService.authenticateUser(userDetails).subscribe((response: any)=>{
                this.authenticationService.isLoggedIn = true;
               console.log(response,this.authenticationService.isLoggedIn);
            //    JwtHelperService().decodeToken(token)
            console.log(atob(response.token.split('.')[1]));
                this.retentionService.setItem('token',response.token);
                let role = JSON.parse(atob(JSON.stringify(response.token).split('.')[1])).user.role
                this.retentionService.setItem('userRole',role);
                this._snackBar.open('Login Successful', 'Close', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration : 2000
                  });
                  this.router.navigateByUrl('/')
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

