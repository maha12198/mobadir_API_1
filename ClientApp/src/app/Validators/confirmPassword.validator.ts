import { AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmedValidator(control: AbstractControl): ValidationErrors | null 
{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      return { passwordMatch: true };
    }
  
    return null;
}