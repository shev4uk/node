import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formResetPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.formResetPassword = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    this.auth.resetPassword(this.formResetPassword.value).subscribe( (res) => {
      console.log(res);
    });
  }

}
