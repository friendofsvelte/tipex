<script lang="ts">
	import { onMount } from 'svelte';
	import 'iconify-icon';
	import { Editor } from '@tiptap/core';
	import type { Transaction } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import DefaultControls from '$lib/tipex/DefaultControls.svelte';
	import { tipex } from '$lib';
	import { defaultExtensions } from '$lib';
	import type { Extensions } from '@tiptap/core/src/types.js';
	import { prepareDefaultFloatingMenu } from '$lib/tipex/prepare.js';
	import LinkFloatingMenu from '$lib/tipex/link/LinkFloatingMenu.svelte';
	import Utility from '$lib/tipex/Utility.svelte';

	let floatingMenuRef: HTMLDivElement = $state();
	let tipexEditorRef: HTMLDivElement = $state();


	onMount(() => {
		if (floatingMenu) {
			extensions['floatingMenu'] = prepareDefaultFloatingMenu(floatingMenuRef);
		}
		tipex.editor = new Editor({
			element: tipexEditorRef,
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				...Object.values(extensions) as Extensions
			],
			content: htmlContent as string,
			onTransaction() {
				// force re-render so `editor.isActive` works as expected
				tipex.editor = tipex.editor;
			},
			autofocus: true,
			onCreate: ({ editor }) => {
				onEditorCreate(editor);
			},
			onDestroy: onEditorDestroy,
			onUpdate: onEditorUpdate
		});
	});


	let editorsParent: HTMLDivElement = $state();

	interface TipexProps {
		extensions?: any;
		floatingMenu?: boolean;
		displayDefaultControls?: boolean;
		onEditorCreate?: (editor: Editor) => void;
		onEditorDestroy?: () => void;
		onEditorUpdate?: (event: { editor: Editor, transaction: Transaction }) => void;
		htmlContent?: string;
		className?: string;
		style?: string;
		focusOnEdit?: boolean;
		isEditorFocused?: boolean;
		headComponent?: import('svelte').Snippet;
		controlComponent?: import('svelte').Snippet;
		utilities?: import('svelte').Snippet;
		footComponent?: import('svelte').Snippet;
	}

	let {
		extensions = $bindable(defaultExtensions),
		floatingMenu = false,
		displayDefaultControls = false,
		onEditorCreate = () => {
		},
		onEditorDestroy = () => {
		},
		onEditorUpdate = () => {
		},
		htmlContent = '',
		className = '',
		style = '',
		focusOnEdit = true,
		isEditorFocused = $bindable(false),
		headComponent,
		controlComponent,
		utilities,
		footComponent
	}: TipexProps = $props();

	onMount(async () => {
		const onFocusChange = () => {
			isEditorFocused = editorsParent && editorsParent.contains(document.activeElement);
		};
		onFocusChange();
		document.addEventListener('focusin', onFocusChange);
		document.addEventListener('focusout', onFocusChange);
	});
</script>

{#if floatingMenu}
	<LinkFloatingMenu bind:floatingMenuRef />
{/if}

<div class="tipex-editor {className}"
		 bind:this={editorsParent}
		 {style}
		 class:isEditorFocused
		 class:focusOnEdit>
	<div class="tipex-editor-wrap">
		{@render headComponent?.()}
		<div class="tipex-editor-section" bind:this={tipexEditorRef}></div>
		{#if controlComponent}
			{@render controlComponent?.()}
		{:else if displayDefaultControls}
			<DefaultControls>
				{#if utilities}
					<div class="tipex-utilities">
						{@render utilities?.()}
					</div>
				{:else}
					<div class="tipex-utilities">
						<Utility />
					</div>
				{/if}
			</DefaultControls>
		{/if}
		{@render footComponent?.()}
	</div>
</div>

