<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { TipexEditor } from './Tipex.svelte';

	/**
	 * Defines the properties for the default Controls component.
	 */
	export interface ControlsProps {
		children?: Snippet;
		tipex: TipexEditor;
	}
</script>

<script lang="ts">
	import EditLinkMenu from './link/EditLinkMenu.svelte';

	let { children, tipex }: ControlsProps = $props();
	
	let copySuccess = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(tipex?.getHTML() || '');
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
			tipex?.chain().focus().run();
		} catch (error) {
			console.error('Failed to copy:', error);
		}
	}
</script>

{#if tipex}
	<div class="tipex-controller">
		<div class="tipex-basic-controller-wrapper">
			<!-- Text Styles Group -->
			<button
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={tipex?.isActive('heading', { level: 1 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Heading 1"
				type="button"
			>
				<span class="font-semibold text-xs">H1</span>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={tipex?.isActive('heading', { level: 2 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Heading 2"
				type="button"
			>
				<span class="font-semibold text-xs">H2</span>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleHeading({ level: 3 }).run()}
				class:active={tipex?.isActive('heading', { level: 3 })}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Heading 3"
				type="button"
			>
				<span class="font-semibold text-xs">H3</span>
			</button>

			<button
				onclick={() => tipex?.chain().focus().setParagraph().run()}
				class:active={tipex?.isActive('paragraph')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Paragraph/Normal text"
				type="button"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
					<path d="M19 5h-3m-5 0h5m-5 0v10m0-10h-1c-1.667 0-5 1-5 5s3.333 5 5 5h1m0 4v-4m5 4V5"/>
				</svg>
			</button>

			<div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

			<!-- Text Formatting Group -->
			<button
				onclick={() => tipex?.chain().focus().toggleBold().run()}
				class:active={tipex?.isActive('bold')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Bold"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleItalic().run()}
				class:active={tipex?.isActive('italic')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Italic"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleUnderline().run()}
				class:active={tipex?.isActive('underline')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Underline"
				type="button"
			>
				<span class="font-semibold text-xs underline">U</span>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleStrike().run()}
				class:active={tipex?.isActive('strike')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Strikethrough"
				type="button"
			>
				<span class="font-semibold text-xs line-through">S</span>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleCode().run()}
				class:active={tipex?.isActive('code')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Inline Code"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
				</svg>
			</button>

			<div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

			<!-- Lists Group -->
			<button
				onclick={() => tipex?.chain().focus().toggleBulletList().run()}
				class:active={tipex?.isActive('bulletList')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Bullet List"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleOrderedList().run()}
				class:active={tipex?.isActive('orderedList')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Numbered List"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
					<path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleTaskList().run()}
				class:active={tipex?.isActive('taskList')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Task List"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M0 3.5A.5.5 0 0 1 .5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM0 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 0 8zm0 4.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
					<path d="M11.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8.5 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
				</svg>
			</button>

			<div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

			<!-- Block Elements Group -->
			<button
				onclick={() => tipex?.chain().focus().toggleBlockquote().run()}
				class:active={tipex?.isActive('blockquote')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Quote"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().toggleCodeBlock().run()}
				class:active={tipex?.isActive('codeBlock')}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Code Block"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().setHorizontalRule().run()}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Horizontal Rule"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1zm10 2.5H4a1 1 0 0 1-1-1V9.5H2V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V11a1 1 0 0 1-1 1z"/>
				</svg>
			</button>

			<div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

			<!-- Actions Group -->
			<button
				onclick={() => tipex?.chain().focus().undo().run()}
				disabled={!tipex?.can().undo()}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Undo"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
					<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
				</svg>
			</button>

			<button
				onclick={() => tipex?.chain().focus().redo().run()}
				disabled={!tipex?.can().redo()}
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				aria-label="Redo"
				type="button"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
				</svg>
			</button>

		</div>
		
		<!-- Utility Actions -->
		<div class="tipex-utilities">
			<button
				class="tipex-edit-button tipex-button-extra tipex-button-rigid"
				class:active={copySuccess}
				onclick={copy}
				type="button"
				aria-label={copySuccess ? "Copied!" : "Copy HTML"}>
				{#if copySuccess}
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75">
							<path d="M8.5.5h-3a1 1 0 0 0-1 1V2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1"/>
							<path d="M9.75 1.5h1.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h1.5"/>
							<path d="m5 9l1.5 1l3-4"/>
						</g>
					</svg>
				{:else}
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75">
							<path d="M8.5.5h-3a1 1 0 0 0-1 1V2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1"/>
							<path d="M9.75 1.5h1.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h1.5"/>
						</g>
					</svg>
				{/if}
			</button>
			
			<EditLinkMenu {tipex} />
			
			{@render children?.()}
		</div>
	</div>
{/if}
