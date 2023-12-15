import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

//for alert message
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '../services/auth.service';
import { StoreUserService } from '../services/store-user.service'; // setting username and role from token , and setting the user id as well

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
              private auth: AuthService,
              private storeUserService: StoreUserService) {}

  loginForm!: FormGroup;

  // Define a variable to store the alert message
  public alertMessage: string | null = null;


  //user id to be sent
  user_id_to_be_passed!: number;

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
                        //console.log(res.token);
                        //console.log(res.user_id);

                        //store token
                        this.auth.storeToken(res.token);

                        // decode the token and get username and role and store/setting it (other than the auth service)
                        // to solve the problem of refreshing the page to be able to get the user info in dashboard
                        const tokenPayload = this.auth.decodeTokenOfUser();
                        this.storeUserService.setNameForStore(tokenPayload.name);
                        this.storeUserService.setRoleForStore(tokenPayload.role);

                        //setting the user id 
                        this.user_id_to_be_passed = res.user_id;
                        //console.log("user_id_to_be_passed from login to admin-dash route = ", this.user_id_to_be_passed);
                        
                        // settig behavoiur subject type of user id to enable sidebar navigation component to access/get user id so it can send it to admin-dash route component when clicked
                        // Pass the user ID to the service
                        this.storeUserService.setUserId(res.user_id);

                        // new way to display alert message
                        this.toast.success({ detail:"sucess", summary: res.message, duration: 2000, position:'topCenter'});
           
                        this.loginForm.reset();

                        // test sending the user id here using (URL or route parameters)-activatedroute parameter
                        this.router.navigate(['/admin-dash', this.user_id_to_be_passed ]);
                        
                      },
        error: (err)=>{ console.log(err.error);

                        this.alertMessage = err.error;

                        // new way to display alert message
                        this.toast.error({ detail:"error", summary: err.error, duration: 5000, position:'topCenter'});

                        this.loginForm.reset();
                      }
      });    
    }    
  }

}
