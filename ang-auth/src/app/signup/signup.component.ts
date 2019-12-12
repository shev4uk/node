import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)]],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.auth.signup(this.formSignup.value).subscribe( (res) => {
      console.log(res);
    });
  }

}
