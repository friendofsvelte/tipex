import type { PageLoad } from './$types.js';

const API_URL = 'https://api.github.com/repos/';
const REPO_URL = 'friendofsvelte/tipex';
const FULL_URL = API_URL + REPO_URL;

export const load: PageLoad = async ({ fetch }) => {
	let repo: GithubRepo | NonNullable<any>;
	try {
		const response = await fetch(FULL_URL);
		repo = await response.json();
	} catch (e) {
		console.log(e);
		repo = {};
	}
	return {
		repo
	};
};
