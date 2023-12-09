import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { confirmedValidator } from '../../Validators/confirmPassword.validator';
import { IUserRegister } from 'src/app/models/IUserRegister';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private fb: FormBuilder,
    private service: ApiService) {}

  
  registerUserForm!: FormGroup;
  
  newUser: IUserRegister | undefined;

  ngOnInit(): void 
  {
    // intialize register user form
    this.registerUserForm = this.fb.group({
      username:['',[Validators.required]],
      password:['', [Validators.required]],
      confirmpass:['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }


   // getter methods for form controls in the form
   get username() {
    return this.registerUserForm.get('username');
  }
  get password() {
    return this.registerUserForm.get('password');
  }
  get confirmpass() {
    return this.registerUserForm.get('confirmpass');
  }
  get role() {
    return this.registerUserForm.get('role');
  }



  
  registerUser()
  {

    this.newUser = {
      Username : this.registerUserForm?.get('username')?.value,
      Password : this.registerUserForm.get('password')?.value,
    
      Role: this.registerUserForm.get('role')?.value
    };

    console.log(this.newUser);

    if ( this.registerUserForm.invalid)
    {
      console.log("invalid form data");
      return;
    }


    this.service.signup(this.newUser).subscribe(
    { 
      next: (res)=> { console.log(res.message);
                      console.log('User created successfully:')
                      this.registerUserForm.reset();
                      //this.router.navigate(['/admin-dash']);
                    },
      error: (err)=>{ console.log(err.error);
                      console.error('Error creating user:', err);
                      //this.alertMessage = err.error;
                      //this.registerUserForm.reset();
                    }
    }
    );    
       
  }

}
