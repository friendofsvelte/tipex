import { tv } from 'tailwind-variants';
import type { ClassValue } from 'tailwind-variants';
import type { TipexEditor } from '$lib/tipex/tipex/tipex.js';

export interface EditLinkMenuProps {
	enableLinkEdit?: boolean;
	tipex: TipexEditor;
	class?: ClassValue;
	buttonClass?: ClassValue;
	inputGroupClass?: ClassValue;
	inputClass?: ClassValue;
	saveButtonClass?: ClassValue;
}

export const editLink = tv({
	slots: {
		button: 'tipex-edit-button tipex-button-extra tipex-button-rigid',
		inputGroup: 'tipex-link-edit-input-group',
		input:
			'focus:outline-0 pl-2 pr-1 w-full text-gray-950 dark:text-gray-200 text-xs truncate bg-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 placeholder-gray-600 dark:focus:placeholder-gray-400 focus:placeholder-gray-600 rounded-md',
		saveButton: 'tipex-edit-button tipex-button-extra tipex-button-free'
	},
	variants: {
		active: {
			true: {
				button: 'active'
			},
			false: {
				button: ''
			}
		}
	},
	defaultVariants: {
		active: false
	}
});
