import {
    component$,
    useRef,
    useStore,
    useStylesScoped$,
} from "@builder.io/qwik";
import { TodoItem } from "../TodoItem/todoItem";
import styles from "./main.css?inline";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface StateStore {
    showDropdown: boolean;
    name: string | undefined;
    todos: Todo[] | null;
}

export const Main = component$(() => {
    useStylesScoped$(styles);

    const state = useStore<StateStore>({
        showDropdown: false,
        todos: [
            {
                id: 1,
                title: "Learn Qwik",
                completed: false,
            },
        ],
        name: "",
    });
    const inputRef = useRef();

    return (
        <main>
            <h1 className="title">What is your todo?</h1>
            <div className="todo-wrapper">
                <button
                    class={state.showDropdown ? "close" : "add"}
                    onClick$={() => (state.showDropdown = !state.showDropdown)}
                >
                    {state.showDropdown ? "Close todo" : "Add todo"}
                </button>
                {state.showDropdown && (
                    <form
                        preventDefault:submit
                        class="dropdown"
                        onSubmit$={() => {
                            state.name &&
                                state.todos?.push({
                                    id: Math.round(Math.random() * 10000),
                                    title: state.name,
                                    completed: false,
                                });
                            state.name = "";
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Your todo"
                            ref={inputRef}
                            value={state.name}
                            onInput$={(e) =>
                                (state.name = (
                                    e.target as HTMLInputElement
                                ).value)
                            }
                        />
                        <button type="submit">Add</button>
                    </form>
                )}

                <div className="todo-list">
                    {state.todos?.map((todo) => (
                        <TodoItem
                            id={todo.id}
                            completed={todo.completed}
                            title={todo.title}
                            key={todo.id}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
});
