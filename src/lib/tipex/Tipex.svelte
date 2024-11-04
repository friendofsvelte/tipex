<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { Transaction } from '@tiptap/pm/state';

	export type TipexEditor = InstanceType<typeof Editor> | undefined;

	export type HasEditorSnippet = Snippet<[TipexEditor]>;

	export interface TipexProps {
		tipex?: TipexEditor;
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
	import { getDefaultFloatingMenu } from '$lib/tipex/prepare.js';
	import LinkFloatingMenu from '$lib/tipex/link/LinkFloatingMenu.svelte';
	import Utility from '$lib/tipex/Utility.svelte';

	let {
		extensions = $bindable(defaultExtensions),
		tipex = $bindable(),
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

	function onFocusChange() {
		isEditorFocused = !!(editorsParentRef && editorsParentRef.contains(document.activeElement));
	}

	let floatingMenuRef: HTMLDivElement | undefined = $state();
	let tipexEditorRef: HTMLDivElement | undefined = $state();
	let editorsParentRef: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (floatingMenu) {
			extensions['floatingMenu'] = getDefaultFloatingMenu(floatingMenuRef);
		}
		tipex = new Editor({
			element: tipexEditorRef,
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				...Object.values(extensions) as Extensions
			],
			content: htmlContent as string,
			onTransaction({ editor }) {
				// force re-render so `tipex.isActive` works as expected
				tipex = undefined;
				tipex = editor;
			},
			autofocus: true,
			onCreate: ({ editor }) => {
				onEditorCreate(editor);
			},
			onDestroy: onEditorDestroy,
			onUpdate: onEditorUpdate
		});
		setContext('tipex', tipex);
	});

</script>

<svelte:document onfocusin={onFocusChange} onfocusout={onFocusChange} />
{#if floatingMenu}
	<LinkFloatingMenu bind:floatingMenuRef {tipex} />
{/if}

<div class="tipex-editor {className}" {style}
		 bind:this={editorsParentRef}
		 class:isEditorFocused
		 class:focusOnEdit>
	<div class="tipex-editor-wrap">
		{@render headComponent?.(tipex)}
		<div class="tipex-editor-section" bind:this={tipexEditorRef}></div>
		{#if controlComponent}
			{@render controlComponent?.(tipex)}
		{:else if displayDefaultControls}
			<DefaultControls {tipex}>
				{#if utilities}
					<div class="tipex-utilities">
						{@render utilities?.(tipex)}
					</div>
				{:else}
					<div class="tipex-utilities">
						<Utility {tipex} />
					</div>
				{/if}
			</DefaultControls>
		{/if}
		{@render footComponent?.(tipex)}
	</div>
</div>

