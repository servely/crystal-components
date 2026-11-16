import { addComponentsDir, createResolver, defineNuxtModule } from "@nuxt/kit";
import type { NitroInstance } from "@nuxt/kit";
import type { ModuleHooks } from "@nuxtjs/i18n";

type I18nRegisterModule = Parameters<ModuleHooks["i18n:registerModule"]>[0];

export default defineNuxtModule({
  meta: {
    name: "@crystal-creations/crystal-components",
    configKey: "crystalComponents",
  },
  moduleDependencies: {
    "@crystal-creations/animated-checkmark/nuxt": {},
    "@crystal-creations/pulsating-circle/nuxt": {},
  },
  setup(_options: unknown, nuxt: NitroInstance) {
    const resolver = createResolver(import.meta.url);

    nuxt.hook("i18n:registerModule", (register: I18nRegisterModule) => {
      register({
        langDir: resolver.resolve("./locales"),
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "de",
            file: "de.json",
          },
        ],
      });
    });

    addComponentsDir({
      path: resolver.resolve("components"),
      pathPrefix: false,
    });
  },
});
