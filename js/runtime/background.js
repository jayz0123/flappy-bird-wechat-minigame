import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_PREFIX = 'images/bg_'
const BG_WIDTH     = 1152
const BG_HEIGHT    = 1850

function rnd(start, end) 
{
  return Math.floor(Math.random() * (end - start) + start)
}

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite 
{
  constructor(ctx) 
  {
    var BG_IMG_SRC = ''

    let c = rnd(0, 4)

    if (!!c)
      BG_IMG_SRC = BG_IMG_PREFIX + 'day.png'
    else
      BG_IMG_SRC = BG_IMG_PREFIX + 'night.png'

    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.render(ctx)

    this.right = screenWidth
  }

  update() 
  {
    this.right -= 1

    if ( this.right <= 0 )
      this.right = screenWidth
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) 
  {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.right,
      0,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.right,
      0,
      screenWidth,
      screenHeight
    )
  }
}
