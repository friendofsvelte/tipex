
import {writable} from "svelte/store";
import type {Editor} from "@tiptap/core";

export const tipexEditor = writable<undefined | InstanceType<typeof Editor>>();
export const utilityButtonsComponent = writable<undefined | HTMLElement>();
export const isLoading = writable<boolean>(false);
