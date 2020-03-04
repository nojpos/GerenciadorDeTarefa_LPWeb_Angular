import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/Tarefa';

@Component({
  selector: 'app-gerenciador-tarefa',
  templateUrl: './gerenciador-tarefa.component.html',
  styleUrls: ['./gerenciador-tarefa.component.css']
})
export class GerenciadorTarefaComponent implements OnInit {

  tarefa: Tarefa;
  listaTarefa: Tarefa[] = [];

  constructor() { 
    this.getKeys()
  }

  ngOnInit() {
    this.renderTarefas;
  }

  getKeys() {
    let keys = [];
    for (let b in Object.entries(localStorage)) {
      //pegando as chaves e salvando na lista.
      keys.push(window.localStorage.key(parseInt(b)));
    };
    console.log(keys)
    for (let i in keys){
      console.log(keys[i])
      this.listaTarefa.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    console.log(this.listaTarefa)

    return keys;
}

renderTarefas(){
  for (let i in this.getKeys()) {
    console.log(i)
    // this.listaTarefa.push(JSON.parse(localStorage.getItem(i)))
  }
  console.log(this.listaTarefa)
}

  testaFormato(testar) {
    let te = /em\s[0-9]*\/[0-9]*\/[0-9]{4}$/;
    if(te.test(testar)==false){
        return undefined;
    }else {
        let converted = {'date':'', 'title':''};
        converted['title'] = testar.slice(0, te.exec(testar).index);
        converted['date'] = testar.slice(te.exec(testar).index+3, testar.length-5);
        return converted;
    }
}

//retorna um número aleatorio entre 0-1024
random() {
  return Math.floor(Math.random() * 1024);
}

//formata a data
formatDate(date) {
  return date.replace(/\/[0-9]*$/, "");
}

lerTarefa(value) {
    if(this.testaFormato(value)===undefined){
      document.getElementById("tituloTarefa").setAttribute('value', 'Formato inválido.');
    } 
    else {
      let tarefaFormatada = this.testaFormato(value);
      let objetoTarefa = new Tarefa(this.formatDate(tarefaFormatada['date']), tarefaFormatada['title'], false);
      console.log(objetoTarefa)

      const userString = JSON.stringify(objetoTarefa);
      let tarefa_id = this.random();

      localStorage.setItem(tarefa_id.toString(), userString);

      this.listaTarefa.push(objetoTarefa)
      console.log(this.listaTarefa)

      // let tarefa_atual = JSON.parse(localStorage.getItem(tarefa_id));
      // renderTask(tarefa_id, tarefa_atual["date"], tarefa_atual["title"], tarefa_atual["status"]);

      // document.getElementById("tituloTarefa").value = ""
    }
  }
}
