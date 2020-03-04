import { Data } from '@angular/router';

export class Tarefa{

    constructor(public date: string, public title: string, public status: boolean){
        this.date = date;
        this.title = title;
        this.status = status;
    }
}

// Teste tarefa em 20/20/2020