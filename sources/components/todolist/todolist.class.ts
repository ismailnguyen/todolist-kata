export class TodoList {
    public id: number
    public completed: boolean
    public text: string
    public modificationMode: boolean

    constructor(id: number, text: string) {
        this.id = id;
        this.completed = false;
        this.text = text;
        this.modificationMode = false;
    }
}
