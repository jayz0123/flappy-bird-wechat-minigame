import Animation from '../base/animation'
import DataBus from '../databus'
import Music from '../runtime/music'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置

const BIRD_IMG_PREFIX = 'images/bird'
const BIRD_WIDTH = 55
const BIRD_HEIGHT = 55
const SPEED_MAX = 16.5
var BIRD_IMG_TYPE = ''

function rnd(start, end) 
{
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Bird extends Animation
{
  constructor(music) 
  {
    let color = rnd(0, 3)

    switch(color)
    {
      case 0:
      BIRD_IMG_TYPE = BIRD_IMG_PREFIX + '0_'
      break;
      case 1:
      BIRD_IMG_TYPE = BIRD_IMG_PREFIX + '1_'
      break;
      case 2:
      BIRD_IMG_TYPE = BIRD_IMG_PREFIX + '2_'
      break;
    }

    let BIRD_IMG_SRC = BIRD_IMG_TYPE + '0.png'

    super(BIRD_IMG_SRC, BIRD_WIDTH, BIRD_HEIGHT)

    // 鸟一开始处于偏左侧居中位置
    this.x = screenWidth / 3.5 - this.width / 2;
    this.y = screenHeight / 2 - this.height / 2;
    this.speed = 0;
    this.music = music

    // 初始化事件监听
    this.initEvent();

    this.initFlyAnimation();
    this.playAnimation()
  }

  // 拍翅膀动画
  initFlyAnimation()
  {
    let frames = [];

    const FLY_IMG_PREFIX = BIRD_IMG_TYPE;
    const FLY_FRAME_COUNT = 4;

    for (let i = 0; i < FLY_FRAME_COUNT; i++) 
    {
      frames.push(FLY_IMG_PREFIX + i + '.png')
    }

    this.initFrames(frames)
  }
  
  // 每帧更新鸟的位置
  update()
  {
    this.speed += 0.5

    if (this.speed >= SPEED_MAX) 
    {
      this.speed = SPEED_MAX
    }

    if (this.y <= -20)
      this.y = -20

    this.y += this.speed
  }

  isTouchFloor()
  {
    let that = this
    if (this.y > screenHeight - 75 - this.height)
    {
      that.music.playCollide()
      return true
    }
  }

  fall()
  {
    canvas.removeEventListener('touchstart', this.tap)

    let that = this
    let falling = true

    this.speed += 0.8

    if (this.speed >= SPEED_MAX) 
    {
      this.speed = SPEED_MAX;
    }

    if(this.y > screenHeight - 75 - this.height)
    {
      this.y = screenHeight - 75 - this.height
      falling = false
    }

    that.music.playFall(falling)

    this.y += this.speed
  }

  initEvent() 
  {
    this.tap = this.tapToFly.bind(this)
    canvas.addEventListener('touchstart', this.tap)
  }

  tapToFly(e)
  {
    let that = this
    e.preventDefault()

    this.speed = -11; 

    that.music.playFly()
  }
}