import { Pipe, PipeTransform } from '@angular/core'

import { TodoList } from './todolist.class'

@Pipe({
    name: 'todolistFilter',
})
export class TodolistPipe implements PipeTransform {
    public transform (input: TodoList[], selectedFilter: string): TodoList[] {
        if (selectedFilter === 'actives') {
            return input.filter(i => !i.completed);
        }

        if (selectedFilter === 'completed') {
            return input.filter(i => i.completed);
        }

        return input;
    }
}
