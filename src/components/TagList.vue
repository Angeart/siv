<template>
  <div class="px-2">
    <v-text-field
      v-model="filterString"
      class="ma-1"
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
      solo
      :items="labelList"
    ></v-text-field>
    <v-chip
      small
      @click="applyTag(item)"
      v-for="item in filteredData"
      :key="item.id"
      :color="item.color"
      :outlined="!appliedTagMap[item.label]"
      class="ma-1"
    >
      {{ item.label }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import { TagModel } from "@/models/tag";
@Component
export default class TagList extends Vue {
  private filterString: string = "";
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
  get labelList() {
    return this.data.map(v => v.label);
  }
  get filteredData() {
    if (this.filterString.length === 0) {
      return this.data;
    }
    return this.data.filter((v: TagModel) =>
      v.label.startsWith(this.filterString)
    );
  }
  private deletable: boolean = false;
  private appliedTagMap: { [key: string]: boolean } = {};
  private applyTag(item: TagModel) {
    this.$set(this.appliedTagMap, item.label, !this.appliedTagMap[item.label]);
  }
}
</script>
