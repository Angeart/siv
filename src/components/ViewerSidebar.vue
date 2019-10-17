<template>
  <listed-components v-model="components"></listed-components>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import ListedComponents, {
  ListedComponentsListType
} from "@/components/ListedComponents.vue";
const lazy = function(path: string) {
  return () =>
    import(/* webpackChunkName: "listed-components-[request]" */ `${path}`);
};
import { LazyComponent } from "../types/common";
@Component({
  components: {
    ListedComponents
  }
})
export default class ViewerSidebar extends Vue {
  private components: ListedComponentsListType = [
    {
      name: "Tag",
      component: lazy("./TagList.vue")
    }
  ];
}
</script>
