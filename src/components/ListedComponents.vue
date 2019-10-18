<template>
  <v-list class="transparent" dense>
    <v-list-group v-for="item in data" :key="item.name" :value="true">
      <template v-slot:activator>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </template>
      <v-list-item-content>
        <component :is="item.component" v-bind="item.props"></component>
      </v-list-item-content>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import { LazyComponent } from "../types/common";
export type ListedComponentsListType = {
  name: string;
  component: LazyComponent;
  props?: any;
}[];
@Component
export default class ListedComponents extends Vue {
  @Model("input", { type: Array }) private data!: ListedComponentsListType;
}
</script>
