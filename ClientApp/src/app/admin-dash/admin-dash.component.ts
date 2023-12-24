import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreUserService } from '../services/store-user.service';
import { AuthService } from '../services/auth.service';

import { ChangePasswordRequest } from 'src/app/models/ChangePasswordRequest';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent{

  constructor(private api: ApiService,
              private storeUserService: StoreUserService,
              private authServiceApi: AuthService,
              private fb: FormBuilder,
              private toast : NgToastService,
              private route: ActivatedRoute,
              private location: Location)
  {}

  username!: any;
  role!: any;
  change_Pass_Form!: FormGroup;
  Passed_user_Id!: number;

  ngOnInit()
  {
    // getting (username) user info from store
    this.storeUserService.getNameFromStore().subscribe(
      {
        next: (res)=> {
          // this value which is from the store service will be retrieved and displayed sucessfully
          // but when the user refresh the page it will disappear
          // that's why we need to use auth service with it (each method has its disadvantages so best way it to combine both)
          //console.log(res);
          
          // get it also from auth service (from decoded token) // the problem with this is that it only get fetched when user refresh the page on;y,
          // but it will be undefined BEFORE REFRESHING THE PAGE!!! (that's why we need to use get name from store service)
          let nameFromToken = this.authServiceApi.getNameFromToken();
          //console.log(nameFromToken); //this will be undefined before we refresh

          // so this will get the value from the store service at first time and then after refreshing it can get it from the auth service form the decoded token as well
          this.username = res || nameFromToken;
          //console.log(this.username);
        },
        error: (err)=> {
          console.log(err.error);
        }
      }
    );

    // getting (role) of user from store (same as getting name above)
    this.storeUserService.getRoleFromStore().subscribe(
      {
        next: (res)=> {
          //console.log(res);
          
          let roleFromToken = this.authServiceApi.getRoleFromToken();
          //console.log(roleFromToken); //this will be undefined before we refresh
          
          this.role = res || roleFromToken;
          //console.log(this.role);
        },
        error: (err)=> {
          console.log(err.error);
        }
      }
    );



    // intialize register user form
    this.change_Pass_Form = this.fb.group({
      old_pass:['',[Validators.required]],
      new_pass:['',[Validators.required]]
    });
    

    this.route.params.subscribe((params) => 
    {
      // Access the userId parameter from the route (from login to admin-dash)
      this.Passed_user_Id = +params['userId']; // Convert to number

      console.log("Passed_user_Id = ",this.Passed_user_Id); //test
    });

    

  }

  



  change_Password()
  {
    // Access the form value
    const changePasswordRequest: ChangePasswordRequest = {
      OldPassword: this.change_Pass_Form.get('old_pass')?.value,
      NewPassword: this.change_Pass_Form.get('new_pass')?.value
    };
    //console.log(changePasswordRequest); //test

    this.api.changeUserPassword( this.Passed_user_Id , changePasswordRequest).subscribe(
      { 
      next: (res)=> { 
        console.log(res.message);
        
        this.toast.success({ detail:"sucess", summary: "تم تغيير كلمة السر", duration: 1000, position:'topCenter'});
        
        this.change_Pass_Form.reset();
      },
      error: (err)=>{ 
        console.log('Error Changing user password:', err.error);

        this.toast.success({ detail:"warning", summary: "كلمة السر السابقة غير صحيحة", duration: 1000, position:'topCenter'});

        this.change_Pass_Form.reset();
      }
      }
    );
  }


}
