import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/Tarefa';

@Component({
  selector: 'app-gerenciador-tarefa',
  templateUrl: './gerenciador-tarefa.component.html'
})
export class GerenciadorTarefaComponent implements OnInit {

  tarefa: Tarefa =  new Tarefa();
  listaTarefa: Tarefa[] = [];

  constructor() { 
    // Quando iniciado chama a função getKeys() que popula a lista listaTarefa para listar as tarefas salvas no LocalStorage
    this.getKeys();
  }

  ngOnInit() {}

  getKeys() {
    let keys = [];
    //pegando as chaves do LocalStorage e salvando na lista keys[].
    for (let b in Object.entries(localStorage)) {
      keys.push(window.localStorage.key(parseInt(b)));
    }
    // Recupernado as strings salvas no LocalStrage e trasformando em Objeto JSON e adicionando a lista listaTarefa
    for (let i in keys){
      this.listaTarefa.push(JSON.parse(localStorage.getItem(keys[i])));
    }
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

// Retorna um número aleatorio entre 0-1024
random() {
  return Math.floor(Math.random() * 1024);
}

lerTarefa() {
  if(this.testaFormato(this.tarefa.title)===undefined){
    this.tarefa = new Tarefa();
    alert('Formato invalido');
    (document.getElementById('tituloTarefa') as HTMLElement).focus();
  } 
  else {
    let tarefaFormatada = this.testaFormato(this.tarefa.title);
    let objetoTarefa = {id: this.random(), date: tarefaFormatada['date'], title: tarefaFormatada['title'], status: false};
    this.tarefa= objetoTarefa;

    localStorage.setItem(this.tarefa.id.toString(), JSON.stringify(this.tarefa));

    this.listaTarefa.push(this.tarefa);
    this.tarefa = new Tarefa();
    (document.getElementById('tituloTarefa') as HTMLElement).focus();
    }
  }

  removeTask(id){
    let tarefaId = this.listaTarefa.findIndex(task => task.id === id);
    this.listaTarefa.splice(tarefaId ,1);
    localStorage.removeItem(id);
  }

  concluiTask(id){
    let tarefaId = this.listaTarefa.findIndex(task => task.id === id);
    this.listaTarefa[tarefaId].status = true;

    localStorage.setItem(id, JSON.stringify(this.listaTarefa[tarefaId]));
  }
}
