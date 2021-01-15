let instance

function rnd(start, end) 
{
  return Math.floor(Math.random() * (end - start) + start)
}
/**
 * 统一的音效管理器
 */

export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    let SUFFIX = rnd(1, 12)

    this.bgmAudio = new Audio()
    this.bgmAudio.volume = 0.5
    this.bgmAudio.loop = true
    // this.bgmAudio.src  = 'audio/bgm' + SUFFIX + '.mp3'
    this.bgmAudio.src = 'audio/theme.mp3'

    this.flyAudio     = new Audio()
    this.flyAudio.src = 'audio/fly.mp3'

    this.collideAudio = new Audio()
    this.collideAudio.src = 'audio/collide.mp3'

    this.fallAudio = new Audio()
    this.fallAudio.src = 'audio/fall.mp3'

    this.scoreAudio = new Audio()
    this.scoreAudio.src = 'audio/score.mp3'

    this.buttonAudio = new Audio()
    this.buttonAudio.src = 'audio/button.mp3'

    this.playBgm()
  }

  playBgm() 
  {
    this.bgmAudio.play()
  }

  playFly() 
  {
    this.flyAudio.currentTime = 0
    this.flyAudio.play()
  }

  playCollide() 
  {
    this.collideAudio.play()
  }

  playFall(falling) 
  {
    if (!falling)
      return

    this.fallAudio.play()
  }

  playScore() 
  {
    this.scoreAudio.currentTime = 0
    this.scoreAudio.play()
  }

  playButton() 
  {
    this.buttonAudio.currentTime = 0
    this.buttonAudio.play()
  }
}
