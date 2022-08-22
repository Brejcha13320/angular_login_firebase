import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  recordarme = false;

  constructor( private auth:AuthService,
               private router:Router) { 
    this.usuario = new UsuarioModel;
  }

  ngOnInit(): void {
  }

  onSubmit( formulario:NgForm ){

    if(formulario.invalid){
      return;
    }

    Swal.fire({
      text: 'Espere por favor',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al registrar',
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
      case "nombre":
        if((formulario.submitted && formulario.form.controls['nombre'].invalid) === true ){
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

  /* getStateEmail( formulario:NgForm ){
    if((formulario.submitted && formulario.form.controls['email'].invalid) === true ){
      return true;
    } else {
      return false;
    }
  }

  getStateNombre( formulario:NgForm ){
    if((formulario.submitted && formulario.form.controls['nombre'].invalid) === true ){
      return true;
    } else {
      return false;
    }
  }

  getStatePassword( formulario:NgForm ){
    if((formulario.submitted && formulario.form.controls['password'].invalid) === true ){
      return true;
    } else {
      return false;
    }
  } */


}
