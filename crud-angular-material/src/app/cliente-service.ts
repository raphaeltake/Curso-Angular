import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES"

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage()

    if (!nomeBusca) {
      return clientes
    }

    return clientes.filter(cliente => cliente.nome?.toLowerCase()?.indexOf(nomeBusca.toLowerCase()) !== -1)
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

  buscarClientePorId(id: string): Cliente | undefined { //retorna cliente ou undefined
    const cliente = this.obterStorage()
    //filter mais de um elemento.
    //find apenas uma elemento.
    return cliente.find(cliente => cliente.id === id);
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage()
    storage.forEach(c => {
      if (c.id == cliente.id) {
        Object.assign(c, cliente) //Troca o objeto já salvo pelo novo (atualizado)
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage()

    const novaLista = storage.filter(c => c.id !== cliente.id)

    // const indexItem = storage.indexOf(cliente) //outra forma

    // if (indexItem > -1) {
    //   storage.splice(indexItem, 1)
    // }
    console.log(storage)
    console.log("AAAAA")
    console.log(cliente)
    console.log(novaLista)

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista))
  }
}
