import { Component, Inject, ViewEncapsulation } from '@angular/core'

import { AppActions } from '../../app'
import { TodoList } from './todolist.class'
import { TodolistPipe } from './todolist.pipe'

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'todolist',
    styles: [
        require('./_todolist.component.scss'),
    ],
    template: require('./_todolist.component.html'),
})

export class TodolistComponent {
    public todolistInput: string = ''
    public todoList: TodoList[] = []
    public selectedFilter: string = 'all'

    constructor (
        @Inject('AppStore') private appStore,
    ) {}

    public ngOnInit () {
        this.appStore.dispatch(AppActions.setLoading(false))
        console.log('2')
    }

    public onSubmit () {
        if (this.todolistInput.trim() !== '') {
            this.todoList = [
                ...this.todoList,
                new TodoList(this.todolistInput, false, false),
            ]

            this.todolistInput = ''
        }
    }

    public destroy (todo: TodoList) {
        this.todoList = [...this.todoList.filter(t => t !== todo)]
    }

    public tasksLeft () {
        return this.todoList.filter(t => !t.completed).length
    }

    public filter (filter: string) {
        this.selectedFilter = filter
    }

    public editContent (index) {
        this.todoList[index].editMode = true
    }

    public onEdit (index) {
        if (this.todoList[index].text.trim() === '') {
            this.destroy(this.todoList[index])
        } else {
            this.todoList[index].editMode = false
        }
    }

    public onCheck (index) {
        this.todoList = [...this.todoList]
    }
}
