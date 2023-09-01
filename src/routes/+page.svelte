<script lang="ts">
    import Tipex from "$lib/tipex/Tipex.svelte";
    import '$lib/tipex/styles/Controls.postcss';
    import '$lib/tipex/styles/EditLink.postcss';
    import '$lib/tipex/styles/ProseMirror.postcss';
    import "$lib/tipex/styles/Tipex.postcss";

    import UseTipex from "$lib/components/codes/UseTipex.svelte";
    import InstallTipex from "$lib/components/codes/InstallTipex.svelte";
    import PropsTable from "$lib/components/PropsTable.svelte";
    import {tipexEditor} from "$lib/tipex/editorStore.js";
    import AccessEditor from "$lib/components/codes/AccessEditor.svelte";

    let htmlContent = `
    <p>This <strong>content</strong> is written by
    <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
    You can edit this content and see the changes in the editor.
    </p>
    <p>Do you have any questions? Feel free to ask in the <a href="https://github.com/Bishwas-py/tipex"
    target="_blank" rel="noopener noreferrer">Github repository</a>.</p>
    `;

</script>

<div class="max-w-3xl w-full">
    <h1>Tipex Editor</h1>
    <p>
        Tipex is a goto rich text editor for Svelte, engined by
        <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev/">Tiptap</a>
        and <a target="_blank" rel="noopener noreferrer" href="https://prosemirror.net/">Prosemirror</a>.
        It gives you the power to create rich text editor without worrying about the underlying
        technology, styling and other stuffs.
    </p>

    <Tipex htmlContent={htmlContent}
           style="margin-top: 1rem; margin-bottom: 0rem;"
           class="h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full shadow-xl"/>

    <h2 class="mt-8">Installation</h2>
    <p>
        Install the package from npm.
    </p>
    <InstallTipex/>

    <h2 class="mt-8">Usage</h2>
    <p>
        Import the component and use it in your component.
    </p>
    <UseTipex/>

    <blockquote class="mt-2">
        <p>
            The import for <code>@friendofsvelte/tipex/styles/ProseMirror.css</code> is used to
            style content written in the editor. You can use your own style or use the default one.
        </p>
    </blockquote>

    <h2 class="mt-8">Props</h2>
    <p>
        Tipex component accepts following props.
    </p>
    <PropsTable/>

    <h2 class="mt-8">Accessing Editor Instance</h2>
    <p>
        You can access the editor instance via:
    </p>
    <AccessEditor/>
    <p>
        The editor instance is stored in a store. You can use it to access the editor instance
        from anywhere in your app.
    </p>
</div>

<style lang="postcss">


    h1 {
        @apply text-3xl font-bold;
        @apply text-neutral-700 dark:text-neutral-200;
    }

    p {
        @apply text-lg;
        @apply text-neutral-600 dark:text-neutral-300;
    }

    h2 {
        @apply text-2xl font-bold;
        @apply text-neutral-700 dark:text-neutral-200;
    }

    blockquote {
        @apply rounded border-l-4 border-neutral-200 dark:border-neutral-700;
        @apply bg-neutral-100 dark:bg-neutral-800;
        @apply text-neutral-700 dark:text-neutral-200;
        @apply px-4 py-2;
        @apply mt-3 ml-2;
    }

    code {
        @apply bg-neutral-100 dark:bg-neutral-800;
        @apply text-neutral-700 dark:text-neutral-200;
        @apply px-1;
    }
</style>