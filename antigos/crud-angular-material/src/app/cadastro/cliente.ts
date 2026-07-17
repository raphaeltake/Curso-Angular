import { v4 as uuid } from 'uuid' //Para gerar id

export class Cliente {
  id?: string
  nome?: string
  cpf?: string
  dataNascimento?: string
  email?: string

  static newCliente() {
    const cliente = new Cliente();
    cliente.id = uuid()
    return cliente;
  }
}