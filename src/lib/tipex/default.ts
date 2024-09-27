import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import type { AnyExtension } from '@tiptap/core';

export const defaultExtensions = {
	link: Link.configure({
		openOnClick: false,
		HTMLAttributes: {
			target: '_blank',
			rel: 'noopener noreferrer'
		}
	}),
	image: Image.configure({
		allowBase64: true
	}),
	placeholder: Placeholder.configure({
		showOnlyWhenEditable: false
	}),
	codeBlock: CodeBlockLowlight.configure({
		lowlight,
		languageClassPrefix: 'language-',
		defaultLanguage: 'plaintext'
	}),
	floatingMenu: null
} as Record<string, AnyExtension | null>;
