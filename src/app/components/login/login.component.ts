import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  hasErros = false;

  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService ) {}
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  email: string = '';
  password: string = '';

  get isDisabled() { return this.form.controls['email'].hasError('required') || this.form.controls['password'].hasError('required'); }

  login()  {
    console.log('Email:', this.form.controls['email'].value);
    console.log('Password:', this.form.controls['password'].value);


    if (this.email === '' || this.password ) {
      this.hasErros = true;
    } else {
      this.hasErros = false;
    }

   
    this.firebase.login(this.form.controls['email'].value, this.form.controls['password'].value);
  }

  register() {
    console.log('Email:', this.form.controls['email'].value);
    console.log('Password:', this.form.controls['password'].value);


    if (this.email === '' || this.password ) {
      this.hasErros = true;
    } else {
      this.hasErros = false;
    }

  
    this.firebase.register(this.form.controls['email'].value, this.form.controls['password'].value);
  }
}
