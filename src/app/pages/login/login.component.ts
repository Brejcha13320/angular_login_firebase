import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel;
  recordarme = false;

  constructor( private auth:AuthService,
               private router:Router ) { 
    this.usuario = new UsuarioModel;
  }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email') + "";
      this.recordarme = true;
    }
  }

  onSubmit( formulario:NgForm){

    if(formulario.invalid){
      return;
    }

    Swal.fire({
      text: 'Espere por favor',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp=>{

      console.log(resp);
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      } else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/home');




    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        text: err.error.error.message,
        icon: 'error',
        //confirmButtonText: 'OK',
        //allowOutsideClick: false
      });
    });

  }

  getStateForm( formulario:NgForm, name:string ):boolean{
    switch(name){
      case "email":
        if((formulario.submitted && formulario.form.controls['email'].invalid) === true ){
          return true;
        } else {
          return false;
        }
      case "password":
        if((formulario.submitted && formulario.form.controls['password'].invalid) === true ){
          return true;
        } else {
          return false;
        }
        default:
          return true;
    }
  }


}
