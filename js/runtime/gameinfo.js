const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas        = new Image()
let restart      = new Image()
let rank         = new Image()
let readyText    = new Image()
let tutor        = new Image()
let gameoverText = new Image()

atlas.src        = 'images/score_panel.png'
restart.src      = 'images/button_play.png'
rank.src         = 'images/button_score.png'
readyText.src    = 'images/text_ready.png'
tutor.src        = 'images/tutorial.png'
gameoverText.src = 'images/text_game_over.png'

// 初始化奖牌位置
let medalImg = []
const MEDAL_IMG_PREFIX = 'images/medals_'
const MEDAL_COUNT = 4
for (let i = 0; i < MEDAL_COUNT; i++) 
{
  medalImg[i] = new Image()
  medalImg[i].src = MEDAL_IMG_PREFIX + i + '.png'
}

// 初始化分数数字图片的位置
let scoreImg = []
const SCORE_IMG_PREFIX = 'images/score_'
const SCORE_COUNT = 10
for (let i = 0; i < SCORE_COUNT; i++)
{
  scoreImg[i] = new Image()
  scoreImg[i].src = SCORE_IMG_PREFIX + i + '.png'
}

export default class GameInfo 
{
  constructor()
  {
    this.scoreVisible = false
    this.reBtnVisible = true
    this.rnkBtnVisible = true
  }

  renderGameStart(ctx)
  {
    ctx.drawImage(
      readyText,
      screenWidth / 2 - 98 * 1.4,
      screenHeight / 2 - 63 * 1.4 - 60,
      196 * 1.4,
      62 * 1.4
    )

    ctx.drawImage(
      tutor,
      screenWidth / 2 - 57 * 1.4,
      screenHeight / 2 + 40,
      114 * 1.4,
      98 * 1.4
    )
  }

  renderGameScore(ctx, score) 
  {
    if(score < 10)
    {
      ctx.drawImage(
        scoreImg[score],
        screenWidth / 2 - 12 * 1.4,
        60,
        24 * 1.4,
        44 * 1.4
      )
    }

    else if(score >= 10 && score < 100)
    {
      ctx.drawImage(
        scoreImg[parseInt(score / 10)],
        screenWidth / 2 - 24 * 1.4,
        60,
        24 * 1.4,
        44 * 1.4
      )

      ctx.drawImage(
        scoreImg[score % 10],
        screenWidth / 2,
        60,
        24 * 1.4,
        44 * 1.4
      )
    }

    else if(score >= 100)
    {
      ctx.drawImage(
        scoreImg[parseInt(score / 100)],
        screenWidth / 2 - 36 * 1.4,
        60,
        24 * 1.4,
        44 * 1.4
      )

      ctx.drawImage(
        scoreImg[parseInt(score % 100 / 10)],
        screenWidth / 2 - 12 * 1.4,
        60,
        24 * 1.4,
        44 * 1.4
      )

      ctx.drawImage(
        scoreImg[score % 100 % 10],
        screenWidth / 2 + 12 * 1.4,
        60,
        24 * 1.4,
        44 * 1.4
      )
    }
  }

  renderGameOver(ctx, score) 
  {
    // game over text
    ctx.drawImage(
      gameoverText,
      screenWidth / 2 - 102 * 1.4,
      screenHeight / 2 - 63 * 1.4 - 100 * 1.4,
      204 * 1.4,
      54 * 1.4
    )
    // atlas
    ctx.drawImage(
      atlas,
      screenWidth / 2 - 119 * 1.4,
      screenHeight / 2 - 63 * 1.4,
      238 * 1.4,
      126 * 1.4
    )

    // medals
    if(score >= 15 && score < 45)
    {
      ctx.drawImage(
        medalImg[3],
        screenWidth / 2 - 120,
        screenHeight / 2 - 26,
        44 * 1.4,
        44 * 1.4
      )
    }
    else if(score >= 45 && score < 75)
    {
      ctx.drawImage(
        medalImg[2],
        screenWidth / 2 - 120,
        screenHeight / 2 - 26,
        44 * 1.4,
        44 * 1.4
      )
    }
    else if (score >= 75 && score < 105)
    {
      ctx.drawImage(
        medalImg[1],
        screenWidth / 2 - 120,
        screenHeight / 2 - 26,
        44 * 1.4,
        44 * 1.4
      )
    }
    else if (score >= 105)
    {
      ctx.drawImage(
        medalImg[0],
        screenWidth / 2 - 120,
        screenHeight / 2 - 26,
        44 * 1.4,
        44 * 1.4
      )
    }
    
    // score
    if (score < 10) {
      ctx.drawImage(
        scoreImg[score],
        screenWidth / 2 + 110,
        screenHeight / 2 - 39,
        16,
        30
      )
    }

    else if (score >= 10 && score < 100) {
      ctx.drawImage(
        scoreImg[parseInt(score / 10)],
        screenWidth / 2 + 94,
        screenHeight / 2 - 39,
        16,
        30
      )

      ctx.drawImage(
        scoreImg[score % 10],
        screenWidth / 2 + 110,
        screenHeight / 2 - 39,
        16,
        30
      )
    }

    else if (score >= 100) {
      ctx.drawImage(
        scoreImg[parseInt(score / 100)],
        screenWidth / 2 + 78,
        screenHeight / 2 - 39,
        16,
        30
      )

      ctx.drawImage(
        scoreImg[parseInt(score % 100 / 10)],
        screenWidth / 2 + 94,
        screenHeight / 2 - 39,
        16,
        30
      )

      ctx.drawImage(
        scoreImg[score % 100 % 10],
        screenWidth / 2 + 110,
        screenHeight / 2 - 39,
        16,
        30
      )
    }
    // restart botton
    if (this.reBtnVisible)
    {
      ctx.drawImage(
        restart,
        screenWidth / 2 - 119 * 1.3 + 10,
        screenHeight / 2 - 63 * 1.3 + 200,
        116,
        70
      )
    }
    // rank botton 
    if (this.rnkBtnVisible)
    {
      ctx.drawImage(
        rank,
        screenWidth / 2 + 119 * 1.3 - 116 - 10,
        screenHeight / 2 - 63 * 1.3 + 200,
        116,
        70
      )
    }

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = 
    {
      startX: screenWidth / 2 - 119 * 1.3 + 10,
      startY: screenHeight / 2 - 63 * 1.3 + 200,
      endX: screenWidth / 2 - 119 * 1.3 + 10 + 116,
      endY: screenHeight / 2 - 63 * 1.3 + 200 + 70
    }
  }
}

