<script lang="ts">
    import Tipex from "$lib/tipex/Tipex.svelte";
    import '$lib/tipex/styles/Controls.css';
    import '$lib/tipex/styles/EditLink.css';
    import '$lib/tipex/styles/ProseMirror.css';
    import "$lib/tipex/styles/Tipex.css";
    import "$lib/tipex/styles/CodeBlock.css";

    import UseTipex from "$item/codes/UseTipex.svelte";
    import InstallTipex from "$item/codes/InstallTipex.svelte";
    import PropsTable from "$item/PropsTable.svelte";
    import AccessEditor from "$item/codes/AccessEditor.svelte";
    import Utility from "$lib/tipex/Utility.svelte";
    import {utilityButtonsComponent} from "$lib/tipex/editorStore";
    import InsertUtilities from "$item/codes/utility-buttons/InsertUtilities.svelte";
    import AppendUtilities from "$item/codes/utility-buttons/AppendUtilities.svelte";
    import {beforeUpdate} from "svelte";

    beforeUpdate(()=>{
        if ($utilityButtonsComponent) {
            new Utility({
                target: $utilityButtonsComponent,
                props: {
                }
            })
        }
    })

    let htmlContent = `
    <p>This <strong>content</strong> is written by
    <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
    You can edit this content and see the changes in the editor.
    </p>
    <p>Do you have any questions? Feel free to ask in the <a href="https://github.com/friendofsvelte/tipex"
    target="_blank" rel="noopener noreferrer">Github repository</a>.</p>
    `;

</script>

<svelte:head>
    <title>Tipex Editor | Friend Of Svelte</title>
</svelte:head>

<div class="max-w-3xl w-full">
    <div class="head-section">
        <h1>Tipex Editor</h1>
        <div class="icon-link-section">
            <a href="https://www.npmjs.com/package/@friendofsvelte/tipex"
               target="_blank" rel="noopener noreferrer">
                <iconify-icon icon="logos:npm-icon"></iconify-icon>
            </a>
            <a href="https://github.com/friendofsvelte/tipex"
               target="_blank" rel="noopener noreferrer">
                <iconify-icon icon="fa6-brands:github"
                              class="text-gray-700 dark:text-gray-200"></iconify-icon>
            </a>
        </div>

    </div>
    <p>
        Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
        frameworks <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev/">Tiptap</a> and
        <a target="_blank" rel="noopener noreferrer" href="https://prosemirror.net/">Prosemirror</a>. It
        empowers developers to effortlessly craft rich text editors, liberating
        them from the intricacies of underlying technologies, style management, and related complexities.
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

    <h2 class="mt-8">Custom Utility Buttons</h2>
    <p>
        Utility buttons consist of <code>Copy</code>, <code>Link</code> and <code>Save</code> buttons.
        You can either append new buttons between them, or insert a whole new set of <code>utility buttons</code>.
    </p>

    <div class="flex flex-col justify-center">
        <img src="https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8"
             alt="Svelte Text Editor: Tipex Editor with custom utility buttons"
             class="w-full rounded-xl mt-2 shadow-xl"/>

        <p class="text-center text-sm text-neutral-600 dark:text-neutral-300 mt-2">
            Location of utility buttons in Text Editor
        </p>
    </div>
    <h3 class="mt-8">Insert a set of buttons</h3>
    <InsertUtilities/>

    <h3 class="mt-8">Append new buttons between</h3>
    <p>
        To append new buttons you can use the <code>Utility.svelte</code> component, it has a <code>slot</code> for you
        to insert your buttons.
    </p>
    <AppendUtilities/>

    <h2 class="mt-8">Image Upload</h2>
    <p>
        Tipex editor supports image upload. You can upload images by dragging and dropping them in the editor, or
        by copy pasting them from your clipboard, which is the most common way to upload images.
    </p>

    <h3 class="mt-4 mb-1">Custom Image Upload Tab</h3>
    <p>
        You can add a custom tab to the image upload dialog by using the <code>utilityButtonsComponent</code> store.
        The store accepts a component that will be rendered in the image upload dialog.
    </p>
    <p>
        If required do not forget to use <code>tipexEditor</code> store to access the editor instance.
    </p>

    <h2 class="mt-4">About Friend Of Svelte</h2>
    <div class="flex flex-col md:flex-row gap-2 md:gap-3 mb-2 mt-2">
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

    .head-section {
        @apply flex flex-wrap flex-row gap-2 md:gap-3 mb-2 mt-2;
        @apply -ml-1 border-b border-neutral-200 dark:border-neutral-700;
        @apply pb-2;
    }

    .icon-link-section {
        @apply flex flex-row gap-2 md:gap-3 mb-2 mt-2;
        @apply ml-auto;
    }

    .icon-link-section a {
        @apply flex items-center justify-center;
        @apply w-8 h-8 rounded-full;
        @apply bg-neutral-100 dark:bg-neutral-800;
    }

    h1 {
        @apply mb-3 text-3xl font-bold;
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

    h3 {
        @apply text-xl font-bold;
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