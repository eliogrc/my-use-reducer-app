import { useReducer, useState } from "react";

type Todo = {
    id: number;
    text: string;
}

type State = {
    todos: Todo[];
}

type Action =
    | { type: "ADD_TODO"; payload: string }
    | { type: "REMOVE_TODO"; payload: number }


const initialState: State = {
    todos: []
}

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                todos: [
                    ...state.todos,
                    {
                        id: state.todos.length + 1,
                        text: action.payload
                    }
                ]
            }
        case "REMOVE_TODO":
            return {
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        default:
            return state;
    }
}

const emojiMap: Record<string, string> = {
    eat: "🍽️",
    sleep: "😴",
    code: "💻",
    repeat: "🔁",
    study: "📚",
};

const TodoList: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [todoText, setTodoText] = useState("");

    const handleAddTodo = () => {

        const payload = emojiMap[todoText.toLowerCase()] || todoText;

        if (payload.trim()) {
            dispatch({ type: "ADD_TODO", payload });
            setTodoText("");
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTodo();
        }
    }

    return (
        <div>
            <h1>Made with useReducer</h1>
            <h1>Emoji Todo List</h1>
            <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a todo..."
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id} onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
                        {todo.text}
                         {/* <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>Remove</button> */}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default TodoList;