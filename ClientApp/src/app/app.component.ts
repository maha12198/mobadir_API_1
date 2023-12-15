import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mobadir-Elearning-Angular';

  // to load/scroll the page from the top of the page
  onActivate(event: any) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
    }

  //admin;
  // currentUserId: number | null = null;

  // onUserIdChanged(userId: number | null) {
  //   this.currentUserId = userId;
  // }
  
  constructor(public router: Router) { }
  
  // ngOnInit() 
  // {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   )
  //   .subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.admin = ((event.url !== '/admin-dash') && (event.url !== '/admin-topic') &&
  //                     (event.url !== '/admin-all-topics') && (event.url !== '/admin-grades') &&
  //                     (event.url !== '/admin-subjects') && (event.url !== '/admin-users') &&
  //                     (event.url !== '/admin-edit-topic')&& (event.url !== '/edit-contact'))

                      
  //     }
  //   });
  // }
}
