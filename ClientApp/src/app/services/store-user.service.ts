import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {

  // -- this service is used to deal with STATE MANAGEMENT in the application
  // we should get the data from the token by decrypting it by using (npm i) package auth0/angular-jwt

  // $ for observable donation
  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  // Info :
    // Observables are commonly used for handling asynchronous operations, such as making HTTP requests,
    // handling user interactions, and managing application state. Angular's HttpClient returns Observables for HTTP requests,
    // and Angular's forms module leverages Observables for handling form changes.

  constructor() { }

  public getRoleFromStore ()
  {
    return this.role$.asObservable();
  }
  public setRoleForStore (role: string)
  {
    // to emit/send the new role to the subscribers
    this.role$.next(role);
  }


  public getNameFromStore ()
  {
    return this.name$.asObservable();
  }
  public setNameForStore (name: string)
  {
    this.name$.next(name);
  }

}
