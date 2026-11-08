import { addComponentsDir, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@crystal-creations/crystal-components",
    configKey: "crystalComponents",
  },
  moduleDependencies: {
    "@crystal-creations/animated-checkmark/nuxt": {},
    "@crystal-creations/pulsating-circle/nuxt": {},
  },
  setup(_options: any, nuxt: any) {
    const resolver = createResolver(import.meta.url);

    nuxt.hook("i18n:registerModule", (register: any) => {
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
