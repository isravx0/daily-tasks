import { createI18n } from "vue-i18n";
import en from "./en.json";
import nl from "./nl.json";

const i18n = createI18n({
	legacy: false,
	locale: "en", // default language
	fallbackLocale: "en",
	messages: {
		en,
		nl,
	},
});

export default i18n;
