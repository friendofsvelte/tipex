<script lang="ts">
    import Tipex from "$lib/tipex/Tipex.svelte";
    import '$lib/tipex/styles/Controls.css';
    import '$lib/tipex/styles/EditLink.css';
    import '$lib/tipex/styles/ProseMirror.css';
    import "$lib/tipex/styles/Tipex.css";

    import PropsTable from "$item/PropsTable.svelte";
    import Utility from "$lib/tipex/Utility.svelte";
    import {Highlight, HighlightSvelte} from "svelte-highlight";
    import {shell, typescript} from "svelte-highlight/languages";
    import codes from "$item/codes";
    import ThemeToggle from "$item/ThemeToggle.svelte";
</script>

<svelte:head>
    <title>Tipex Editor - Svelte Text Editor | Friend Of Svelte</title>
    <meta name="description"
          content="Tipex editor, a rich text editor for Svelte, a beautiful and extremely customizable editor for Svelte.">
</svelte:head>


<div class="head-section">
    <h1>Tipex Editor
        <span class="text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                {__VERSION__}
            </span>
    </h1>
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
        <ThemeToggle/>
    </div>
</div>

<p>
    Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
    frameworks <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev/">Tiptap</a> and
    <a target="_blank" rel="noopener noreferrer" href="https://prosemirror.net/">Prosemirror</a>. It
    empowers developers to effortlessly craft rich text editors, liberating
    them from the intricacies of underlying technologies, style management, and related complexities.
</p>


<Tipex htmlContent={codes.htmlContent}
       floatingMenu
       className="h-[70vh] border border-neutral-200 dark:border-neutral-700 shadow-xl mt-3">
    <svelte:fragment slot="utilities">
        <Utility/>
    </svelte:fragment>
</Tipex>

<h2 class="mt-8">Installation</h2>
<p>
    Install the package from <a href="https://www.npmjs.com/package/@friendofsvelte/tipex"
                                target="_blank" rel="noopener noreferrer">NPM</a>.
</p>
<Highlight language={shell} code={codes.install}/>

<h2 class="mt-8">Usage</h2>
<p>
    Import the component and use it in your component.
</p>
<HighlightSvelte code={codes.usage}/>

<h2 class="mt-8">Styling</h2>
<p>
    Tipex comes with a default style. You can use it by importing the following CSS file inside the
    <code>{'script'}</code> tag.
</p>
<Highlight language={typescript} code={codes.styling}/>


<blockquote class="mt-2">
    <p>
        The import for <code>@friendofsvelte/tipex/styles/ProseMirror.css</code> is used to
        style content written in the editor. You can use your own style or use the default one.
        Or, remove any CSS you don't wanna use.
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
<HighlightSvelte code={codes.access}/>
<p>
    The editor instance is stored in a store. You can use it to access the editor instance
    from anywhere in your app.
</p>

<h2 class="mt-8">Customizing Editor</h2>
<p>
    Tipex is built taking into consideration the need for customization. We believe that
    a software lacking customization is a software lacking soul. Tipex provides an extensive
    set of options to customize the editor to your heart's content. From functionality, style,
    to key bindings, you can customize almost everything. Visit the
    <a href="/customization"> customization page</a> to learn more.
</p>

<h2 class="mt-4">About Friend Of Svelte</h2>
<div class="flex flex-col md:flex-row gap-2 md:gap-3 mb-2 mt-2">
    <img src="https://avatars.githubusercontent.com/u/143795012?s=200&v=4" alt="Friend Of Svelte Logo"
         class="w-12 h-12 rounded"/>
    <p>
        <a href="https://github.com/friendofsvelte" target="_blank" rel="noopener noreferrer">Friend Of
            Svelte</a> is a
        community driven project to help Svelte developers to find and develop awesome Svelte resources.
    </p>
</div>

<p>
    If you like this project, you can be one of the friend by contributing to the project. Memberships are open
    for everyone.
</p>

<style lang="postcss">
</style>