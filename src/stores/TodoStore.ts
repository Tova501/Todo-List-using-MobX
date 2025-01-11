type Todo = {id:number, title:string, done:boolean}

import { makeAutoObservable} from "mobx";

class ObservableTodoStore {
    todos:Todo[] = [];
  
    constructor() {
      makeAutoObservable(this)
    }
  
    get notDoneTodosCount():Todo[] {
      return this.todos.filter(
        todo => todo.done == false
      )
    }
  
    setDone(id:number){
      console.log(id)
      let todo:Todo | undefined= this.todos.find(t=>t.id==id)
      todo!.done = !todo?.done
    }

    addTodo(todo:string) {
      this.todos.push({
        id:this.maxId(),
        title: todo,
        done:false
      });
    }

    deleteTodo(id:number){
      console.log("id: ", id)
      this.todos = this.todos.filter(t=>t.id!=id)
      console.log(this.todos)
    }

    maxId(): number {
      return this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }
  }
  
  const observableTodoStore = new ObservableTodoStore();

  export default observableTodoStore
                          
