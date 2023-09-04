<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import "iconify-icon";
    import {type AnyExtension, Editor} from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import {FloatingMenu} from "@tiptap/extension-floating-menu";
    import {Image} from "@tiptap/extension-image";
    import {Link} from "@tiptap/extension-link";
    import {tipexEditor} from "$lib/tipex/editorStore";
    import Controls from "$lib/tipex/Controls.svelte";
    import AcceptLink from "$lib/tipex/link/AcceptLink.svelte";
    import {Placeholder} from "@tiptap/extension-placeholder";
    import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
    import {lowlight} from "lowlight";

    let tipexEditorElement: HTMLDivElement;
    let appendExtension: Array<AnyExtension> = [];

    onMount(() => {
        $tipexEditor = new Editor({
            element: tipexEditorElement,
            extensions: [
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    },
                }),
                Image.configure({
                    allowBase64: true,
                }),
                Placeholder.configure({
                    showOnlyWhenEditable: false,
                }),
                StarterKit.configure(),
                CodeBlockLowlight.configure({
                    lowlight,
                    languageClassPrefix: 'language-',
                    defaultLanguage: 'plaintext'
                }),
                FloatingMenu.configure({
                    pluginKey: 'floatingMenuLinkEdit',
                    element: editLinkElement,
                    shouldShow: ({editor}) => {
                        return editor.isActive('link')
                    },
                    tippyOptions: {
                        placement: 'top-start',
                        zIndex: 0,
                        popperOptions: {
                            placement: 'top-start',
                            strategy: 'fixed',
                        }
                    },
                }),
                ...appendExtension
            ],
            content: htmlContent as string,
            onTransaction() {
                // force re-render so `editor.isActive` works as expected
                $tipexEditor = $tipexEditor;
            },
            autofocus: true
        });
    });

    onDestroy(() => {
        if ($tipexEditor) {
            $tipexEditor.destroy();
        }
    });
    let editLinkElement: HTMLDivElement;

    $: isEditorFocused = !!($tipexEditor && 'focused' in $tipexEditor.view && $tipexEditor.view['focused']);

    export let htmlContent = '';
    let className = '';
    export { className as class }; // alias
    export let style = '';
    export let focusOnEdit = true;
</script>

<AcceptLink bind:editLinkElement/>

<div class="tipex-editor {className}" class:isEditorFocused {style} class:focusOnEdit>
    <div class="tipex-content-section" bind:this={tipexEditorElement}></div>
    <Controls/>
</div>

<input type="hidden" name="htmlContent" value={$tipexEditor?.getHTML()}/>
