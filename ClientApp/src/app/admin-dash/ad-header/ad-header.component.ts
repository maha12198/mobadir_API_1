import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrls: ['./ad-header.component.css']
})
export class AdHeaderComponent {

  constructor(private authService: AuthService)
  {}

  signOut()
  {
    this.authService.signOut();
  }

}
