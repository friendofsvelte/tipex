import { tv } from 'tailwind-variants';
import type { ClassValue } from 'tailwind-variants';
import type { TipexEditor } from '../tipex/tipex.js';

export interface LinkFloatingMenuProps {
	floatingRef: HTMLDivElement | undefined;
	tipex: TipexEditor;
	class?: ClassValue;
	groupClass?: ClassValue;
	buttonClass?: ClassValue;
}

export const linkFloatingMenu = tv({
	slots: {
		group:
			'tipex-floating-group rounded-lg shadow text-gray-600 dark:text-gray-400 text-xs py-0.5 px-1 z-10 flex flex-row gap-0.5 items-center bg-neutral-100 dark:bg-neutral-800',
		button:
			'tipex-floating-button flex flex-row items-center justify-center border dark:border-neutral-700/60 border-neutral-200/70 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 h-6 w-6'
	},
	variants: {
		visible: {
			true: {
				group: 'flex'
			},
			false: {
				group: 'hidden'
			}
		}
	},
	defaultVariants: {
		visible: false
	}
});
