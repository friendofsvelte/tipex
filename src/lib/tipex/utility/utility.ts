import { tv } from 'tailwind-variants';
import type { ClassValue } from 'tailwind-variants';
import type { Snippet } from 'svelte';
import type { TipexEditor } from '$lib/tipex/tipex/tipex.js';

export interface UtilityProps {
	children?: Snippet;
	tipex: TipexEditor;
	class?: ClassValue;
	buttonClass?: ClassValue;
}

export const utility = tv({
	slots: {
		button:
			'tipex-edit-button tipex-button-extra tipex-button-rigid bg-neutral-50 text-neutral-700 dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 border-neutral-400 dark:hover:bg-neutral-600/5 hover:bg-gray-100 dark:hover:border-gray-600 rounded-md flex justify-center items-center duration-100 cursor-pointer hover:scale-105 active:scale-90 focus:scale-105 focus:shadow active:border-neutral-900 dark:active:border-white'
	}
});
