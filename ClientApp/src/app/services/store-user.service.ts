import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {

  // -- this service is used to deal with STATE MANAGEMENT in the application
  // we should get the data from the token by decrypting it by using (npm i) package auth0/angular-jwt
  // $ for observable donation
  // Info :
    // Observables are commonly used for handling asynchronous operations, such as making HTTP requests,
    // handling user interactions, and managing application state. Angular's HttpClient returns Observables for HTTP requests,
    // and Angular's forms module leverages Observables for handling form changes.

  

  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  // new for user id
  private userIdSource = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSource.asObservable(); // the getter for the user id


  constructor() {
    // Retrieve user ID from localStorage on service initialization ( to avoid getting it as NULL when the page refrshes)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userIdSource.next(+storedUserId);
    }
  }


  // -------- user Role -----------
  public getRoleFromStore ()
  {
    return this.role$.asObservable();
  }
  // will be set in the loginform
  public setRoleForStore (role: string)
  {
    // to emit/send the new role to the subscribers
    this.role$.next(role);
  }


  // --------- username -----------
  public getNameFromStore ()
  {
    return this.name$.asObservable();
  }
  // will be set in the loginform
  public setNameForStore (name: string)
  {
    this.name$.next(name);
  }



  // ---------- new for user id -----------
  // will be set in the loginform
  setUserId(userId: number | null): void 
  {
    if (userId !== null) 
    {
      console.log("userId in setUserId() = ", userId); // test
      
      // Update BehaviorSubject and store in localStorage
      this.userIdSource.next(userId);
      localStorage.setItem('userId', userId.toString()); // this will help in avoiding the userId change to null when refreshing the page
    }
  }
  // the getter is a variable already declared above 

}
