import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Cliente } from './cliente'
import { ClienteService } from '../cliente-service'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask' //Coloca mascaras nos inputs
import { MatSnackBar } from '@angular/material/snack-bar'
import { BrasilApiService } from '../brasil-apiservice';
import { Estado, Municipio } from '../brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  cliente: Cliente = Cliente.newCliente()
  atualizando: boolean = false
  snack: MatSnackBar = inject(MatSnackBar)
  estados: Estado[] = []
  municipios: Municipio[] = []

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute, //Captura dados da rota que foi acessada
    private router: Router,
    private brasilApiService: BrasilApiService
  ) { }

  ngOnInit() {
    this.carregarUFs()
    if (this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']

      if (id) {
        this.cliente = this.service.buscarClientePorId(id) || Cliente.newCliente()

        if (this.cliente) {
          const event = { value: this.cliente.uf }
          this.atualizando = true
          this.carregarMunicipios(event as MatSelectChange)
        }

      }
    })) { }
  }

  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente)
      this.cliente = Cliente.newCliente()
      this.mostrarMensagem("Salvo com sucesso!")
    } else {
      this.service.atualizar(this.cliente)
      this.router.navigate(["/consulta"])
      this.mostrarMensagem("Atualizado com sucesso!")
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, "OK")
  }

  carregarUFs() {
    //Observable -> observa até que a ação deseja seja realizada
    //Subcriber -> quem vai receber a informação que foi processada
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("Ocorreu um erro: ", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange) {
    const ufSelecionada = event.value
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("Ocorreu um erro: ", erro)
    })
  }

}
