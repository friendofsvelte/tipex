<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { AnyExtension, EditorEvents } from '@tiptap/core';

	export type TipexEditor = InstanceType<typeof Editor> | undefined;

	export type HasEditorSnippet = Snippet<[TipexEditor]>;

	export interface TipexProps {
		class?: string;
		controlComponent?: HasEditorSnippet;
		controls?: boolean;
		/**
		 * Context ID to be used for the editor.
		 */
		ctxId?: `${string}_tipex`;
		extensions?: AnyExtension[];
		/**
		 * Whether to show the default floating menu.
		 */
		floating?: boolean;
		/**
		 * Whether to focus on the editor when it is created.
		 */
		focusOnEdit?: boolean;
		/**
		 * The editor's head section.
		 */
		foot?: HasEditorSnippet;
		/**
		 * The editor's foot section.
		 */
		head?: HasEditorSnippet;
		body?: string;
		focused?: boolean;
		oncreate?: (props: EditorEvents['create']) => void;
		ondestroy?: (props: EditorEvents['destroy']) => void;
		onupdate?: (props: EditorEvents['update']) => void;
		style?: string;
		/**
		 * The editor instance.
		 */
		this?: TipexEditor;
		utilities?: HasEditorSnippet;
	}
</script>

<script lang="ts">
	import { defaultExtensions } from './default.js';
	import 'iconify-icon';
	import { onMount, setContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Controls from '$lib/tipex/Controls.svelte';
	import type { Extensions } from '@tiptap/core';
	import { getDefaultFloatingMenu } from '$lib/tipex/prepare.js';
	import LinkFloatingMenu from '$lib/tipex/link/LinkFloatingMenu.svelte';
	import Utility from '$lib/tipex/Utility.svelte';

	let {
		extensions = $bindable(defaultExtensions),
		this: tipex = $bindable(),
		floating = false,
		controls = false,
		oncreate = () => {
		},
		ondestroy = () => {
		},
		onupdate = () => {
		},
		body = '',
		class: className = '',
		style = '',
		focusOnEdit = true,
		focused = $bindable(false),
		head,
		controlComponent,
		utilities,
		foot,
		ctxId
	}: TipexProps = $props();

	function onFocusChange() {
		focused = !!(editorsParentRef && editorsParentRef.contains(document.activeElement));
	}

	let floatingRef: HTMLDivElement | undefined = $state();
	let tipexEditorRef: HTMLDivElement | undefined = $state();
	let editorsParentRef: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (floating && !extensions.find(ext => ext.name === 'floatingMenu') && floatingRef) {
			extensions.push(getDefaultFloatingMenu(floatingRef));
		}
		tipex = new Editor({
			element: tipexEditorRef,
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				...Object.values(extensions) as Extensions
			],
			content: body as string,
			onTransaction({ editor }) {
				// force re-render so `tipex.isActive` works as expected
				tipex = undefined;
				tipex = editor;
			},
			autofocus: true,
			onCreate: oncreate,
			onDestroy: ondestroy,
			onUpdate: onupdate
		});
		setContext(ctxId, tipex);
	});
</script>

<svelte:document onfocusin={onFocusChange} onfocusout={onFocusChange} />

{#if floating}
	<LinkFloatingMenu bind:floatingRef {tipex} />
{/if}

<div class="tipex-editor {className}" {style} bind:this={editorsParentRef} class:focused class:focusOnEdit>
	<div class="tipex-editor-wrap">
		{@render head?.(tipex)}
		<div class="tipex-editor-section" bind:this={tipexEditorRef}></div>
		{#if controlComponent}
			{@render controlComponent?.(tipex)}
		{:else if controls}
			<!-- Default controls -->
			<Controls {tipex}>
				{#if utilities}
					<div class="tipex-utilities">
						{@render utilities?.(tipex)}
					</div>
				{:else}
					<div class="tipex-utilities">
						<Utility {tipex} />
					</div>
				{/if}
			</Controls>
		{/if}
		{@render foot?.(tipex)}
	</div>
</div>

