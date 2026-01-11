import { createI18n } from "vue-i18n";
import en from "./en.json";
import nl from "./nl.json";
import ar from "./ar.json";

const i18n = createI18n({
	legacy: false,
	locale: "en", // default language
	fallbackLocale: "en",
	messages: {
		en,
		nl,
		ar,
	},
});

export default i18n;
