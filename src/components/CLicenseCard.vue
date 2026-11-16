<!--
Copyright (c) 2025 by Servely UG (haftungsbeschränkt)
Copyright (c) 2024 by Crystal Creations GbR and Johannes Huther

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 -->
<template>
  <v-card flat class="pa-2" rounded="xl">
    <v-card-title>
      <a
        v-if="softwareInfo.repositoryLink"
        :href="softwareInfo.repositoryLink"
        class="d-flex ma-0"
      >
        <h5>
          {{ softwareInfo.name }}
          <code class="mx-1">{{ softwareInfo.version }}</code>
        </h5>
        <v-icon :icon="mdiGithub"> </v-icon>
      </a>
      <h5 v-else>
        {{ softwareInfo.name }}
        <code class="mx-1">{{ softwareInfo.version }}</code>
      </h5>
    </v-card-title>
    <v-card-subtitle>
      {{
        softwareInfo.author
          ? i18n.t("crystal_components.license_card.by_author", {
              author: softwareInfo.author,
            })
          : i18n.t("crystal_components.license_card.author_not_specified")
      }}
    </v-card-subtitle>
    <v-card-text>
      <code
        v-if="
          !softwareInfo.notice || softwareInfo.notice.split(/\n/).length < 2
        "
        class="license-text"
      >
        {{ softwareInfo.notice }}
      </code>
      <v-expansion-panels v-else>
        <v-expansion-panel elevation="0" rounded="xl">
          <v-expansion-panel-title>
            {{ i18n.t("crystal_components.license_card.license") }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <code class="license-text">{{ softwareInfo.notice }}</code>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";
import { mdiGithub } from "@mdi/js";

const i18n = useI18n();

type SoftwareInfo = {
  /**
   * The name of the software.
   */
  name: string;

  /**
   * The version of the software.
   */
  version: string;

  /**
   * The author of the software.
   */
  author?: string;

  /**
   * The link to the repository of the software.
   */
  repositoryLink?: string;

  /**
   * The notice file of the software.
   */
  notice: string;
};

/**
 * A component that displays license information for a package.
 */
defineProps({
  /**
   * The software information
   */
  softwareInfo: { type: Object as PropType<SoftwareInfo>, required: true },
});
</script>

<style lang="scss" scoped>
a:link {
  text-decoration: inherit;
  color: inherit;
}

a:visited {
  text-decoration: inherit;
  color: inherit;
}

code.license-text {
  white-space: pre-wrap;
  display: block;
  width: fit-content;
}
</style>
