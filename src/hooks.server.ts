import type {Handle} from '@sveltejs/kit';
import {sequence} from "@sveltejs/kit/hooks";


const handleAppearance: Handle = (async ({event, resolve}) => {
    const appearanceMode = event.cookies.get('appearanceMode') ?? '';
    return resolve(event, {
        transformPageChunk: ({html}) => html
            .replace('%appearanceMode%', appearanceMode)
    });
});


export const handle = sequence(
    handleAppearance
);


