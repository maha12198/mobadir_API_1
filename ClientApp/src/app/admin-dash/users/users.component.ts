import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { confirmedValidator } from '../../Validators/confirmPassword.validator';
import { IUserRegister } from 'src/app/models/IUserRegister';
import { IUserInfo } from 'src/app/models/IUserInfo';
import { IEditUsername} from 'src/app/models/IEditUsername';
import { ChangePasswordRequest } from 'src/app/models/ChangePasswordRequest';

import { NgToastService } from 'ng-angular-popup';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  
  constructor(private fb: FormBuilder,
              private service: ApiService,
              private toast : NgToastService) {}

  
  //-------------  variables
  registerUserForm!: FormGroup;
  
  newUser: IUserRegister | undefined;

  users_List: IUserInfo[] | undefined;

  edit_Username_Form!: FormGroup;

  change_Pass_Form!: FormGroup;


  ngOnInit(): void 
  {
    // intialize register user form
    this.registerUserForm = this.fb.group({
      username:['',[Validators.required]],
      password:['', [Validators.required]],
      confirmpass:['', [Validators.required]],
      role: ['', [Validators.required]]
    });

    
    this.GetAllUsers();

    // intialize register user form
    this.edit_Username_Form = this.fb.group({
      new_username:['',[Validators.required]]
    });

    // intialize register user form
    this.change_Pass_Form = this.fb.group({
      old_pass:['',[Validators.required]],
      new_pass:['',[Validators.required]]
    });
    
  }


  // getter methods for form controls in the form
  get username() {
  return this.registerUserForm.get('username');
  }
  get password() {
    return this.registerUserForm.get('password');
  }
  get confirmpass() {
    return this.registerUserForm.get('confirmpass');
  }
  get role() {
    return this.registerUserForm.get('role');
  }



  
  registerUser()
  {
    //console.log("register here");
    this.newUser = {
      Username : this.registerUserForm?.get('username')?.value,
      Password : this.registerUserForm.get('password')?.value,
      Role: this.registerUserForm.get('role')?.value
    };
    //console.log(this.newUser);

    if (this.registerUserForm.invalid)
    {
      console.log("invalid form data");
      return;
    }

    this.service.signup(this.newUser).subscribe(
      { next: (res)=> { //console.log(res.message);
                        console.log('User created successfully')
                        //this.registerUserForm.reset();
                        // to refresh the users table
                        this.GetAllUsers();
                        //use jquery to close/hide the modal after submitting the data
                        $('#add-user-modal').modal('hide');
                      },
        error: (err)=>{ //console.log(err.error);
                        console.error('Error creating user:', err);
                      }
      }
    ); 
  }


  GetAllUsers()
  {
    // get all users ( for the table)
    this.service.get_all_users().subscribe(
      { next: (res)=>
        { //console.log(res);
          this.users_List = res;
          //console.log(this.users_List);
        },
        error: (err)=>{
          //console.log(err.error);
          console.log('Error fetching users:', err);
        }
      }
    );
  }

  //---- to get the id of the selected user in the table
  // Variable to store the current user ID for editing
  Pass_Selected_UserId!: number;
  // Method to set the current user ID before showing the modal
  setEditUserId(userId: number) {
    this.Pass_Selected_UserId = userId;
    //console.log(this.editUserId);
  }
  
  Edit_username()
  {
    // Access the new_username value
    const newUsernameValue = this.edit_Username_Form.get('new_username')?.value;
    //console.log('New Username:', newUsernameValue);
    const editUsernameObj: IEditUsername = {
      id: this.Pass_Selected_UserId,
      new_username: newUsernameValue
    };

    //console.log('Edit User Data:', editUsernameObj);
    this.service.edit_username(editUsernameObj).subscribe(
      { next: (res)=> { 
          //console.log(res);
          // to refresh the users table
          this.GetAllUsers();

          //use jquery to close/hide the modal after submitting the data
          $('#edit-user-modal').modal('hide');
        },
        error: (err)=>{ 
          //console.log(err.error);
          console.log('Error editing user:', err);
        }
      }
    ); 
  }

  delete_user()
  {
    this.service.delete_user(this.Pass_Selected_UserId).subscribe(
      { next: (res)=> { 
          console.log(res);
          this.GetAllUsers();
          $('#confirm-delete-modal').modal('hide');
        },
        error: (err)=>{ 
          console.log('Error deleting user:', err);
        }
      }
    ); 
  }

  // Define a variable to store the alert message
  alertMessage: string | null = null;

  change_Password() {
    // Access the form value
    const changePasswordRequest: ChangePasswordRequest = {
      OldPassword: this.change_Pass_Form.get('old_pass')?.value,
      NewPassword: this.change_Pass_Form.get('new_pass')?.value
    };

    console.log(changePasswordRequest); //test

    this.service.changeUserPassword(this.Pass_Selected_UserId, changePasswordRequest).subscribe(
      { 
      next: (res)=> { 
        console.log(res.message);
        $('#edit-password-modal').modal('hide');
        this.toast.success({ detail:"sucess", summary: "تم تغيير كلمة السر", duration: 1000, position:'topCenter'});
      },
      error: (err)=>{ 
        console.log('Error Changing user password:', err.error);

        // to make the arabic message
        this.alertMessage = "كلمة السر السابقة غير صحيحة";
        //console.log(this.alertMessage);

        this.change_Pass_Form.reset();
      }
      }
    );
  }

  

}
