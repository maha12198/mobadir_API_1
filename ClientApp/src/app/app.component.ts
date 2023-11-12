import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mobadir-Elearning-Angular';

  // header: any;

  // constructor(private router: Router) { }

  // ngOnInit() 
  // {
  //   this.router.events
  //     .subscribe((event) => {
  //       if (event instanceof NavigationEnd) {
  //         this.header = ((event.url !== '/') && (event.url !== '/home'))
  //       }
  //     });
  // }
}
