import { FloatingMenu } from '@tiptap/extension-floating-menu';

export function prepareDefaultFloatingMenu(editLinkElement: HTMLElement) {
	return FloatingMenu.configure({
		pluginKey: 'floatingMenuLinkEdit',
		element: editLinkElement,
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
