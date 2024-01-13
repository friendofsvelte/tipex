export const insertUtils = `import {Utility} from "@friendofsvelte/tipex";
<Tipex htmlContent={htmlContent}>
    <Utility slot="utilities"/>
</Tipex>`;

export const appendUtils = `<Tipex htmlContent={htmlContent}>
    <div aria-label="Custom utility button" slot="utilities">...</div>
</Tipex>`;

export const overrideControl = `<Tipex htmlContent={htmlContent}>
    <div aria-label="New Custom Control" slot="controlComponent">...</div>
</Tipex>`;

export const install = `npm install "@friendofsvelte/tipex";`
export const usage = `<script lang="ts">
    import {Tipex} from "@friendofsvelte/tipex";
    export let htmlContent = \`<p>The initial html content.</p>\`;
</script>

<Tipex {htmlContent}
    displayDefaultControls
    floatingMenu
    style="margin-top: 1rem; margin-bottom: 0;" 
    className="h-[70vh] border border-neutral-200"/>`;

export let htmlContent = `
<p>This <strong>content</strong> is written by <a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/">Bishwas</a> in 2023. You can edit this content and see the changes in the editor.</p><p>Do you have any questions? Feel free to ask in the <a target="_blank" rel="noopener noreferrer" href="https://github.com/friendofsvelte/tipex">Github repository</a>.</p><p>Try writing some code, list, or blockquote, and see how it looks in the editor.</p>
<hr/>
<p>I hope you enjoyed it 😊</p>
`;

export let styling = `import "@friendofsvelte/tipex/styles/Tipex.css";
import "@friendofsvelte/tipex/styles/ProseMirror.css";
import "@friendofsvelte/tipex/styles/Controls.css";
import "@friendofsvelte/tipex/styles/EditLink.css";
import "@friendofsvelte/tipex/styles/CodeBlock.css";`


export let access = `import {tipexEditor} from '@friendofsvelte/tipex';`

const codes = {
    insertUtils,
    install,
    usage,
    appendUtils,
    overrideControl,
    htmlContent,
    access,
    styling
}
export default codes;