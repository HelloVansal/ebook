<template>
  <div>
    <transition name="slide-up">
      <div v-show="isMenuShow" class="menu-wrapper" :class="{boxShadowHidden:isFontSizeControlShow || !isMenuShow}">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper" @click="fontSizeControlToggle">
          <span class="icon-a icon">A</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="fontSizeControl" v-show="isFontSizeControlShow">
        <div class="smallA" :style="{'fontSize':fontSizeList[0].fontSize,'paddingLeft':paddingWidth}">A</div>
        <div class="control" v-for="(item,index) of fontSizeList" :key="index">
          <div class="line"></div>
          <div class="point-wrapper"></div>
          <div class="line"></div>
        </div>
        <div class="bigA" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize,'paddingRight':paddingWidth}">A</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isFontSizeControlShow: false
    }
  },
  computed: {
    // A字体偏移量
    paddingWidth () {
      let allWidth = window.innerWidth - 80
      let paddingA = allWidth / (this.fontSizeList.length * 2) + 'px'
      return paddingA
    }
  },
  methods: {
    fontSizeControlToggle () {
      this.isFontSizeControlShow = true
    },
    hiddenFontSizeControl () {
      this.isFontSizeControlShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/global";

  .menu-wrapper {
    display: flex;
    position: absolute;
    z-index: 101;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    background-color: #fff;
    &.boxShadowHidden {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-a {
        font-size: px2rem(28);
      }
    }
  }

  .fontSizeControl {
    display: flex;
    position: absolute;
    left: 0;
    z-index: 101;
    bottom: px2rem(48);
    width: 100%;
    height: px2rem(60);
    background-color: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .smallA, .bigA {
      width: px2rem(40);
      height: 100%;
      @include center;
    }
    .control {
      flex: 1;
      display: flex;
      align-items: center;
      .line {
        flex: 1;
        height: px2rem(0);
        border-top: px2rem(1) solid #ccc;
      }
      &:nth-child(2) {
        .line:first-child {
          border-top: none;
        }
      }
      &:nth-last-child(2) {
        .line:last-child {
          border-top: none;
        }
      }
      .point-wrapper {
        width: px2rem(0);
        height: px2rem(7);
        border-left: px2rem(1) solid #ccc;
      }
    }
  }
</style>
