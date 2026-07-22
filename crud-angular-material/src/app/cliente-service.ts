import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES"

  pesquisarClientes(nome: string) : Cliente[]{
    return this.obterStorage();
  }

  private obterStorage(): Cliente[] {
    const repositoriosClientes = localStorage.getItem(ClienteService.REPO_CLIENTES)
    if (repositoriosClientes) {
      const clientes: Cliente[] = JSON.parse(repositoriosClientes)
      return clientes
    }

    const clientes: Cliente[] = []
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
    return clientes
  }


  salvar(cliente: Cliente) {
    const storage = this.obterStorage()
    storage.push(cliente)
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  }
}
