import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreUserService } from 'src/app/services/store-user.service';

@Component({
  selector: 'app-ad-sidebar',
  templateUrl: './ad-sidebar.component.html',
  styleUrls: ['./ad-sidebar.component.css']
})
export class AdSidebarComponent {

  constructor(private storeUserService : StoreUserService,
              private authServiceApi: AuthService)
  {}

  role!: any;
  AdminRole: boolean = false;
  user_id: number | null | undefined;

  ngOnInit()
  {
    // Subscribe to the userId$ observable to get the user id that should be passed to admin-dash route
    this.storeUserService.userId$.subscribe((userId) => {
      this.user_id = userId;
      //console.log("user id subscribed in sidebar", this.user_id);
    });


    // getting (role) of user from store and from decoded token in auth service
    this.storeUserService.getRoleFromStore().subscribe(
      {
        next: (res)=> {
          //console.log(res);
          
          let roleFromToken = this.authServiceApi.getRoleFromToken();
          //console.log(roleFromToken); //this will be undefined before we refresh
          
          this.role = res || roleFromToken;
          //console.log(this.role);

          if (this.role == "مدير")
          {
            this.AdminRole = true; 
          }

        },
        error: (err)=> {
          console.log(err.error);
        }
      }
    );

  }

}
