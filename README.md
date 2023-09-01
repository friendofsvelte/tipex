Tipex is a goto rich text editor for Svelte, engined by Tiptap and Prosemirror. It gives you the power to create rich
text editor without worrying about the underlying technology, styling and other stuffs.

Installation
------------

Install the package from npm.

```shell
npm install @friendofsvelte/tipex
```

Usage
-----

Import the component and use it in your component.

```javascript
<script>
import Tipex from "@friendofsvelte/tipex";
import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/Tipex.css";

let htmlContent = `
<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by
<a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
</p>`;
</script>

<Tipex htmlContent="{htmlContent}"
       style="margin-top: 1rem; margin-bottom: 0rem;"
       class="h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full"/>

```

![image](https://github.com/friendofsvelte/tipex/assets/42182303/6cc598f8-9cc2-46f9-92e6-39df24653aa5)

> The import for`@friendofsvelte/tipex/styles/ProseMirror.css`is used to style content written in the editor. You can
> use your own style or use the default one.

Props
-----

Tipex component accepts following props.

| Prop        | Type    | Default | Description                                     |
|-------------|---------|---------|-------------------------------------------------|
| htmlContent | string  | ''      | HTML content to be rendered in the editor.      |
| style       | string  | ''      | Style to be applied to the editor.              |
| class       | string  | ''      | Class to be applied to the editor.              |
| placeholder | string  | ''      | Placeholder to be shown in the editor.          |
| focusOnEdit | boolean | true    | Focus on the editor when it is clicked to edit. |

Accessing Editor Instance
-------------------------

You can access the editor instance via:

```javascript
import {tipexEditor} from '@friendofsvelte/tipex';
```

The editor instance is stored in a store. You can use it to access the editor instance from anywhere in your app.
