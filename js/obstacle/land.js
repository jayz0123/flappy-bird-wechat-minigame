import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const LAND_IMG_SRC = 'images/land.png'
const LAND_WIDTH = 1344
const LAND_HEIGHT = 2688
const LAND_POS = screenHeight - 80

export default class Land extends Sprite 
{
  constructor(ctx) 
  {
    super(LAND_IMG_SRC, LAND_WIDTH, LAND_HEIGHT, 0, LAND_POS)

    this.pos = LAND_POS
   
    this.render(ctx)
    
    this.right = screenWidth
  }

  update() 
  {
    this.right -= 4

    if (this.right <= 0)
      this.right = screenWidth
  }

  render(ctx) 
  {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.right,
      this.pos,
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
      this.pos,
      screenWidth,
      screenHeight
    )
  }
}