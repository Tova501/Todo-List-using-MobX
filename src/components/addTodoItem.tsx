import { useState } from "react"
import observableTodoStore from "../stores/TodoStore"

const [title, setTitle] = useState('')

const AddTodoItem = () =>{
return(<>
    <p>enter the task title: </p>
    <input type="text" placeholder="task title" onChange={(e)=>setTitle(e.target.value)}/>
    <button onClick={()=>{observableTodoStore.addTodo(title)}}>add</button>
</>)
}

export default AddTodoItem