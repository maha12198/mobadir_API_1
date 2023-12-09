import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../services/api.service';
//import { IUser } from '../models/IUserLogin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  // declare variables
  //UsersList: IUser[] | any ;

  constructor(private api : ApiService) {}

  ngOnInit() 
  {
    // call the api service
    // this.api.GetUsers().subscribe(
    //   {
    //     next: (res)=> { this.UsersList = res;
    //                     // for testing purposes
    //                     console.log(this.UsersList);
    //                     for (var user of this.UsersList) 
    //                     {
    //                       console.log(user.Email);
    //                     }
    //                   },
    //     error: (err)=>{ console.log(err);}               
    //   }
    // );  
  }


}
