<template>
  <div class="ebook">
    <title-bar :isMenuShow='isMenuShow'/>
    <div class="read-wrapper">
      <div id="read" class="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="menuToggle"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :isMenuShow='isMenuShow'
              ref="menuBar"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              @changeFontSize="changeFontSize"
              :themeList="themeList"
              :defaultTheme="defaultTheme"
              @setTheme="setTheme"
              :bookAvailable="bookAvailable"
              @onProgressChange="onProgressChange"
              @jumpTo="jumpTo"
              :navigation="navigation"/>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from 'src/components/TitleBar'
import MenuBar from 'src/components/MenuBar'

const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
export default {
  data () {
    return {
      isMenuShow: false,
      fontSizeList: [
        { fontSize: '12px' },
        { fontSize: '14px' },
        { fontSize: '16px' },
        { fontSize: '18px' },
        { fontSize: '20px' },
        { fontSize: '22px' },
        { fontSize: '24px' }
      ],
      defaultFontSize: '16px',
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        }, {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeaba'
            }
          }
        }, {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000'
            }
          }
        }, {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    }
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    // 根据链接跳转到指定目录
    jumpTo (href) {
      this.rendition.display(href)
      this.menuToggle()
    },
    // progress值为0-100
    onProgressChange (progress) {
      const precentage = progress / 100
      const location = precentage > 0 ? this.location.cfiFromPercentage(precentage) : 0
      this.rendition.display(location)
    },
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
      this.themes = this.rendition.themes
      this.changeFontSize(this.defaultFontSize)
      this.registerTheme()
      this.setTheme(this.defaultTheme)
      // 获取location对象来实现阅读进度功能
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        console.log(this.navigation)
        return this.book.locations.generate()
      }).then(result => {
        this.location = this.book.locations
        this.bookAvailable = true
      })
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
      if (!this.isMenuShow) {
        this.$refs.menuBar.hiddenFontSizeControl()
      }
    },
    changeFontSize (fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize)
      }
    },
    // 注册主题
    registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    // 设置主题
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
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
  }
</style>
