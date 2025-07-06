// 全局挂载
;(function (global) {
  // 和弦练习
  const initChord = function ({ translations, isEnglish }, rootElm) {
    const chordPracticeBtn = rootElm.querySelector('#chordPracticeBtn')
    const chordScaleSelector = rootElm.querySelector('#chordScaleSelector')
    const chordStatusBar = rootElm.querySelector('#chordStatusBar')
    const chordStats = rootElm.querySelector('#chordStats')
    const chordCorrectCount = rootElm.querySelector('#chordCorrectCount')
    const chordIncorrectCount = rootElm.querySelector('#chordIncorrectCount')
    const chordsReference = rootElm.querySelector('#chordsReference')

    // 定义调式及其和弦
    const scales = {
      cMajor: {
        name: isEnglish ? 'C Major (A Minor)' : 'C大调（A小调）',
        chords: [
          { level: 1, name: 'C', type: isEnglish ? 'Major' : '大三和弦' },
          { level: 2, name: 'Dm', type: isEnglish ? 'Minor' : '小三和弦' },
          { level: 3, name: 'Em', type: isEnglish ? 'Minor' : '小三和弦' },
          { level: 4, name: 'F', type: isEnglish ? 'Major' : '大三和弦' },
          { level: 5, name: 'G', type: isEnglish ? 'Major' : '大三和弦' },
          { level: 6, name: 'Am', type: isEnglish ? 'Minor' : '小三和弦' },
          {
            level: 7,
            name: 'Bdim',
            type: isEnglish ? 'Diminished' : '减三和弦',
          },
        ],
      },
      dMajor: {
        name: 'D大调（B小调）',
        chords: [
          { level: 1, name: 'D', type: '大三和弦' },
          { level: 2, name: 'Em', type: '小三和弦' },
          { level: 3, name: 'F#m', type: '小三和弦' },
          { level: 4, name: 'G', type: '大三和弦' },
          { level: 5, name: 'A', type: '大三和弦' },
          { level: 6, name: 'Bm', type: '小三和弦' },
          { level: 7, name: 'C#dim', type: '减三和弦' },
        ],
      },
      eMajor: {
        name: 'E大调（C#小调）',
        chords: [
          { level: 1, name: 'E', type: '大三和弦' },
          { level: 2, name: 'F#m', type: '小三和弦' },
          { level: 3, name: 'G#m', type: '小三和弦' },
          { level: 4, name: 'A', type: '大三和弦' },
          { level: 5, name: 'B', type: '大三和弦' },
          { level: 6, name: 'C#m', type: '小三和弦' },
          { level: 7, name: 'D#dim', type: '减三和弦' },
        ],
      },
      fMajor: {
        name: 'F大调（D小调）',
        chords: [
          { level: 1, name: 'F', type: '大三和弦' },
          { level: 2, name: 'Gm', type: '小三和弦' },
          { level: 3, name: 'Am', type: '小三和弦' },
          { level: 4, name: 'Bb', type: '大三和弦' },
          { level: 5, name: 'C', type: '大三和弦' },
          { level: 6, name: 'Dm', type: '小三和弦' },
          { level: 7, name: 'Edim', type: '减三和弦' },
        ],
      },
      gMajor: {
        name: 'G大调（E小调）',
        chords: [
          { level: 1, name: 'G', type: '大三和弦' },
          { level: 2, name: 'Am', type: '小三和弦' },
          { level: 3, name: 'Bm', type: '小三和弦' },
          { level: 4, name: 'C', type: '大三和弦' },
          { level: 5, name: 'D', type: '大三和弦' },
          { level: 6, name: 'Em', type: '小三和弦' },
          { level: 7, name: 'F#dim', type: '减三和弦' },
        ],
      },
      aMajor: {
        name: 'A大调（F#小调）',
        chords: [
          { level: 1, name: 'A', type: '大三和弦' },
          { level: 2, name: 'Bm', type: '小三和弦' },
          { level: 3, name: 'C#m', type: '小三和弦' },
          { level: 4, name: 'D', type: '大三和弦' },
          { level: 5, name: 'E', type: '大三和弦' },
          { level: 6, name: 'F#m', type: '小三和弦' },
          { level: 7, name: 'G#dim', type: '减三和弦' },
        ],
      },
      bMajor: {
        name: 'B大调（G#小调）',
        chords: [
          { level: 1, name: 'B', type: '大三和弦' },
          { level: 2, name: 'C#m', type: '小三和弦' },
          { level: 3, name: 'D#m', type: '小三和弦' },
          { level: 4, name: 'E', type: '大三和弦' },
          { level: 5, name: 'F#', type: '大三和弦' },
          { level: 6, name: 'G#m', type: '小三和弦' },
          { level: 7, name: 'A#dim', type: '减三和弦' },
        ],
      },
    }

    // 级别到罗马数字的映射
    const romanNumerals = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
    }

    // 练习状态变量
    let chordIsPracticing = false
    let chordCurrentLevel = null
    let chordCorrectAnswers = 0
    let chordIncorrectAnswers = 0
    let chordCurrentScale = null

    // 更新和弦参考区
    function updateChordsReference(scaleKey) {
      const scale = scales[scaleKey]
      if (!scale) return

      chordsReference.innerHTML = ''

      scale.chords.forEach((chord) => {
        const chordCard = document.createElement('div')
        chordCard.className = 'chord-card'
        chordCard.dataset.level = chord.level
        // 拼接和弦名称
        let chordTypeKey = ''
        if (chord.type === '大三和弦' || chord.type === 'Major') chordTypeKey = 'chord-type-major'
        else if (chord.type === '小三和弦' || chord.type === 'Minor') chordTypeKey = 'chord-type-minor'
        else if (chord.type === '减三和弦' || chord.type === 'Diminished') chordTypeKey = 'chord-type-diminished'
        const chordTypeText = translations[chordTypeKey][isEnglish ? 1 : 0]
        const chordNameText = isEnglish ? `${chord.name} ${chordTypeText} Chord` : `${chord.name}${chordTypeText}`
        chordCard.innerHTML = `
                        <div class="chord-level">${
                          romanNumerals[chord.level]
                        }</div>
                        <div class="chord-name">${chordNameText}</div>
                        <div class="chord-type">${chordTypeText}</div>
                    `
        chordsReference.appendChild(chordCard)
      })
    }

    // 更新状态栏
    function updateChordStatusBar(text, type = 'info') {
      chordStatusBar.innerHTML = `<p>${text}</p>`
      chordStatusBar.className = 'status-bar'

      switch (type) {
        case 'error':
          chordStatusBar.classList.add('error')
          break
        case 'success':
          chordStatusBar.classList.add('highlight')
          break
        case 'info':
          chordStatusBar.classList.add('info')
          break
      }
    }

    // 打乱和弦卡片顺序
    function shuffleChordCards() {
      const cards = Array.from(chordsReference.children)

      // 洗牌算法（Fisher-Yates）
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cards[i], cards[j]] = [cards[j], cards[i]]
      }

      // 清空并重新添加打乱后的卡片
      chordsReference.innerHTML = ''
      cards.forEach((card) => chordsReference.appendChild(card))
    }

    // 高亮随机和弦级别
    function highlightRandomChord() {
      if (!chordIsPracticing) return

      // 从当前调式中随机选择一个级别
      const randomIndex = Math.floor(Math.random() * 7)
      chordCurrentLevel = randomIndex + 1

      // 打乱和弦卡片顺序
      shuffleChordCards()

      updateChordStatusBar(
        `${translations['chord-question'][isEnglish ? 1 : 0]} ${
          romanNumerals[chordCurrentLevel]
        }${translations['chord-level'][isEnglish ? 1 : 0]}`,
        'info',
      )
    }

    // 开始/结束和弦练习
    function toggleChordPractice() {
      if (!chordIsPracticing) {
        const scaleKey = chordScaleSelector.value
        const scale = scales[scaleKey]

        if (!scale) {
          updateChordStatusBar(
            translations['chord-status'][isEnglish ? 1 : 0],
            'error',
          )
          return
        }

        chordIsPracticing = true
        chordCurrentScale = scale

        // 更新和弦参考区
        updateChordsReference(scaleKey)

        // 进入练习模式
        document.body.classList.add('practice-mode')

        chordCorrectAnswers = 0
        chordIncorrectAnswers = 0

        // 更新UI
        chordPracticeBtn.innerHTML = `<i class="fas fa-stop"></i> ${
          translations['end-practice'][isEnglish ? 1 : 0]
        }`
        chordPracticeBtn.className = 'btn danger'
        chordScaleSelector.disabled = true
        chordStats.style.display = 'flex'
        chordCorrectCount.textContent = '0'
        chordIncorrectCount.textContent = '0'

        updateChordStatusBar(
          `${translations['chord-practice-started'][isEnglish ? 1 : 0]}${
            scale.name
          } - ${
            isEnglish ? 'Answer chord level questions' : '请回答和弦级别问题'
          }`,
          'success',
        )

        // 高亮第一个随机和弦级别
        highlightRandomChord()
      } else {
        chordIsPracticing = false
        chordCurrentLevel = null

        // 退出练习模式
        document.body.classList.remove('practice-mode')

        // 更新UI
        chordPracticeBtn.innerHTML = `<i class="fas fa-play"></i> ${
          translations['start-practice'][isEnglish ? 1 : 0]
        }`
        chordPracticeBtn.className = 'btn primary'
        chordScaleSelector.disabled = false
        chordStats.style.display = 'none'

        // 清除所有和弦卡片的状态
        const chordCards = document.querySelectorAll('.chord-card')
        chordCards.forEach((card) => {
          card.classList.remove('correct', 'error')
        })

        updateChordStatusBar(
          `${
            translations['chord-practice-ended'][isEnglish ? 1 : 0]
          }${chordCorrectAnswers}, ${
            translations['incorrect'][isEnglish ? 1 : 0]
          }: ${chordIncorrectAnswers}`,
          'info',
        )

        // 3秒后重置状态
        setTimeout(() => {
          updateChordStatusBar(translations['chord-status'][isEnglish ? 1 : 0])
        }, 3000)
      }
    }

    // 检查和弦答案
    function checkChordAnswer(selectedLevel) {
      if (!chordIsPracticing || !chordCurrentLevel) return

      // 找到点击的和弦卡片
      const clickedCard = Array.from(
        document.querySelectorAll('.chord-card'),
      ).find((card) => parseInt(card.dataset.level) === selectedLevel)

      // 获取所有和弦卡片
      const allCards = document.querySelectorAll('.chord-card')

      // 清除所有卡片的状态
      allCards.forEach((card) => {
        card.classList.remove('correct', 'error')
      })

      if (selectedLevel === chordCurrentLevel) {
        // 回答正确
        chordCorrectAnswers++
        chordCorrectCount.textContent = chordCorrectAnswers
        clickedCard.classList.add('correct')

        // 获取正确的和弦名称
        const correctChord = chordCurrentScale.chords.find(
          (chord) => chord.level === chordCurrentLevel,
        )

        updateChordStatusBar(
          `${translations['chord-success'][isEnglish ? 1 : 0]}${
            romanNumerals[chordCurrentLevel]
          }${translations['chord-level'][isEnglish ? 1 : 0]} ${
            correctChord.name
          }`,
          'success',
        )
      } else {
        // 回答错误
        chordIncorrectAnswers++
        chordIncorrectCount.textContent = chordIncorrectAnswers
        clickedCard.classList.add('error')

        // 找到正确的卡片并高亮
        const correctCard = Array.from(allCards).find(
          (card) => parseInt(card.dataset.level) === chordCurrentLevel,
        )
        if (correctCard) {
          correctCard.classList.add('correct')
        }

        // 获取正确的和弦名称
        const correctChord = chordCurrentScale.chords.find(
          (chord) => chord.level === chordCurrentLevel,
        )

        updateChordStatusBar(
          `${translations['chord-error'][isEnglish ? 1 : 0]}${
            romanNumerals[chordCurrentLevel]
          }${translations['chord-level'][isEnglish ? 1 : 0]} (${
            correctChord.name
          })`,
          'error',
        )
      }

      // 1秒后显示下一个问题
      setTimeout(() => {
        // 清除所有卡片的状态
        allCards.forEach((card) => {
          card.classList.remove('correct', 'error')
        })

        // 显示下一个随机问题
        if (chordIsPracticing) {
          highlightRandomChord()
        }
      }, 1000)
    }

    const clickHandler = function (event) {
      if (!chordIsPracticing || !chordCurrentLevel) return

      const chordCard = event.target.closest('.chord-card')
      if (chordCard) {
        const selectedLevel = parseInt(chordCard.dataset.level)
        checkChordAnswer(selectedLevel)
      }
    }
    const changeHandler = function () {
      updateChordsReference(this.value)
    }

    // 和弦卡片点击事件
    document.addEventListener('click', clickHandler)

    // 和弦练习初始化
    chordScaleSelector.addEventListener('change', changeHandler)

    chordPracticeBtn.addEventListener('click', toggleChordPractice)

    // 初始状态
    updateChordStatusBar(translations['chord-status'][isEnglish ? 1 : 0])
    updateChordsReference(chordScaleSelector.value)

    // 销毁
    function onDestroy() {
      if (chordIsPracticing) toggleChordPractice()

      document.removeEventListener('click', clickHandler)

      // 和弦练习初始化
      chordScaleSelector.removeEventListener('change', changeHandler)

      chordPracticeBtn.removeEventListener('click', toggleChordPractice)
    }

    return onDestroy
  }

  global.initChord = initChord
})(window)
