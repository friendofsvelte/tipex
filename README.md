Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to
effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management,
and related complexities.

> Svelte5 and runes mode activated! ✨🔮

Installation
------------

Install the package from [NPM](https://www.npmjs.com/package/@friendofsvelte/tipex).

```
npm install "@friendofsvelte/tipex";
```

Usage
-----

Import the component and use it in your component.

```sveltehtml
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    export let htmlContent = `<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.</p>`;
</script>

<Tipex {htmlContent}
    displayDefaultControls
    floatingMenu
    style="margin-top: 1rem; margin-bottom: 0;" 
    className="h-[70vh] border border-neutral-200"/>
```

Documentation
-------------

The documentation is available at [tipex.pages.dev](https://tipex.pages.dev/).

About Friend Of Svelte
----------------------

![Friend Of Svelte Logo](https://avatars.githubusercontent.com/u/143795012?s=200&v=4)

[Friend Of Svelte](https://github.com/friendofsvelte) is a community driven project to help Svelte developers to find
and
develop awesome Svelte resources.

If you like this project, you can be one of the friend by contributing to the project. Memberships are open for
everyone.