Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management, and related complexities.

Installation
------------

Install the package from [NPM](https://www.npmjs.com/package/@friendofsvelte/tipex).

```shell
npm install "@friendofsvelte/tipex";
```

Usage
-----

Import the component and use it in your component.

```sveltehtml
<script>
import {Tipex} from "@friendofsvelte/tipex";
import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/CodeBlock.css"; // for code block syntax highlighting
import "@friendofsvelte/tipex/styles/app.css"; // if you don't have tailwindcss in your project, you should import this file

let htmlContent = `
<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by
<a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
</p>`;
</script>

<Tipex htmlContent="{htmlContent}"
       style="margin-top: 1rem; margin-bottom: 0rem;"
       class="h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full"/>

```

> The import for `@friendofsvelte/tipex/styles/ProseMirror.css` is used to style content written in the editor. You can use your own style or use the default one.

Props
-----

Tipex component accepts following props.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| htmlContent | string | '' | HTML content to be rendered in the editor. |
| style | string | '' | Style to be applied to the editor. |
| class | string | '' | Class to be applied to the editor. |
| placeholder | string | '' | Placeholder to be shown in the editor. |
| focusOnEdit | boolean | true | Focus on the editor when it is clicked to edit. |

Accessing Editor Instance
-------------------------

You can access the editor instance via:

```
import {tipexEditor} from '@friendofsvelte/tipex';
```

The editor instance is stored in a store. You can use it to access the editor instance from anywhere in your app.

Custom Utility Buttons
----------------------

Utility buttons consist of `Copy`, `Link` and `Save` buttons. You can either append new buttons between them, or insert a whole new set of `utility buttons`.

![Svelte Text Editor: Tipex Editor with custom utility buttons](https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8)

### Insert a set of buttons

```javascript
import UtilityButtons from "path-to/UtilityButtons.svelte";
import {utilityButtonsComponent} from "@friendofsvelte/tipex";

<Tipex htmlContent={htmlContent}
       style="margin-top: 1rem; margin-bottom: 0rem;"
       class="h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full shadow-xl">
    <svelte:fragment slot="utilities">
        <Utility/>
    </svelte:fragment>
</Tipex>
```

Image Upload
------------

Tipex editor supports image upload. You can upload images by dragging and dropping them in the editor, or by copy pasting them from your clipboard, which is the most common way to upload images.

### Custom Image Upload Tab

You can add a custom tab to the image upload dialog by using the `utilityButtonsComponent` store. The store accepts a component that will be rendered in the image upload dialog.

> If required do not forget to use `tipexEditor` store to access the editor instance.

About Friend Of Svelte
----------------------

![Friend Of Svelte Logo](https://avatars.githubusercontent.com/u/143795012?s=200&v=4)

[Friend Of Svelte](https://github.com/friendofsvelte) is a community driven project to help Svelte developers to find and develop awesome Svelte resources.

If you like this project, you can be one of the friend by contributing to the project. Memberships are open for great people like you!
