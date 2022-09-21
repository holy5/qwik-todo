import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { Check } from "../icons/check";
import { Delete } from "../icons/delete";
import { Edit } from "../icons/edit";
import { Todo } from "../Main/main";
import styles from "./todoItem.css?inline";

export const TodoItem = component$((props: Todo) => {
    useStylesScoped$(styles);

    const state = useStore({
        completed: props.completed,
        edit: false,
        todo: {
            id: props.id,
            title: props.title,
            completed: props.completed,
        },
        deleteId: "",
    });

    const input = useStore({
        value: "",
    });

    console.log(input.value);
    return (
        <div class={state.completed ? "wrapper complete" : "wrapper"}>
            {!state.edit && <h3>{state.todo.title}</h3>}
            {state.edit && (
                <form
                    preventDefault:submit
                    onSubmit$={() => {
                        state.edit = false;
                        state.todo.title = input.value || props.title;
                    }}
                >
                    <input
                        type="text"
                        value={state.todo.title}
                        class="input-edit"
                        onChange$={(e) => {
                            input.value = (e.target as HTMLInputElement).value;
                        }}
                    />
                </form>
            )}
            <div className="tool">
                <div
                    onClick$={() => (state.completed = !state.completed)}
                    className="icon check"
                >
                    <Check />
                </div>
                <div
                    className="icon edit"
                    onClick$={() => (state.edit = !state.edit)}
                >
                    <Edit />
                </div>
                <div className="icon delete">
                    <Delete />
                </div>
            </div>
        </div>
    );
});
