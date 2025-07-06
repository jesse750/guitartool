// 全局挂载
;(function (global) {
  const initScale = ({ translations, isEnglish }, rootElm) => {
    // 音名顺序常量（全部用降号表示）
    const noteSequence = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

    // 音阶练习功能
    const scalePracticeBtn = rootElm.querySelector('#scalePracticeBtn')
    const scaleScaleSelector = rootElm.querySelector('#scaleScaleSelector')
    const scaleStatusBar = rootElm.querySelector('#scaleStatusBar')
    const topNoteBtns = rootElm.querySelectorAll('.top-note-btn')
    const variantNoteBtns = rootElm.querySelectorAll('#variantNoteSelection .top-note-btn')
    const scaleStats = rootElm.querySelector('#scaleStats')
    const scaleCorrectCount = rootElm.querySelector('#scaleCorrectCount')
    const scaleIncorrectCount = rootElm.querySelector('#scaleIncorrectCount')

    // 获取所有音符元素
    const notes = rootElm.querySelectorAll('.note, .open-note')

    // 弦号翻译
    const stringNames = isEnglish
      ? ['String 1', 'String 2', 'String 3', 'String 4', 'String 5', 'String 6']
      : ['1弦', '2弦', '3弦', '4弦', '5弦', '6弦']

    // 定义音阶
    const scaleScales = {
      cMajor: {
        name: isEnglish ? 'C Major (A Minor)' : 'C大调（A小调）',
        root: 'C',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      },
      dMajor: {
        name: isEnglish ? 'D Major (B Minor)' : 'D大调（B小调）',
        root: 'D',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      },
      eMajor: {
        name: isEnglish ? 'E Major (C# Minor)' : 'E大调（C#小调）',
        root: 'E',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
      },
      fMajor: {
        name: isEnglish ? 'F Major (D Minor)' : 'F大调（D小调）',
        root: 'F',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
      },
      gMajor: {
        name: isEnglish ? 'G Major (E Minor)' : 'G大调（E小调）',
        root: 'G',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      },
      aMajor: {
        name: isEnglish ? 'A Major (F# Minor)' : 'A大调（F#小调）',
        root: 'A',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      },
      bMajor: {
        name: isEnglish ? 'B Major (G# Minor)' : 'B大调（G#小调）',
        root: 'B',
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        scaleSteps: [0, 2, 4, 5, 7, 9, 11],
        scaleNotes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
      },
    }

    // 12平均律所有音名（全部用降号表示）
    const allChromaticNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

    // 练习状态变量
    let scaleIsPracticing = false
    let scaleCurrentNote = null
    let scaleCorrectAnswers = 0
    let scaleIncorrectAnswers = 0
    let scaleNotes = []
    let scaleCurrentHighlightedNote = null
    let scaleCurrentScale = null
    let scaleNoteToNumber = {}

    // 创建品丝
    function createFretWires() {
      const fretWires = rootElm.querySelector('.fret-wires')
      if (fretWires) fretWires.remove()

      const newFretWires = document.createElement('div')
      newFretWires.className = 'fret-wires'
      newFretWires.style.position = 'absolute'
      newFretWires.style.top = '50px'
      newFretWires.style.left = '60px'
      newFretWires.style.right = '0'
      newFretWires.style.height = '330px'
      newFretWires.style.pointerEvents = 'none'

      // 计算每个品格的宽度
      const fretWidth = 100 / 13

      // 创建品丝
      for (let i = 1; i < 13; i++) {
        const fretWire = document.createElement('div')
        fretWire.className = 'fret-wire'
        fretWire.style.left = `${fretWidth * i}%`
        newFretWires.appendChild(fretWire)
      }

      rootElm.querySelector('.fretboard').appendChild(newFretWires)
    }

    // 为指板创建品丝
    createFretWires()

    // 更新状态栏
    function updateScaleStatusBar(text, type = 'info') {
      scaleStatusBar.innerHTML = `<p>${text}</p>`
      scaleStatusBar.className = 'status-bar'

      switch (type) {
        case 'error':
          scaleStatusBar.classList.add('error')
          break
        case 'success':
          scaleStatusBar.classList.add('highlight')
          break
        case 'info':
          scaleStatusBar.classList.add('info')
          break
      }
    }

    // 清除所有音阶高亮
    function clearScaleHighlight() {
      notes.forEach((note) => {
        note.classList.remove(
          'scale-note',
          'root-note',
          'inactive',
          'selected',
          'pulse',
        )
      })
      scaleCurrentHighlightedNote = null
    }

    // 更新指板音符为数字唱名
    function updateFretboardNotes(scaleKey) {
      const scale = scaleScales[scaleKey]
      if (!scale) return

      scaleCurrentScale = scale
      const scaleRoot = scale.root

      // 获取所有弦的开放音
      const stringNotes = scale.tuning

      // 更新每根弦的音符
      rootElm.querySelectorAll('.fret-row').forEach((row, rowIndex) => {
        const openNote = row.querySelector('.open-note')
        const absoluteNote = stringNotes[rowIndex]
        // 计算唱名数字
        const scaleIndex = scale.scaleNotes.indexOf(absoluteNote)
        const scaleNumber = scaleIndex !== -1 ? (scaleIndex + 1).toString() : ''
        openNote.dataset.absoluteNote = absoluteNote
        openNote.dataset.note = scaleNumber
        openNote.textContent = scaleIsPracticing ? '' : scaleNumber
        // 更新弦号
        const stringLabel = row.querySelector('.string-label')
        if (stringLabel) stringLabel.textContent = stringNames[rowIndex]
        // 更新每品的音符
        const noteContainers = row.querySelectorAll('.note-container')
        noteContainers.forEach((container, fretIndex) => {
          if (fretIndex === 0) return

          const note = container.querySelector('.note')
          if (note) {
            const currentNoteIndex = noteSequence.indexOf(stringNotes[rowIndex])
            const absoluteNoteName =
              noteSequence[(currentNoteIndex + fretIndex) % 12]

            // 计算唱名数字
            const scaleIndex = scale.scaleNotes.indexOf(absoluteNoteName)
            const scaleNumber =
              scaleIndex !== -1 ? (scaleIndex + 1).toString() : ''

            note.dataset.absoluteNote = absoluteNoteName
            note.dataset.note = scaleNumber
            note.textContent = scaleIsPracticing ? '' : scaleNumber
          }
        })
      })
    }

    // 高亮随机音符
    function highlightRandomNote() {
      if (!scaleIsPracticing) return

      clearScaleHighlight()

      // 清空所有音符的文本内容
      notes.forEach((note) => {
        note.textContent = ''
      })

      // 从当前调式中随机选择一个音符
      const randomIndex = Math.floor(Math.random() * scaleNotes.length)
      const targetNote = scaleNotes[randomIndex]

      // 找到所有匹配的音符
      const matchingNotes = Array.from(notes).filter((note) => {
        const noteName = note.dataset.absoluteNote
        return noteName === targetNote
      })

      if (matchingNotes.length > 0) {
        // 随机选择一个匹配的音符
        const randomNoteIndex = Math.floor(Math.random() * matchingNotes.length)
        const noteToHighlight = matchingNotes[randomNoteIndex]

        // 高亮显示
        noteToHighlight.classList.add('selected', 'pulse')
        scaleCurrentHighlightedNote = noteToHighlight
        scaleCurrentNote = targetNote

        // 获取音符位置信息
        const stringLabel = noteToHighlight
          .closest('.fret-row')
          .querySelector('.string-label').textContent
        let positionInfo = ''

        if (noteToHighlight.classList.contains('open-note')) {
          positionInfo = `${stringLabel} ${isEnglish ? 'Open String' : '空弦音'}`
        } else {
          const noteContainer = noteToHighlight.parentElement
          const fretContainers = noteContainer.parentElement.children
          const fretIndex = Array.from(fretContainers).indexOf(noteContainer)
          const fretNum =
            rootElm.querySelector('.fretboard-header').children[fretIndex]
              .textContent
          positionInfo = isEnglish
            ? `${stringLabel} Fret ${fretNum}`
            : `${stringLabel} ${fretNum}品`
        }

        updateScaleStatusBar(
          `${translations['scale-question'][isEnglish ? 1 : 0]}${positionInfo}`,
          'info',
        )
      } else {
        // 如果没有找到匹配的音符，稍后重试
        setTimeout(highlightRandomNote, 100)
      }
    }

    // 开始/结束音阶练习
    function toggleScalePractice() {
      if (!scaleIsPracticing) {
        const scaleKey = scaleScaleSelector.value
        const scale = scaleScales[scaleKey]

        if (!scale) {
          updateScaleStatusBar(
            translations['scale-status'][isEnglish ? 1 : 0],
            'error',
          )
          return
        }

        scaleIsPracticing = true
        // 让练习题包含所有12个半音（含升降号）
        scaleNotes = allChromaticNotes

        // 构建唱名到数字的映射（全部用b记法）
        scaleNoteToNumber = {
          'C': '1', 'Db': 'b2', 'D': '2', 'Eb': 'b3', 'E': '3',
          'F': '4', 'Gb': 'b5', 'G': '5', 'Ab': 'b6', 'A': '6', 'Bb': 'b7', 'B': '7'
        }

        scaleCorrectAnswers = 0
        scaleIncorrectAnswers = 0

        // 更新UI
        scalePracticeBtn.innerHTML = `<i class="fas fa-stop"></i> ${
          translations['end-practice'][isEnglish ? 1 : 0]
        }`
        scalePracticeBtn.className = 'btn danger'
        scaleScaleSelector.disabled = true
        scaleStats.style.display = 'flex'
        scaleCorrectCount.textContent = '0'
        scaleIncorrectCount.textContent = '0'

        updateScaleStatusBar(
          `${translations['scale-practice-started'][isEnglish ? 1 : 0]}${
            scale.name
          } - ${isEnglish ? 'Identify highlighted notes' : '请识别高亮的音符'}`,
          'success',
        )

        // 隐藏指板上的所有数字
        updateFretboardNotes(scaleKey)

        // 高亮第一个随机音符
        highlightRandomNote()
      } else {
        scaleIsPracticing = false
        clearScaleHighlight()
        scaleCurrentNote = null

        // 更新UI
        scalePracticeBtn.innerHTML = `<i class="fas fa-play"></i> ${
          translations['start-practice'][isEnglish ? 1 : 0]
        }`
        scalePracticeBtn.className = 'btn primary'
        scaleScaleSelector.disabled = false

        // 清除所有音名按钮的状态
        topNoteBtns.forEach((btn) => {
          btn.classList.remove('active', 'error')
        })
        variantNoteBtns.forEach((btn) => {
          btn.classList.remove('active', 'error')
        })

        // 恢复显示指板上的唱名数字
        updateFretboardNotes(scaleScaleSelector.value)

        updateScaleStatusBar(
          `${
            translations['scale-practice-ended'][isEnglish ? 1 : 0]
          }${scaleCorrectAnswers}, ${
            translations['incorrect'][isEnglish ? 1 : 0]
          }: ${scaleIncorrectAnswers}`,
          'info',
        )

        // 3秒后隐藏统计
        setTimeout(() => {
          scaleStats.style.display = 'none'
          updateScaleStatusBar(translations['scale-status'][isEnglish ? 1 : 0])
        }, 3000)
      }
    }

    // 检查音阶答案
    function checkScaleAnswer(selectedNumber) {
      if (
        !scaleIsPracticing ||
        !scaleCurrentNote ||
        !scaleCurrentHighlightedNote
      )
        return

      // 找到点击的音名按钮
      const clickedBtn = Array.from([...topNoteBtns, ...variantNoteBtns]).find(
        (btn) => btn.dataset.note === selectedNumber,
      )

      // 获取正确的唱名数字
      let correctNumber = scaleNoteToNumber[scaleCurrentNote]
      // 支持降音映射
      const flatMap = { 'b2': '2', 'b3': '3', 'b5': '5', 'b6': '6', 'b7': '7' }
      if (selectedNumber in flatMap && correctNumber === flatMap[selectedNumber]) {
        // 只有当目标音实际是降音时才判定正确
        if (scaleCurrentNote.includes('b')) {
          correctNumber = selectedNumber
        }
      }

      if (selectedNumber === correctNumber) {
        // 回答正确
        scaleCorrectAnswers++
        scaleCorrectCount.textContent = scaleCorrectAnswers
        clickedBtn.classList.add('active')

        // 显示正确的唱名数字
        scaleCurrentHighlightedNote.textContent = correctNumber

        updateScaleStatusBar(
          `${translations['scale-success'][isEnglish ? 1 : 0]}${correctNumber}`,
          'success',
        )
      } else {
        // 回答错误
        scaleIncorrectAnswers++
        scaleIncorrectCount.textContent = scaleIncorrectAnswers
        clickedBtn.classList.add('error')

        // 显示正确的唱名数字
        scaleCurrentHighlightedNote.textContent = correctNumber

        // 找到正确的按钮并高亮
        const correctBtn = Array.from([...topNoteBtns, ...variantNoteBtns]).find(
          (btn) => btn.dataset.note === correctNumber,
        )
        if (correctBtn) {
          correctBtn.classList.add('active')
        }

        updateScaleStatusBar(
          `${translations['scale-error'][isEnglish ? 1 : 0]}${correctNumber}`,
          'error',
        )
      }

      // 1秒后显示下一个问题
      setTimeout(() => {
        // 清除所有音名按钮的状态
        [...topNoteBtns, ...variantNoteBtns].forEach((btn) => {
          btn.classList.remove('active', 'error')
        })

        // 显示下一个随机音符
        if (scaleIsPracticing) {
          highlightRandomNote()
        }
      }, 1000)
    }

    // 音阶练习初始化
    const changeHandler = function () {
      updateFretboardNotes(this.value)
    }

    const clickHandler = function () {
      if (scaleIsPracticing && scaleCurrentNote) {
        checkScaleAnswer(this.dataset.note)
      }
    }

    scaleScaleSelector.addEventListener('change', changeHandler)

    scalePracticeBtn.addEventListener('click', toggleScalePractice)

    // 音名按钮点击事件
    topNoteBtns.forEach((btn) => {
      btn.addEventListener('click', clickHandler)
    })
    variantNoteBtns.forEach((btn) => {
      btn.addEventListener('click', clickHandler)
    })

    // 初始状态
    updateScaleStatusBar(translations['scale-status'][isEnglish ? 1 : 0])
    updateFretboardNotes(scaleScaleSelector.value)

    // 销毁
    function onDestroy() {
      if (scaleIsPracticing) toggleScalePractice()
      scaleScaleSelector.removeEventListener('change', changeHandler)

      scalePracticeBtn.removeEventListener('click', toggleScalePractice)

      // 音名按钮点击事件
      topNoteBtns.forEach((btn) => {
        btn.removeEventListener('click', clickHandler)
      })
      variantNoteBtns.forEach((btn) => {
        btn.removeEventListener('click', clickHandler)
      })
    }

    return onDestroy
  }

  global.initScale = initScale
})(window)
