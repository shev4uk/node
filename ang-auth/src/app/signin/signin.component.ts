import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSignin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.formSignin = this.fb.group({
      email: [],
      password: []
    });
  }

  onSubmit() {
    this.auth.signin(this.formSignin.value).subscribe( (res) => {
      console.log(res);
    });
  }

}
