import { FloatingMenu } from '@tiptap/extension-floating-menu';

export function getDefaultFloatingMenu(editLinkRef: HTMLElement) {
	return FloatingMenu.configure({
		pluginKey: 'floatingLinkEdit',
		element: editLinkRef,
		shouldShow: ({ editor }) => {
			return editor.isActive('link');
		},
		options: {
			placement: 'top-start',
			strategy: 'fixed'
		},
		appendTo: () => document.body
	});
}
