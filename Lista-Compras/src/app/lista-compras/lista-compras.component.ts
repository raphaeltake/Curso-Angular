import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-compras',
  imports: [ FormsModule ],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent {
  item: string = ''

  adicionarItem(){
    console.log("item recebido: ", this.item)
    this.item = ''
  }
}
