import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IUserInfo } from '../models/IUserInfo';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {

  constructor(private api: ApiService)
  {}

  user_id = 4;
  user!: IUserInfo;

  ngOnInit()
  {
    this.api.get_user_info(this.user_id).subscribe(
      { 
        next: (res)=> { //console.log(res);
                        this.user = res;
                        //console.log(this.user);
                        console.log('User info fetched successfully:')
                      },
        error: (err)=>{ console.log(err.error);
                        console.error('Error fetching user user:', err);
                      }
      }
      );   
  }

}
