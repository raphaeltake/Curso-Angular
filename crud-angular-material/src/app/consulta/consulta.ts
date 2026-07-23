import { Component, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

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
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", 'acoes']
  snack: MatSnackBar = inject(MatSnackBar)

  constructor(
    private service: ClienteService,
    private router: Router, //Navegação dentro do componente
  ) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes("")
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente)
    this.listaClientes = this.service.pesquisarClientes("")
    this.snack.open("Deletado com sucesso!")
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, "OK")
  }

}
