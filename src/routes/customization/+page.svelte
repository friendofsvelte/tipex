<script>
    import {typescript} from "svelte-highlight/languages";
    import {Highlight, HighlightSvelte} from "svelte-highlight";
    import advanceCodes from "$item/codes/advanceCodes";
    import codes from "$item/codes";
    import SlotPropsTable from "$item/SlotPropsTable.svelte";
</script>

<svelte:head>
    <title>Customization | Tipex Editor</title>
    <meta name="description"
          content="Customize Tipex Editor, a highly customizable text editor for Svelte and SvelteKit.">
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
    <iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
    Back to Home
</a>

<h1 class="mt-8">Customization</h1>
<p>
    As we have said, a software having customization is a software having soul. Tipex editor is highly customizable.
    You can customize the editor to your heart's content.
</p>

<h2 class="mt-8" id="in-built-utility-buttons">In-built Utility Buttons</h2>

<p>
    The in-built utility buttons consist of <code>Copy</code> and <code>Link</code> buttons.
</p>

<figure class="image-tab">
    <img src="https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8"
         alt="Svelte Text Editor: Tipex Editor with custom utility buttons"
         class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-700"/>

    <figcaption>
        Location of utility buttons in Text Editor
    </figcaption>
</figure>
<h3 class="mt-8">Insert a set of buttons</h3>
<p>
    Here's a basic example of how you can insert in-built utility buttons.
</p>
<Highlight language={typescript} code={codes.insertUtils}/>

<h3 class="mt-8">Append custom buttons between</h3>
<p>
    To append new buttons you can use the <code>Utility.svelte</code> component, it has a <code>slot</code> for you
    to insert your buttons.
</p>
<Highlight language={typescript} code={codes.appendUtils}/>

<SlotPropsTable/>

<h3 id="new_custom_controls" class="mt-8">Using new custom controls</h3>
<p>
    You can override the default controls with your own custom controls. Here's an example of how you can do it.
</p>
<Highlight language={typescript} code={codes.overrideControl}/>

<p>
    Or, you can use <code>{'<svelte:fragment'}</code> to append your buttons. Make sure that
    <code>slot="controlComponent"</code>
    is provided.
</p>

<h2 class="mt-8">Image Upload</h2>
<p>
    Tipex editor supports image upload. You can upload images by dragging and dropping them in the editor, or
    by copy pasting them from your clipboard, which is the most common way to upload images.
</p>

<h3 class="mt-4 mb-1">Custom Image Upload Tab</h3>
<p>
    You can use utility customization for this. Apply the upper mentioned method to append your custom button.
</p>

<h2 class="mt-8" id="advanced-customization">Advanced Customization</h2>

<p>
    Tipex, being a highly customizable editor, allows you to customize the editor to your heart's content and
    make it look like your own. Here's some ways you can customize the editor.
</p>

<figure class="image-tab">
    <img src="https://github.com/friendofsvelte/tipex/assets/42182303/9aa4814f-b360-473f-85af-ba147d7e6a56"
         alt="Svelte Text Editor: Advanced Customization of Tipex Editor"
         class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-800"/>

    <figcaption>
        Advanced Customization of Tipex Editor, <a href="https://github.com/Bishwas-py/tipexed-editor" target="_blank">Source
        Code</a>
    </figcaption>
</figure>

<h2 class="mt-8">Customize the controls</h2>

<p>
    You can customize the controls of the editor by passing a <code>controlComponent</code> slot.
</p>

<HighlightSvelte code={advanceCodes.addHeadFootComponent}/>

<p class="mt-7">
    You can also add a header and footer with using a slot.
</p>

<h2 class="mt-8">Tweaking extensions</h2>

<p>
    Tipex provides an <code>defaultExtensions</code> object which contains all the extensions that are used in the
    editor. You can tweak the extensions, or add new extensions to the editor by passing a <code>extensions</code>
    prop to the editor.
</p>

<HighlightSvelte code={advanceCodes.tweakingExtensions}/>