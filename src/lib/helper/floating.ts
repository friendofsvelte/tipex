import { FloatingMenu } from '@tiptap/extension-floating-menu';

export function getDefaultFloatingMenu(editLinkRef: HTMLElement) {
	return FloatingMenu.configure({
		pluginKey: 'floatingLinkEdit',
		element: editLinkRef,
		shouldShow: ({ editor }) => {
			return editor.isActive('link');
		},
		tippyOptions: {
			placement: 'top-start',
			zIndex: 0,
			popperOptions: {
				placement: 'top-start',
				strategy: 'fixed'
			},
			appendTo: () => document.body
		}
	});
}
