import { Component, Inject, ViewEncapsulation } from '@angular/core'

import { AppActions } from '../../app'
import { TodoList } from './todolist.class'

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'todolist',
    styles: [
        require('./_todolist.component.scss'),
    ],
    template: require('./_todolist.component.html'),
})

export class TodolistComponent {

    public todolistInput: string
    public todoList: TodoList[]
    public selectedFilter: string

    constructor (
        @Inject('AppStore') private appStore
    ) {
        this.todolistInput = ''
        this.todoList = []

        this.showAll();
    }

    public ngOnInit () {
        this.appStore.dispatch(AppActions.setLoading(false))
    }

    public tasksLeft () {
        return this.todoList.filter(t => !t.completed).length
    }

    public addTask () {
        if (!this.todolistInput.trim().length) {
            return;
        }

        let id = this.todoList.length;
        let text = this.todolistInput;
        let task = new TodoList(id, text);

        this.todoList.push(task);

        this.todolistInput = '';
    }

    public editTask (task:TodoList) {
        if (!task.text.trim().length) {
            this.removeTask(task.id);
        }

        task.modificationMode = !task.modificationMode;
    }

    public removeTask (id:number) {
        this.todoList = this.todoList.filter(t => t.id !== id);
    }

    public showAll () {
        this.selectedFilter = 'all'
    }

    public showActives () {
        this.selectedFilter = 'actives'
    }

    public showCompleted () {
        this.selectedFilter = 'completed'
    }
}
