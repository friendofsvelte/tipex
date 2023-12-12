Tipex stands as an advanced rich text editor tailored for Svelte, meticulously engineered with the robust
frameworks [Tiptap](https://tiptap.dev/) and [Prosemirror](https://prosemirror.net/). It empowers developers to
effortlessly craft rich text editors, liberating them from the intricacies of underlying technologies, style management,
and related complexities.

Installation
------------

Install the package from [NPM](https://www.npmjs.com/package/@friendofsvelte/tipex).

```
npm install "@friendofsvelte/tipex";
```

Usage
-----

Import the component and use it in your component.

```
<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    export let htmlContent = `<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.</p>`;
</script>

<Tipex htmlContent={htmlContent}
    style="margin-top: 1rem; margin-bottom: 0;"
    className="h- [70vh] border border-neutral-200"/>
```

Styling
-------

Tipex comes with a default style. You can use it by importing the following CSS file inside the`script`tag.

```
import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/CodeBlock.css";
```

Styling
-------

Tipex comes with a default style. You can use it by importing the following CSS file inside the`script`tag.

```
import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/CodeBlock.css";
```

> The import for`@friendofsvelte/tipex/styles/ProseMirror.css`is used to style content written in the editor. You can
> use your own style or use the default one. Or, remove any CSS you don't wanna use.

Props
-----

Tipex component accepts following props.

| Prop           | Type          | Default         | Description                                                    |
|----------------|---------------|-----------------|----------------------------------------------------------------|
| htmlContent    | string        | ''              | HTML content to be rendered in the editor.                     |
| style          | string        | ''              | Style to be applied to the editor.                             |
| className      | string        | ''              | Class to be applied to the editor.                             |
| focusOnEdit    | boolean       | true            | Focus on the editor when it is clicked to edit.                |
| controlElement | ComponentType | DefaultControls | If provided, gets rendered as a control element in the editor. |
| headComponent  | ComponentType | null            | If provided, gets rendered as a head element in the editor.    |
| footComponent  | ComponentType | null            | If provided, gets rendered as a foot element in the editor.    |

> Note:The`headComponent`and`footComponent`props are components that are rendered inside the editor. These three
> components are prioritized while rendering compared to their`slot`
> equivalent.  [[Advanced Customization](https://tipex.pages.dev/customization#advanced-customization)]

For`controlElement`, it renders`DefaultControls.svelte`by default, where you can pass`utilities`named slot to render
your own extra controls. If you want to render your own set of controls, you can pass your own component to
the`controlElement`prop.

Accessing Editor Instance
-------------------------

You can access the editor instance via:

```
import {tipexEditor} from '@friendofsvelte/tipex';
```

The editor instance is stored in a store. You can use it to access the editor instance from anywhere in your app.

Customizing Editor
------------------

Tipex is built taking into consideration the need for customization. We believe that a software lacking customization is
a software lacking soul. Tipex provides an extensive set of options to customize the editor to your heart's content.
From functionality, style, to key bindings, you can customize almost everything. Visit
the [customization page](https://tipex.pages.dev/customization) to learn more.

About Friend Of Svelte
----------------------

! [Friend Of Svelte Logo](https://avatars.githubusercontent.com/u/143795012?s=200&v=4)

[Friend Of Svelte](https://github.com/friendofsvelte) is a community driven project to help Svelte developers to find
and
develop awesome Svelte resources.

If you like this project, you can be one of the friend by contributing to the project. Memberships are open for
everyone.