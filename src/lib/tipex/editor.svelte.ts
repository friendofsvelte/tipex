import type { Editor } from '@tiptap/core';

export const tipex: { editor: InstanceType<typeof Editor> | null } = $state({
	editor: null,
	isLoading: false
});
