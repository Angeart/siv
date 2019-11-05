<template>
  <extra-webview src="https://pixiv.net"></extra-webview>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import ExtraWebview from "@/components/ExtraWebview.vue";
@Component({
  components: {
    ExtraWebview
  }
})
export default class Pixiv extends Vue {}
</script>
