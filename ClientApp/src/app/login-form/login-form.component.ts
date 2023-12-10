import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//import { IUserLogin } from '../models/IUserLogin';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

//for alert message
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  constructor(private fb: FormBuilder,
              private service: ApiService,
              private router: Router,
              private toast: NgToastService,
              private auth: AuthService) {}

  loginForm!: FormGroup;

  // Define a variable to store the alert message
  public alertMessage: string | null = null;

  ngOnInit(): void 
  {
    // intialize login form
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['', [Validators.required]]
    });
  }

  
  // getter methods for form controls in the form
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login()
  {
    if (this.loginForm.valid) 
    {
      this.service.login(this.loginForm.value).subscribe(
      { 
        next: (res)=> { console.log(res.message);

                        //store token
                        this.auth.storeToken(res.token);

                        // new way to display alert message
                        this.toast.success({ detail:"sucess", summary: res.message, duration: 2000, position:'topCenter'});
           
                        this.loginForm.reset();
                        this.router.navigate(['/admin-dash']);
                      },
        error: (err)=>{ console.log(err.error);
                        this.alertMessage = err.error;

                        // new way to display alert message
                        this.toast.error({ detail:"error", summary: err.error, duration: 5000, position:'topCenter'});

                        this.loginForm.reset();
                      }
      }
      );    
    }    
  }

}
