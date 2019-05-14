<template>
  <div>
    <transition name="slide-up">
      <div v-show="isMenuShow" class="menu-wrapper" :class="{boxShadowHidden:isFontSizeControlShow || !isMenuShow || isThemeControlShow}">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper" @click="themeControlToggle">
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
          <div class="point-wrapper" @click="changeFontSize(item.fontSize)">
            <div class="point-bg" v-show="defaultFontSize === item.fontSize">
              <div class="point"></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="bigA" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize,'paddingRight':paddingWidth}">
          A
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="themeControl" v-show="isThemeControlShow">
        <div class="theme-wrap" v-for="(item,index) of themeList" :key="index" @click="changeTheme(index)">
          <div class="theme-display" :style="{backgroundColor:item.style.body.background}"></div>
          <div class="theme-name" :class="item.name">{{item.name}}</div>
        </div>
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
    },
    defaultFontSize: String,
    themeList: Array,
    defaultTheme: Number
  },
  data () {
    return {
      isFontSizeControlShow: false,
      isThemeControlShow: false
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
    // 字体控制器显示与否
    fontSizeControlToggle () {
      this.isFontSizeControlShow = true
      this.isThemeControlShow = false
    },
    // ——父组件调用，点击center处隐藏控制器
    hiddenFontSizeControl () {
      this.isFontSizeControlShow = false
      this.isThemeControlShow = false
    },
    // 触发父子组件改变字体
    changeFontSize (fontSize) {
      this.$emit('changeFontSize', fontSize)
    },
    // 主题控制器显示与否
    themeControlToggle () {
      this.isThemeControlShow = true
      this.isFontSizeControlShow = false
    },
    changeTheme (index) {
      this.$emit('setTheme', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/global";

  .menu-wrapper {
    display: flex;
    position: absolute;
    z-index: 102;
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
        position: relative;
        width: px2rem(0);
        height: px2rem(7);
        border-left: px2rem(1) solid #ccc;
        .point-bg {
          @include center;
          position: absolute;
          top: px2rem(-7);
          left: px2rem(-11);
          width: px2rem(20);
          height: px2rem(20);
          background-color: #fff;
          border-radius: 50%;
          border: px2rem(1) solid #000;
          box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
          .point {
            width: px2rem(4);
            height: px2rem(4);
            background-color: #000;
            border-radius: 50%;
          }
        }

      }
    }
  }

  .themeControl {
    display: flex;
    position: absolute;
    left: 0;
    z-index: 101;
    bottom: px2rem(48);
    width: 100%;
    height: px2rem(60);
    background-color: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .theme-wrap {
      flex: 1;
      height: 100%;
      padding: px2rem(5) px2rem(15);
      .theme-display {
        height: 30%;
        border: px2rem(1) solid #bbb;
        border-radius: px2rem(5);
      }
      .theme-name {
        margin-top: px2rem(7);
        text-align: center;
        font-size: px2rem(17);
        font-weight: bold;
        color: green;
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
