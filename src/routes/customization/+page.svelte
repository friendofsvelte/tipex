<script>
    import {xml, typescript} from "svelte-highlight/languages";
    import {Highlight, HighlightSvelte} from "svelte-highlight";
    import advanceCodes from "$item/codes/advanceCodes";
    import codes from "$item/codes";
</script>

<svelte:head>
    <title>Tipex Editor | Customization</title>
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
    <iconify-icon icon="fa6-solid:house" class="text-sm"/>
    Back to Home
</a>
<h2 class="mt-8">In-built Utility Buttons</h2>

<p>
    The in-built utility buttons consist of <code>Copy</code> and <code>Link</code> buttons.
</p>

<div class="flex flex-col justify-center">
    <img src="https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8"
         alt="Svelte Text Editor: Tipex Editor with custom utility buttons"
         class="w-full rounded-xl mt-2 shadow-xl"/>

    <p class="text-center text-sm text-neutral-600 dark:text-neutral-300">
        Location of utility buttons in Text Editor
    </p>
</div>
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
<p>
    Or, you can use <code>{'<svelte:fragment'}</code> to append your buttons. Make sure that <code>slot="utilities"</code>
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

<h2 class="mt-8">Advanced Customization</h2>

<p>
    As we have said, a software having customization is a software having soul. Tipex editor is highly customizable.
    You can customize the editor to your heart's content.
</p>

<div class="flex flex-col justify-center">
    <img src="https://github.com/Bishwas-py/tipexed-editor/assets/42182303/b406527a-aaca-4a09-9e4f-09504ab95d73"
         alt="Svelte Text Editor: Advanced Customization of Tipex Editor"
         class="w-full rounded-xl mt-2 shadow-xl"/>

    <p class="text-center text-sm text-neutral-600 dark:text-neutral-300">
        Advanced Customization of Tipex Editor
    </p>
</div>

<h3 class="mt-8">Customize the controls</h3>

<p>
    You can customize the controls of the editor by passing a <code>controls</code> prop to the editor.
</p>

<HighlightSvelte code={advanceCodes.customizeControl}/>

