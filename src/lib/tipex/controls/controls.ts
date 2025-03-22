import { tv } from 'tailwind-variants';
import type { ClassValue } from 'tailwind-variants';
import type { Snippet } from 'svelte';
import type { TipexEditor } from '$lib/tipex/tipex/tipex.js';

export const controls = tv({
	slots: {
		base: 'flex flex-row flex-wrap justify-between md:flex-row gap-2 sticky bottom-0 z-10 py-2 px-3 rounded-b-md backdrop-filter backdrop-blur-sm bg-neutral-200 dark:bg-gray-800/80 border-t border-neutral-300 dark:border-gray-700',
		wrapper: 'flex gap-2 flex-wrap',
		button:
			'bg-neutral-50 text-neutral-700 dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 border-neutral-400 dark:hover:bg-neutral-600/5 hover:bg-gray-100 dark:hover:border-gray-600 rounded-md flex justify-center items-center duration-100 cursor-pointer'
	},
	variants: {
		buttonSize: {
			rigid: {
				button: 'px-2 py-1 h-9 w-9'
			},
			free: {
				button: 'px-2 py-1 h-9'
			}
		},
		buttonStyle: {
			default: {
				button: ''
			},
			extra: {
				button:
					'hover:scale-105 active:scale-90 focus:scale-105 focus:shadow active:border-neutral-900 dark:active:border-white'
			}
		},
		active: {
			true: {
				button:
					'dark:bg-gray-800 bg-zinc-200/70 border-neutral-700 dark:border-zinc-300 text-zinc-700 dark:text-zinc-300'
			},
			false: {
				button: ''
			}
		}
	},
	defaultVariants: {
		buttonSize: 'rigid',
		buttonStyle: 'extra',
		active: false
	}
});

export type ButtonState = {
	active: boolean;
	onClick: () => void;
	label: string;
	icon?: Snippet;
};

export type ControlsProps = {
	children?: Snippet;
	tipex: TipexEditor;
	class?: ClassValue;
	wrapperClass?: ClassValue;
	buttonClass?: ClassValue;
	buttonSize?: 'rigid' | 'free';
	buttonStyle?: 'default' | 'extra';
};
