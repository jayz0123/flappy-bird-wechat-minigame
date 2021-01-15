import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PIPE_UP_IMG_SRC = 'images/pipe_up.png'
const PIPE_DOWN_IMG_SRC = 'images/pipe_down.png'
const PIPE_WIDTH = 100
const PIPE_HEIGHT = 640
const PIPE_GAP = 160

let databus = new DataBus()

function rnd(start, end) 
{
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Pipe
{
  constructor(ctx) 
  {
    this.upImg = new Image()
    this.downImg = new Image()

    this.upImg.src = PIPE_UP_IMG_SRC
    this.downImg.src = PIPE_DOWN_IMG_SRC

    this.width = PIPE_WIDTH
    this.height = PIPE_HEIGHT
    this.gap = PIPE_GAP

    this.x = 0
    this.y = 0
    this.speed = 0

    this.visible = true
  }

// 渲染两个管道
  drawToCanvas(ctx) 
  {
    if (!this.visible)
      return

    ctx.drawImage(
      this.upImg,
      this.x,
      this.y,
      this.width,
      this.height
    )

    ctx.drawImage(
      this.downImg,
      this.x,
      this.y - this.height - this.gap,
      this.width,
      this.height
    )
  }

  init(speed) 
  {
    this.speed = speed

    this.x = screenWidth
    this.y = rnd(screenHeight - screenHeight / 4.5,
      screenHeight - 2 * screenHeight / 4)

    this.visible = true
  }

  update(music) 
  {
    this.music = music

    let that = this

    this.x -= this.speed

    if (this.x <= screenWidth / 3.5 - this.width + this.speed 
    && this.x >= screenWidth / 3.5 - this.width)
      {
        databus.score++
        that.music.playScore()
      }

    if (this.x < -this.width)
      databus.removePipe(this)
  }

  isCollideWith(sp) 
  {
    let spXRight  = sp.x + sp.width
    let spXLeft   = sp.x
    let spYDown   = sp.y + sp.height
    let spYUp     = sp.y

    if (!this.visible)
      return false

    return !!(spXRight >= this.x + 25
      && spXRight <= this.x + this.width
      && spYDown >= this.y + 25
      && spYDown <= this.y + this.height 
      || spXLeft >= this.x
      && spXLeft <= this.x + this.width - 15
      && spYDown >= this.y + 25
      && spYDown <= this.y + this.height
      || spXRight >= this.x + 25 
      && spXRight <= this.x + this.width
      && spYUp <= this.y - this.gap - 25
      && spYUp >= this.y - this.height - this.gap
      || spXLeft >= this.x
      && spXLeft <= this.x + this.width - 15
      && spYUp <= this.y - this.gap - 25
      && spYUp >= this.y - this.height - this.gap
      )
  }
}