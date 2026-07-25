import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria-service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.css',
})
export class Lugar {

  camposForm: FormGroup
  categorias: Categoria[] = []

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup(
      {
        nome: new FormControl("", Validators.required),
        categoria: new FormControl("", Validators.required),
        localizacao: new FormControl("", Validators.required),
        urlFoto: new FormControl("", Validators.required),
        avaliacao: new FormControl("", Validators.required)
      }
    )
  }

  salvar() {
    console.log(this.camposForm.value)
    this.camposForm.reset()
  }

  ngOnInit() {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        this.categorias = listaCategorias.sort((x, y) => (x.nome ?? "").localeCompare(y.nome ?? ""))
        console.log(this.categorias)
      },
    })
  }

}
