<script lang="ts" module>
	import type { ControlsProps, ButtonState } from './controls.js';
</script>

<script lang="ts">
	import { cn } from '$lib/helper/cls.js';
	import { controls } from './controls.js';
	import Fa6SolidParagraph from '../icons/Fa6SolidParagraph.svelte';
	import Fa6SolidBold from '../icons/Fa6SolidBold.svelte';
	import Fa6SolidItalic from '../icons/Fa6SolidItalic.svelte';
	import Fa6SolidCode from '../icons/Fa6SolidCode.svelte';

	let {
		children,
		tipex,
		class: className = '',
		wrapperClass = '',
		buttonClass = '',
		buttonSize = 'rigid',
		buttonStyle = 'extra'
	}: ControlsProps = $props();

	// Get the slots from controls with our configuration
	const { base, wrapper, button } = $derived(
		controls({
			buttonSize,
			buttonStyle
		})
	);

	const baseClass = $derived(cn(base(), className));
	const wrapperClasses = $derived(cn(wrapper(), wrapperClass));
	const buttonClasses = $derived(cn(button(), buttonClass));

	// Dynamically generate the configuration for each button
	const buttons = $derived.by(() => {
		if (!tipex) return [];

		return [
			{
				label: 'H1',
				active: tipex.isActive('heading', { level: 1 }),
				onClick: () => tipex.chain().focus().toggleHeading({ level: 1 }).run()
			},
			{
				label: 'H2',
				active: tipex.isActive('heading', { level: 2 }),
				onClick: () => tipex.chain().focus().toggleHeading({ level: 2 }).run()
			},
			{
				label: 'H3',
				active: tipex.isActive('heading', { level: 3 }),
				onClick: () => tipex.chain().focus().toggleHeading({ level: 3 }).run()
			},
			{
				label: 'Paragraph',
				active: tipex.isActive('paragraph'),
				onClick: () => tipex.chain().focus().setParagraph().run(),
				icon: Fa6SolidParagraph
			},
			{
				label: 'Bold',
				active: tipex.isActive('bold'),
				onClick: () => tipex.chain().focus().toggleBold().run(),
				icon: Fa6SolidBold
			},
			{
				label: 'Italic',
				active: tipex.isActive('italic'),
				onClick: () => tipex.chain().focus().toggleItalic().run(),
				icon: Fa6SolidItalic
			},
			{
				label: 'Code',
				active: tipex.isActive('code'),
				onClick: () => tipex.chain().focus().toggleCode().run(),
				icon: Fa6SolidCode
			}
		] as ButtonState[];
	});

	function getButtonClasses(isActive: boolean) {
		return cn(
			buttonClasses,
			isActive && 'dark:bg-gray-800 bg-zinc-200/70 border-neutral-700 dark:border-zinc-300 text-zinc-700 dark:text-zinc-300'
		);
	}
</script>

{#if tipex}
	<div class={baseClass}>
		<div class={wrapperClasses}>
			{#each buttons as btn, i}
				<button
					onclick={btn.onClick}
					class={getButtonClasses(btn.active)}
					aria-label={btn.label}
					type="button"
				>
					{#if btn.icon}
						{@const Icon = btn.icon}
						<Icon class="h-4 w-4" />
					{:else}
						{btn.label}
					{/if}
				</button>
			{/each}
		</div>
		{@render children?.()}
	</div>
{/if}