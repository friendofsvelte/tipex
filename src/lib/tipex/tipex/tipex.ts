import { tv } from 'tailwind-variants';
import type { Snippet } from 'svelte';

import type { AnyExtension, Editor, EditorEvents } from '@tiptap/core';

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
	wrapClass?: string;
	editorClass?: string;
	utilitiesClass?: string;
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
} & WithControlsX &
	(Boolish | NonBoolish);

export const tipex = tv({
	slots: {
		base: 'flex flex-row gap-0 dark:bg-neutral-900 bg-neutral-50 rounded-md py-0 duration-200 overflow-y-hidden',
		wrap: 'flex flex-col gap-0 h-full w-full',
		editor: 'px-0.5 py-2 h-full overflow-y-auto',
		utilities: 'flex gap-2 ml-auto max-w-lg w-full justify-end'
	},
	variants: {
		focal: {
			true: {},
			false: {}
		},
		focused: {
			true: {},
			false: {}
		}
	},
	compoundVariants: [
		{
			focused: true,
			focal: true,
			class: {
				base: 'outline-none ring-4 ring-blue-500 border-transparent'
			}
		}
	],
	defaultVariants: {
		focal: true,
		focused: false
	}
});
