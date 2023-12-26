import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  constructor(private Home_service_Api : HomeService) {}
  
  Contact_List;
  ngOnInit() 
  {
    // Get contact us info from API
    this.Home_service_Api.Get_ContactUs_Info().subscribe(
      {
        next: (res)=> { 
          console.log(res);
          this.Contact_List = res;
          },
        error: (err)=> { console.log(err);}               
      }
    );  
  }


}
