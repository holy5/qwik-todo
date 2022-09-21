import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Header } from "~/components/Header/Header";
import { Main } from "~/components/Main/main";

export default component$(() => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Qwik Todo",
};
