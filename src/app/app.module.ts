import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GerenciadorTarefaComponent } from './gerenciador-tarefa/gerenciador-tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    GerenciadorTarefaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
