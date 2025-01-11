import { useState } from "react";
import observableTodoStore from "../stores/TodoStore";
import { observer } from "mobx-react";

const TodoList = observer(() => {
    const [openAdd, setOpenAdd] = useState(false);
    const [title, setTitle] = useState('');

    const containerStyle = {
        margin: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
    };

    const todoItemStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        transition: 'background-color 0.3s',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginLeft: '10px',
        transition: 'background-color 0.3s',
    };

    const addButtonStyle = {
        marginTop: '20px',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <p style={headerStyle}>All the todos:</p>
            {observableTodoStore.todos.map(todo => (
                <div 
                    style={todoItemStyle} 
                    key={todo.id}
                > 
                    <input type="checkbox" checked={todo.done} onChange={() => observableTodoStore.setDone(todo.id)} />
                    <p style={{ flexGrow: 1, margin: '0 10px' }}>{todo.title}</p>
                    <button 
                        style={buttonStyle} 
                        onClick={() => observableTodoStore.deleteTodo(todo.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
            <p style={headerStyle}>Only not done todos:</p>
            {observableTodoStore.todos.filter(todo => !todo.done).map(todo => (
                <div 
                    style={todoItemStyle} 
                    key={todo.id}
                > 
                    <input type="checkbox" checked={todo.done} onChange={() => observableTodoStore.setDone(todo.id)} />
                    <p style={{ flexGrow: 1, margin: '0 10px' }}>{todo.title}</p>
                </div>
            ))}
            <button style={addButtonStyle} onClick={() => setOpenAdd(true)}>Add todo</button>
            {openAdd && (
                <div>
                    <p>Enter the task title:</p>
                    <input
                        type="text"
                        placeholder="Task title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button 
                        style={buttonStyle} 
                        onClick={() => {
                            observableTodoStore.addTodo(title);
                            setOpenAdd(false);
                            setTitle('');
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
});

export default TodoList;
