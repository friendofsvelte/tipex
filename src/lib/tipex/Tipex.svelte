<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { AnyExtension, EditorEvents } from '@tiptap/core';

	export type TipexEditor = InstanceType<typeof Editor> | undefined;

	export type HasEditorSnippet = Snippet<[TipexEditor]>;

	export interface Boolish {
		focal?: boolean;
		floating?: boolean;
		'!focal'?: never;
		'!floating'?: never;
	}

	export interface NonBoolish {
		'!focal'?: true;
		'!floating'?: true;
		focal?: never;
		floating?: never;
	}

	export interface WithControlsOn {
		controls?: true;
		'!controls'?: never;
		controlComponent?: never;
		utilities?: HasEditorSnippet;
	}

	export interface WithControlsOff {
		controls?: false;
		'!controls'?: never;
		utilities?: never;
		controlComponent?: HasEditorSnippet;
	}

	export interface WithControlsNot {
		'!controls': true;
		controls?: never;
		utilities?: never;
		controlComponent?: never;
	}

	export type WithControlsX = WithControlsOn | WithControlsOff | WithControlsNot;

	export type TipexProps = {
		class?: string;
		/**
		 * Context ID to be used for the editor.
		 */
		ctxId?: `${string}_tipex`;
		extensions?: AnyExtension[];
		/**
		 * The editor's head section.
		 */
		foot?: HasEditorSnippet;
		/**
		 * The editor's foot section.
		 */
		head?: HasEditorSnippet;
		body?: string;
		oncreate?: (props: EditorEvents['create']) => void;
		ondestroy?: (props: EditorEvents['destroy']) => void;
		onupdate?: (props: EditorEvents['update']) => void;
		style?: string;
		/**
		 * The editor instance.
		 */
		tipex?: TipexEditor;
		/**
		 * Whether the editor should is focused, bind.
		 */
		focused?: boolean;
    /**
     * Whether the editor should have autofocus on mount.
     */
    autofocus?: boolean;
	} & WithControlsX & (Boolish | NonBoolish);
</script>

<script lang="ts">
	import { defaultExtensions } from './default.js';
	import { onMount, setContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Controls from '../tipex/Controls.svelte';
	import { getDefaultFloatingMenu } from '../tipex/prepare.js';
	import LinkFloatingMenu from '../tipex/link/LinkFloatingMenu.svelte';
	import Utility from '../tipex/Utility.svelte';

	let {
		extensions = $bindable(defaultExtensions),
		tipex = $bindable(),
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
		focal = true,
		focused = $bindable(false),
    autofocus = true,
		head,
		controlComponent,
		utilities,
		foot,
		ctxId = `_tipex`,
		...restProps
	}: TipexProps = $props();

	focal = restProps['!focal'] === undefined ? focal : !restProps['!focal'];
	floating = restProps['!floating'] === undefined ? floating : !restProps['!floating'];
	controls = restProps['!controls'] === undefined ? controls : !restProps['!controls'];

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
				...extensions
			],
			content: body as string,
			onTransaction({ editor }) {
				// force re-render so `tipex.isActive` works as expected
				tipex = undefined;
				tipex = editor;
			},
			autofocus: autofocus,
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

<div class="tipex-editor {className}" {style} bind:this={editorsParentRef} class:focused class:focal>
	<div class="tipex-editor-wrap">
		{@render head?.(tipex)}
		<div class="tipex-editor-section" bind:this={tipexEditorRef}></div>
		{#if controls}
			<!-- Default controls -->
			<Controls {tipex}>
				{#if utilities}
					<div class="tipex-utilities">
						{@render utilities?.(tipex)}
					</div>
				{:else}
					<!-- Default utilities -->
					<div class="tipex-utilities">
						<Utility {tipex} />
					</div>
				{/if}
			</Controls>
		{:else}
			{@render controlComponent?.(tipex)}
		{/if}
		{@render foot?.(tipex)}
	</div>
</div>
