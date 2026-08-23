import { It as objectType, Lt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact.schema-DkXzBqMO.js
var contactSchema = objectType({
	name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(200),
	organisation: stringType().trim().max(200).optional().default(""),
	topic: stringType().trim().max(200).optional().default(""),
	message: stringType().trim().min(1).max(5e3)
});
//#endregion
export { contactSchema as t };
