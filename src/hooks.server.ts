import type {Handle} from '@sveltejs/kit';
import {sequence} from "@sveltejs/kit/hooks";
import {handleAppearance} from "@friendofsvelte/toggle";


export const handle = sequence(
    handleAppearance
);


