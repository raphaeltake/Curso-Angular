import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria {

  camposForm: FormGroup
  constructor() {
    this.camposForm = new FormGroup({
      nome: new FormControl("", Validators.required),
      descricao: new FormControl("", Validators.required)
    })
  }

  salvar() {
    console.log(this.camposForm.value)
    console.log(this.camposForm.valid)
  }

}
