import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.formSignup = this.fb.group({
      email: [],
      password: []
    });
  }

  onSubmit() {
    this.auth.signup(this.formSignup.value).subscribe( (res) => {
      console.log(res);
    });
  }

}
