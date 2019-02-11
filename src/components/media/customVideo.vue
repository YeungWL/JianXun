<template>
  <div class='custom-video-outer-box'>
    <video-player  class="video-player-box vjs-custom-skin"
                   ref="videoPlayer"
                   :options="playerOptions"
                   :playsinline="true"
                   @play="onPlayerPlay($event)"
                   @pause="onPlayerPause($event)"
                   @ended="onPlayerEnded($event)"
                   @loadeddata="onPlayerLoadeddata($event)"
                   @waiting="onPlayerWaiting($event)"
                   @playing="onPlayerPlaying($event)"
                   @timeupdate="onPlayerTimeupdate($event)"
                   @canplay="onPlayerCanplay($event)"
                   @canplaythrough="onPlayerCanplaythrough($event)"
                   @ready="playerReadied"
                   @statechanged="playerStateChanged($event)">
    </video-player>
  </div>
</template>

<script>
  //引入video样式
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
export default {
  // props:{
  //   // 这是数据源
  //   dataSource: {
  //     type: Array,
  //     default: function() {
  //       return []
  //     }
  //   },
  // },
  data() {
    return {
      // videojs options
      playerOptions: {
        height: '360',
        autoplay: false,
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // mp4
          // src: "http://vjs.zencdn.net/v/oceans.mp4",
          src: "",
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",//海报
      }
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      console.log('dynamic change options', this.player)

      // change src
      // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })

      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      this.player.muted(false)
    }, 5000)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player)
      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>

<style lang="scss" scoped>
  .video-player-box {
    height: 100% !important;
    width: 100% !important;
  }

  //底部进度条

  .bottomCtrl {
    line-height: 60px;
    height: 60px;
    overflow: visible;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(45, 45, 45, .92);
    width: 100%;
    padding: 0 50px;
    color: #fff;
    z-index: 999999999999999;
    .icon{

      font-size: 16px;
      line-height: 60px;
      cursor: pointer;
    }

    .icon+.icon {
      margin-left: 20px;
    }

  }

  .custom-video-outer-box {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .progress-slider {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 18px;
    line-height: 18px;
    .ivu-slider-wrap{

      margin: 0 !important;
      border-radius: 0 !important;
    }

    .ivu-slider-button-wrap {
      line-height: normal !important;
    }

    .ivu-slider-button {
      height: 8px !important;
      width: 8px !important;
    }

  }

  .voice-box {
    .voice-slider{

      width: 100px;
      margin-left: 20px;
    }

    .ivu-slider-wrap {
      margin: 27px 0 !important;
    }



  }

  .time {
    margin-left: 25px;
  }

  .full-screen {
    margin-left: 25px;
    line-height: 60px;
  }

  .ivu-progress-outer {
    padding: 0 10px !important;
  }

  .vjs-big-play-button {
    height: 80px !important;
    width: 80px !important;
    line-height: 80px !important;
    text-align: center;
    background: rgba(0, 0, 0, 0.8) !important;
    border-radius: 50% !important;
    top: 50% !important;
    left: 50% !important;
    margin-left: -40px !important;
    margin-top: -40px !important;
  }

  #vjs_video_3 {
    max-height: 100% !important;
    width: 100% !important;
    height: 100% !important;
  }

  .video-player-box>p {
    height: 100% !important;
    width: 100% !important;
  }

  .video-js .vjs-big-play-button {
    font-size: 5em !important;
  }

  video {
    max-height: 100% !important;
  }
</style>
