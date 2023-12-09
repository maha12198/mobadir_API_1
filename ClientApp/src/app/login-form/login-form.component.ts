import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//import { IUserLogin } from '../models/IUserLogin';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  constructor(private fb: FormBuilder,
              private service: ApiService,
              private router: Router) {}

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
                        this.loginForm.reset();
                        this.router.navigate(['/admin-dash']);
                      },
        error: (err)=>{ console.log(err.error);
                        this.alertMessage = err.error;
                        this.loginForm.reset();
                      }
      }
      );    
    }    
  }

}
