import { Component } from '@angular/core';
//import { StoreUserService } from 'src/app/services/store-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from 'src/app/services/management.service';
import { NgToastService } from 'ng-angular-popup';

declare var $: any; // Declare jQuery to avoid TypeScript errors


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {


  constructor(private fb: FormBuilder,
              //private storeUserService : StoreUserService,
              private management_api_service: ManagementService,
              private toast: NgToastService)
  {}

  phoneNo;
  email;

  PhoneForm!: FormGroup;
  EmailForm!: FormGroup;

  ngOnInit()
  {  

    
    this.PhoneForm = this.fb.group(
      {
        NewPhoneNo: ['',[Validators.required]]
      }
    );
    this.EmailForm = this.fb.group(
      {
        NewEmail: ['',[Validators.required]]
      }
    );

    this.GetValues();
    
  }


  GetValues()
  {
    this.management_api_service.getContactInfo().subscribe(
      {
        next: (res) => {
          // test
          console.log(res);

          this.phoneNo = res.phoneNo;
          this.email = res.email;

          console.log(this.phoneNo, this.email);
        },
        error: (err) => {
          console.error('Error getting data of website contact Info:', err);
        }
      }
    );

  }

  UpdatePhone()
  {
    let new_phone = this.PhoneForm?.get('NewPhoneNo')?.value;
    console.log(new_phone);

    this.management_api_service.setPhoneNo(new_phone).subscribe(
      {
        next: (res) => {
          // test
          console.log(res.message);
          this.PhoneForm.reset();
          $('#edit-phone-modal').modal('hide');          
          this.toast.success({ detail:"sucess", summary: "تم تغيير رقم الهاتف", duration: 3000, position:'topCenter'});
          this.GetValues();
        },
        error: (err) => {
          console.error('Error updating the value of phoneNo:', err);
        }
      }
    );
  }

  UpdateEmail()
  {
    let new_email = this.EmailForm?.get('NewEmail')?.value;
    console.log(new_email);

    this.management_api_service.setEmail(new_email).subscribe(
      {
        next: (res) => {
          // test
          console.log(res.message);
          this.EmailForm.reset();
          $('#edit-email-modal').modal('hide');          
          this.toast.success({ detail:"sucess", summary: "تم تغيير البريد الالكتروني", duration: 3000, position:'topCenter'});
          this.GetValues();
        },
        error: (err) => {
          console.error('Error updating the value of phoneNo:', err);
        }
      }
    ); 
  }



}
