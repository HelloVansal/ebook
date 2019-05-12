<template>
  <div class="ebook">
    <transition name="slide-down">
      <div v-show="isMenuShow" class="title-wrapper">
        <div class="left">
          <span class="icon-back icon"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-cart icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-person icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more icon"></span>
          </div>
        </div>
      </div>
    </transition>
    <div class="read-wrapper">
      <div id="read" class="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="menuToggle"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <transition name="slide-up">
      <div v-show="isMenuShow" class="menu-wrapper">
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
        <div class="smallA">A</div>
        <div class="control">
          <div class="line1-wrap">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="line2-wrap">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
        <div class="bigA">A</div>
      </div>
    </transition>
  </div>
</template>

<script>
import Epub from 'epubjs'

const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
export default {
  data () {
    return {
      isMenuShow: false,
      isFontSizeControlShow: false
    }
  },
  methods: {
    // 电子书解析和渲染
    showEpub () {
      // 生成Ebook
      this.book = new Epub(DOWNLOAD_URL)
      // 生成Rendition,通过Book.renderTo方法生成
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通过Rendition.display渲染电子书
      this.rendition.display()
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    menuToggle () {
      this.isMenuShow = !this.isMenuShow
    },
    fontSizeControlToggle () {
      this.isFontSizeControlShow = !this.isFontSizeControlShow
      let menu = document.querySelector('.menu-wrapper')
      if (this.isFontSizeControlShow) {
        menu.style.boxShadow = 'none'
      } else {
        let menu = document.querySelector('.menu-wrapper')
        menu.style.boxShadow = '0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)'
      }
    }
  },
  mounted () {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/global";

  .ebook {
    position: relative;
    overflow-y: hidden;
    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(48);
      z-index: 101;
      background-color: #fff;
      box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
      &.slide-down-enter, &.slide-down-leave-to {
        transform: translate3d(0, -100%, 0);
      }
      &.slide-down-enter-to, &.slide-down-leave {
        transform: translate3d(0, 0, 0);
      }
      &.slide-down-enter-active, &.slide-down-leave-active {
        transition: all .3s linear;
      }
      .left {
        flex: 0 0 px2rem(60);
        @include center;
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .icon-wrapper {
          flex: 0 0 px2rem(40);
          @include center;
        }
      }
    }
    .read-wrapper {
      .read {

      }
      .mask {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        .left {
          width: px2rem(100)
        }
        .right {
          width: px2rem(100)
        }
        .center {
          flex: 1;
        }
      }
    }
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
      .icon-wrapper {
        flex: 1;
        @include center;
        .icon-a{
          font-size: px2rem(28);
        }
      }
    }
    .fontSizeControl {
      display: flex;
      position: absolute;
      left: 0;
      z-index: 100;
      bottom: px2rem(48);
      width: 100%;
      height: px2rem(48);
      background-color: #fff;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
      .smallA {
        width: px2rem(60);
        @include center;
        font-size: px2rem(20);
      }
      .control {
        flex: 1;
        .line1-wrap {
          display: flex;
          height: px2rem(23);
          align-items: flex-end;
          .line {
            flex: 1;
            height: px2rem(2);
            border-bottom: 1px solid #bbb;
            border-left: 1px solid #bbb;
          }
          .line:last-child {
            border-right: 1px solid #bbb;
          }
        }
        .line2-wrap {
          display: flex;
          .line {
            flex: 1;
            height: px2rem(2);
            border-left: 1px solid #bbb;
          }
          .line:last-child {
            border-right: 1px solid #bbb;
          }
        }
      }
      .bigA {
        width: px2rem(60);
        @include center
      }
    }
  }
</style>
