<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { Transaction } from '@tiptap/pm/state';

	export interface TipexEditor {
		editor: InstanceType<typeof Editor> | null;
	}

	export type HasEditorSnippet = Snippet<[TipexEditor]>;

	export interface TipexProps {
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
		headComponent?: HasEditorSnippet;
		controlComponent?: HasEditorSnippet;
		utilities?: HasEditorSnippet;
		footComponent?: HasEditorSnippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import { defaultExtensions } from './default.js';
	import 'iconify-icon';
	import { onMount, setContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import DefaultControls from '$lib/tipex/DefaultControls.svelte';
	import type { Extensions } from '@tiptap/core';
	import { prepareDefaultFloatingMenu } from '$lib/tipex/prepare.js';
	import LinkFloatingMenu from '$lib/tipex/link/LinkFloatingMenu.svelte';
	import Utility from '$lib/tipex/Utility.svelte';

	let {
		extensions = $bindable(defaultExtensions),
		tipex = $bindable({
			editor: null,
			isLoading: false
		}),
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

	setContext('tipex', tipex);
	onMount(async () => {
		const onFocusChange = () => {
			isEditorFocused = !!(editorsParentRef && editorsParentRef.contains(document.activeElement));
		};
		onFocusChange();
		document.addEventListener('focusin', onFocusChange);
		document.addEventListener('focusout', onFocusChange);
	});

	let floatingMenuRef: HTMLDivElement | undefined = $state();
	let tipexEditorRef: HTMLDivElement | undefined = $state();
	let editorsParentRef: HTMLDivElement | undefined = $state();

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
</script>

{#if floatingMenu}
	<LinkFloatingMenu bind:floatingMenuRef />
{/if}

<div class="tipex-editor {className}"
		 bind:this={editorsParentRef}
		 {style}
		 class:isEditorFocused
		 class:focusOnEdit>
	<div class="tipex-editor-wrap">
		{@render headComponent?.(tipex)}
		<div class="tipex-editor-section" bind:this={tipexEditorRef}></div>
		{#if controlComponent}
			{@render controlComponent?.(tipex)}
		{:else if displayDefaultControls}
			<DefaultControls>
				{#if utilities}
					<div class="tipex-utilities">
						{@render utilities?.(tipex)}
					</div>
				{:else}
					<div class="tipex-utilities">
						<Utility />
					</div>
				{/if}
			</DefaultControls>
		{/if}
		{@render footComponent?.(tipex)}
	</div>
</div>

