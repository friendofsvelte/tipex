<script lang="ts">
	import { defaultExtensions } from '../../helper/default.js';
	import { onMount, setContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Controls from '../controls/Controls.svelte';
	import { getDefaultFloatingMenu } from '../../helper/floating.js';
	import LinkFloatingMenu from '../link/LinkFloatingMenu.svelte';
	import Utility from '../utility/Utility.svelte';
	import { cn } from '$lib/helper/cls.js';
	import { tipex as tipexVariants, type TipexProps } from './tipex.js';

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
		wrapClass = '',
		editorClass = '',
		utilitiesClass = '',
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

	const { base, wrap, editor, utilities: utilitiesSlot } = $derived(
		tipexVariants({
			focal,
			focused
		})
	);

	const baseClass = $derived(cn(base(), className));
	const wrapClasses = $derived(cn(wrap(), wrapClass));
	const editorClasses = $derived(cn(editor(), 'tipex-editor-section', editorClass));
	const utilitiesClasses = $derived(cn(utilitiesSlot(), utilitiesClass));

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

<div class={baseClass} {style} bind:this={editorsParentRef}>
	<div class={wrapClasses}>
		{@render head?.(tipex)}
		<div class={editorClasses} bind:this={tipexEditorRef}></div>
		{#if controls}
			<!-- Default controls -->
			<Controls {tipex}>
				{#if utilities}
					<div class={utilitiesClasses}>
						{@render utilities?.(tipex)}
					</div>
				{:else}
					<!-- Default utilities -->
					<div class={utilitiesClasses}>
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