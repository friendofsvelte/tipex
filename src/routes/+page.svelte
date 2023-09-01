<script lang="ts">
    import Tipex from "$lib/tipex/Tipex.svelte";
    import '$lib/tipex/styles/Controls.css';
    import '$lib/tipex/styles/EditLink.css';
    import '$lib/tipex/styles/ProseMirror.css';
    import "$lib/tipex/styles/Tipex.css";

    import UseTipex from "$item/codes/UseTipex.svelte";
    import InstallTipex from "$item/codes/InstallTipex.svelte";
    import PropsTable from "$item/PropsTable.svelte";
    import AccessEditor from "$item/codes/AccessEditor.svelte";

    let htmlContent = `
    <p>This <strong>content</strong> is written by
    <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
    You can edit this content and see the changes in the editor.
    </p>
    <p>Do you have any questions? Feel free to ask in the <a href="https://github.com/Bishwas-py/tipex"
    target="_blank" rel="noopener noreferrer">Github repository</a>.</p>
    `;

</script>

<svelte:head>
    <title>Tipex Editor | Friend Of Svelte</title>
</svelte:head>

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
        Install the package from <a href="https://www.npmjs.com/package/@friendofsvelte/tipex"
                                     target="_blank" rel="noopener noreferrer">NPM</a>.
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

    <h2 class="mt-4">About Friend Of Svelte</h2>
    <div class="flex flex-col md:flex-row gap-2 md:gap-3 mb-2">
        <img src="https://avatars.githubusercontent.com/u/143795012?s=200&v=4" alt="Friend Of Svelte Logo"
             class="w-12 h-12 rounded"/>
        <div class="flex flex-col justify-center">
            <p>
                <a href="https://github.com/friendofsvelte" target="_blank" rel="noopener noreferrer">Friend Of
                    Svelte</a> is a
                community driven project to help Svelte developers to find and develop awesome Svelte resources.
            </p>
        </div>
    </div>

    <p>
        If you like this project, you can be one of the friend by contributing to the project. Memberships are open
        for great people like you!
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
        @apply overflow-x-auto;
    }

    code {
        @apply bg-neutral-100 dark:bg-neutral-800;
        @apply text-neutral-700 dark:text-neutral-200;
        @apply px-1;
    }
</style>