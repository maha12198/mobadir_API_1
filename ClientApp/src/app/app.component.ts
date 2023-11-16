import { Component } from '@angular/core';

// import { Router, NavigationEnd } from '@angular/router';

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
