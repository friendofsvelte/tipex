export const insertUtils = `import {utilityButtonsComponent, Utility} from "@friendofsvelte/tipex";
// Insert this to utilityButtonsComponent using:
<Tipex htmlContent={htmlContent}>
    <svelte:fragment slot="utilities">
        <Utility/>
    </svelte:fragment>
</Tipex>`;

export const appendUtils = `import CustomUtilityButtons from "path-to/UtilityButtons.svelte";
// Insert this to utilityButtonsComponent using: 
<Tipex htmlContent={htmlContent}>
    <svelte:fragment slot="utilities">
        <CustomUtilityButtons/>
    </svelte:fragment>
</Tipex>`;

export const install = `npm install "@friendofsvelte/tipex";`
export const usage = `<script>
import {Tipex} from "@friendofsvelte/tipex";
import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/CodeBlock.css"; // for code block syntax highlighting
import "@friendofsvelte/tipex/styles/app.css"; // if you don't have tailwindcss in your project, you should import this file

export let htmlContent = \`
<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by
<a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
</p>\`;
</script>

<Tipex htmlContent="{htmlContent}"
       style="margin-top: 1rem; margin-bottom: 0rem;"
       class="h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full"/>`;

export let htmlContent = `
    <p>This <strong>content</strong> is written by
    <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023.
    You can edit this content and see the changes in the editor.
    </p>
    <p>Do you have any questions? Feel free to ask in the <a href="https://github.com/friendofsvelte/tipex"
    target="_blank" rel="noopener noreferrer">Github repository</a>.</p>
`;


export let access = `import {tipexEditor} from '@friendofsvelte/tipex';`

const codes = {
    insertUtils,
    install,
    usage,
    appendUtils,
    htmlContent,
    access
}
export default codes;