<template>
  <v-container>
    <v-chip
      small
      @click="applyTag(item)"
      v-for="item in data"
      :key="item.id"
      :color="item.color"
      :outlined="!appliedTagMap[item.label]"
      class="ma-1"
    >
      {{ item.label }}
    </v-chip>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import { TagModel } from "@/models/tag";
@Component
export default class TagList extends Vue {
  private data: TagModel[] = [
    {
      id: 0,
      label: "hoge",
      color: "#FF0000"
    },
    {
      id: 1,
      label: "hage",
      color: "#550055"
    }
  ];
  private deletable: boolean = false;
  private appliedTagMap: { [key: string]: boolean } = {};
  private applyTag(item: TagModel) {
    this.$set(this.appliedTagMap, item.label, !this.appliedTagMap[item.label]);
  }
}
</script>
