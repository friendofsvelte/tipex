import basicCodes from './basicCodes.json' with { type: 'json' };

export const insertUtils = basicCodes.insertUtils;
export const appendUtils = basicCodes.appendUtils;
export const overrideControl = basicCodes.overrideControl;
export const install = basicCodes.install;
export const usage = basicCodes.usage;
export const styling = basicCodes.styling;
export const access = basicCodes.access;

let body = basicCodes.body;

const codes = {
	insertUtils,
	install,
	usage,
	appendUtils,
	overrideControl,
	body,
	access,
	styling
};
export default codes;
