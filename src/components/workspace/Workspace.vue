<template>
  <div style="display: flex; height: 100vh;">
    <div ref="playground" class="playground" style="flex: 1;"></div>
    <div id="palette-container" style="width: 240px;"></div>
    <toolbar :playground="playground" :workspace="workspace" :current-color="currentColor"/>
  </div>
</template>

<script>
import Toolbar from './toolbar/Toolbar.vue'
import { PaletteService, defaultPalette } from '@/services/palette.js'

export default {
  name: 'workspace',
  props: ['playground', 'workspace'],
  components: { Toolbar },
  data () {
    return {
      palette: new PaletteService(),
      currentColor: defaultPalette[0]
    }
  },
  mounted() {
    this.playground.setContainer(this.$refs.playground)
    // パレットの初期化
    const paletteContainer = this.$el.querySelector('#palette-container')
    this.palette.init(paletteContainer)
    
    // パレットの色選択コールバックを設定
    this.palette.setColorSelectCallback((color) => {
      this.currentColor = color;
      this.playground.setColor(color);
    });
  },
  methods: {}
}
</script>

<style>
.playground {
  background: #fff;
}
.playground svg {
  cursor: crosshair;
  margin: 1rem 1rem 80px;
}

.playground path, .grid path {
  stroke: currentColor;
  stroke-width: 0.25;
}
</style>