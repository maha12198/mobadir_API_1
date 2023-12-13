import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IUserInfo } from '../models/IUserInfo';

import { StoreUserService } from '../services/store-user.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {

  constructor(private api: ApiService,
              private storeUserService: StoreUserService,
              private authServiceApi: AuthService)
  {}

  user_id = 4;
  user!: IUserInfo;

  username!: any;
  role!: any;

  ngOnInit()
  {
    this.api.get_user_info(this.user_id).subscribe(
      { 
        next: (res)=> { //console.log(res);
                        this.user = res;
                        //console.log(this.user);
                        console.log('User info fetched successfully:')
                      },
        error: (err)=>{ //console.log(err.error);
                        console.error('Error fetching user user:', err);
                      }
      }
    );
    
    // getting (username) user info from store
    this.storeUserService.getNameFromStore().subscribe(
      {
        next: (res)=> {
          // htis value which is from the store service will be retrieved and displayed sucessfully
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


  }

}
