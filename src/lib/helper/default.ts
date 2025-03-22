import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';

export const defaultExtensions = [
	Link.configure({
		openOnClick: false,
		HTMLAttributes: {
			target: '_blank',
			rel: 'noopener noreferrer'
		}
	}),
	Image.configure({
		allowBase64: true
	}),
	Placeholder.configure({
		showOnlyWhenEditable: false
	}),
	CodeBlockLowlight.configure({
		lowlight,
		languageClassPrefix: 'language-',
		defaultLanguage: 'plaintext'
	})
];
