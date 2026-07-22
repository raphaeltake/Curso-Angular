import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAnchor } from "@angular/material/button";
import { ClienteService } from '../cliente-service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatAnchor,
    CommonModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta {

  nomeBusca: string = ""

  listaClientes: Cliente[] = []
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email"]

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes("")
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
  }

}
