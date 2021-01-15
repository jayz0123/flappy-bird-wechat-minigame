import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Bird from './bird/bird'
import Land from './obstacle/land'
import Pipe from './obstacle/pipe'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.land = new Land(ctx);
    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()
    this.bird = new Bird(this.music)

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  
  /**
   * 随着帧数变化的管道生成逻辑
   * 帧数取模定义成生成的频率
   */
  pipeGenerate() 
  {
    if (databus.frame % 80 === 0) 
    {
      let pipe = databus.pool.getItemByClass('pipe', Pipe)
      pipe.init(3.5)
      databus.pipes.push(pipe)
    }
  }
  // 全局碰撞检测
  collisionDetection() 
  {
    let that = this

    databus.pipes.forEach((pipe) => {
      if (pipe.isCollideWith(this.bird)) 
      {
        that.music.playCollide()
        // setTimeout(() => {that.music.playFall()}, 220)

        databus.gameOver = true
      }
    })

    if(this.bird.isTouchFloor())
      databus.gameOver = true
  }

  // 触摸屏幕以开始游戏
  tapToStart(e)
  {
    e.preventDefault()

    databus.gameStart = true
    this.gameinfo.scoreVisible = true
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) 
  {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      {
        this.music.playButton()
        this.restart()
      }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() 
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.pipes.forEach((pipe) => {
      pipe.drawToCanvas(ctx)
    })

    this.land.render(ctx)

    this.bird.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    if(!databus.gameStart)
    {
      this.gameinfo.renderGameStart(ctx)

      this.tap = this.tapToStart.bind(this)
      canvas.addEventListener('touchstart', this.tap)
    }

    // 游戏结束停止帧循环
    if (databus.gameOver) 
    {
      canvas.removeEventListener('touchstart', this.tap)

      this.gameinfo.scoreVisible = false
      this.gameinfo.renderGameOver(ctx, databus.score)
      
      if (!this.hasEventBind) 
      {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }

    if (this.gameinfo.scoreVisible) 
    {
      this.gameinfo.renderGameScore(ctx, databus.score)
    }
  }

  // 游戏逻辑更新主函数
  update() 
  {
    if (databus.gameOver) 
    { 
      this.bird.fall()
      return
    }

    this.bg.update()
    this.land.update()

    if (databus.gameStart)
    {
      this.bird.update()

      databus.pipes.forEach((pipe) => 
      {
        pipe.update(this.music)
      })

      this.pipeGenerate()

      this.collisionDetection()
    }
  }

  // 实现游戏帧循环
  loop() 
  {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
