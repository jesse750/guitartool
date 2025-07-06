// 全局挂载
;(function (global) {
  let notesHidden = false; // 提升到IIFE作用域
  let toggleHandler = null;
  let toggleNotesBtnBound = false;
  let notes = null;
  let fretNumbers = null;
  const initExample = (transSet, rootElm) => {
    const { translations } = transSet
    const toggleNotesBtn = rootElm.querySelector('#toggleNotes')
    const clearSelectionBtn = rootElm.querySelector('#clearSelection')
    const scaleSelector = rootElm.querySelector('#scaleSelector')
    // const extendedFrets = rootElm.querySelector('.extended-frets')
    const mainFretboard = rootElm.querySelector('.fretboard-content')
    const statusBar = rootElm.querySelector('#statusBar')
    const scaleLegend = rootElm.querySelector('#scaleLegend')
    // const fretToggleBtn = document.getElementById('fretToggleBtn')
    // const extendedFretToggleBtn = rootElm.querySelector('.extended-frets .fret-toggle-btn')

    // 每次初始化都重置音名显示状态
    notesHidden = false;

    // 彻底移除所有.note、.example-open-note、.fret-number的事件（防止多次绑定）
    Array.from(rootElm.querySelectorAll('.note, .example-open-note, .fret-number')).forEach(node => {
      const newNode = node.cloneNode(true);
      node.parentNode.replaceChild(newNode, node);
    });
    // 重新查找最新的DOM节点
    notes = rootElm.querySelectorAll('.note, .example-open-note');
    fretNumbers = rootElm.querySelectorAll('.fret-number');

    // 初始化按钮和音名显示（必须在notes赋值后！）
    updateNoteVisibility();
    toggleNotesBtn.innerHTML = `<i class="fas fa-eye-slash"></i> ${translations['hide-note-name'][transSet.isEnglish ? 1 : 0]}`;
    toggleNotesBtn.classList.remove('active');
    // let showingExtendedFrets = false

    // 弦号翻译
    const stringNames = transSet.isEnglish
      ? ['String 1', 'String 2', 'String 3', 'String 4', 'String 5', 'String 6']
      : ['1弦', '2弦', '3弦', '4弦', '5弦', '6弦']

    // 定义音阶（添加F大调并重新排序）
    const scales = {
      cMajor_aMinor: {
        name: transSet.isEnglish ? 'C Major (A Minor)' : 'C大调（A小调）',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        roots: ['C', 'A'],
      },
      fMajor_dMinor: {
        name: transSet.isEnglish ? 'F Major (D Minor)' : 'F大调（D小调）',
        notes: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
        roots: ['F', 'D'],
      },
      gMajor_eMinor: {
        name: transSet.isEnglish ? 'G Major (E Minor)' : 'G大调（E小调）',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
        roots: ['G', 'E'],
      },
      dMajor_bMinor: {
        name: transSet.isEnglish ? 'D Major (B Minor)' : 'D大调（B小调）',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
        roots: ['D', 'B'],
      },
      aMajor_fsMinor: {
        name: transSet.isEnglish ? 'A Major (F# Minor)' : 'A大调（F#小调）',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
        roots: ['A', 'F#'],
      },
      eMajor_csMinor: {
        name: transSet.isEnglish ? 'E Major (C# Minor)' : 'E大调（C#小调）',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
        roots: ['E', 'C#'],
      },
      bMajor_gsMinor: {
        name: transSet.isEnglish ? 'B Major (G# Minor)' : 'B大调（G#小调）',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
        roots: ['B', 'G#'],
      },
      none: {
        name: transSet.isEnglish ? 'Natural Mode' : '自然调式（母调式）',
        notes: [],
        roots: [],
      },
    }

    // 创建品丝
    function createFretWires(container, frets) {
      const fretWires = document.createElement('div')
      fretWires.className = 'fret-wires'
      fretWires.style.position = 'absolute'
      fretWires.style.top = '77.5px'
      fretWires.style.left = '60px'
      fretWires.style.right = '0'
      fretWires.style.height = '330px'
      fretWires.style.pointerEvents = 'none'

      // 计算每个品格的宽度
      const fretWidth = 100 / frets

      // 创建品丝
      for (let i = 1; i < frets; i++) {
        const fretWire = document.createElement('div')
        fretWire.className = 'fret-wire'
        fretWire.style.left = `${fretWidth * i}%`
        fretWires.appendChild(fretWire)
      }

      container.appendChild(fretWires)
    }

    // 为两个区域创建品丝
    createFretWires(mainFretboard, 13)
    // createFretWires(extendedFrets, 11)

    // 更新状态栏
    function updateStatusBar(text, highlight = false) {
      statusBar.innerHTML = `<p>${text}</p>`
      if (highlight) {
        statusBar.classList.add('highlight')
        setTimeout(() => {
          statusBar.classList.remove('highlight')
        }, 1000)
      } else {
        statusBar.classList.remove('highlight')
      }
    }

    // 清除所有音阶高亮
    function clearScaleHighlight() {
      notes.forEach((note) => {
        note.classList.remove('scale-note', 'root-note', 'inactive')
      })
    }

    // 更新音符显示状态
    function updateNoteVisibility() {
      notes.forEach((note) => {
        const noteName = note.dataset.note || note.textContent

        // 如果音符是音阶音符、根音或被选中，则显示音名
        if (
          note.classList.contains('scale-note') ||
          note.classList.contains('root-note') ||
          note.classList.contains('selected')
        ) {
          note.textContent = noteName
        } else {
          // 否则根据notesHidden状态决定是否显示
          note.textContent = notesHidden ? '' : noteName
        }
      })
    }

    // 清除所有选择
    function clearAllSelections() {
      // 清除所有音符选择
      notes.forEach((note) => {
        note.classList.remove('selected')
      })

      // 清除品位数字的选择状态
      Array.from(rootElm.querySelectorAll('.fret-number')).forEach(fretNum => {
        const newFretNum = fretNum.cloneNode(true);
        fretNum.parentNode.replaceChild(newFretNum, fretNum);
      });
      const fretNumbers = rootElm.querySelectorAll('.fret-number');

      // 更新显示状态
      updateNoteVisibility()

      // 更新状态栏
      updateStatusBar(
        translations['all-selected-cleared'][transSet.isEnglish ? 1 : 0],
        true,
      )

      // 添加动画效果
      clearSelectionBtn.classList.add('pulse')
      setTimeout(() => {
        clearSelectionBtn.classList.remove('pulse')
      }, 500)
    }

    // 显示音阶
    function showScale(scaleKey) {
      clearScaleHighlight()

      const scale = scales[scaleKey]
      if (!scale) return

      // 母调式不需要显示音阶
      if (scaleKey === 'none') {
        scaleLegend.style.display = 'none'
        updateNoteVisibility()
        updateStatusBar(
          translations['please-click-note'][transSet.isEnglish ? 1 : 0],
        )
        return
      }

      scaleLegend.style.display = 'flex'

      // 高亮显示音阶音符
      notes.forEach((note) => {
        const noteName = note.dataset.note || note.textContent

        // 检查是否是根音
        if (scale.roots.includes(noteName)) {
          note.classList.add('root-note', 'inactive')
        }
        // 检查是否是音阶音
        else if (scale.notes.includes(noteName)) {
          note.classList.add('scale-note', 'inactive')
        }
      })

      // 更新显示状态
      updateNoteVisibility()

      // 更新状态栏
      updateStatusBar(`${transSet.isEnglish ? 'Current:' : '当前显示:'} ${scale.name}`, true)
    }

    // 切换音符显示
    if (toggleHandler) {
      toggleNotesBtn.removeEventListener('click', toggleHandler);
    }
    toggleHandler = function () {
      notesHidden = !notesHidden;
      updateNoteVisibility();
      toggleNotesBtn.innerHTML = notesHidden
        ? `<i class="fas fa-eye"></i> ${translations['show-note-name'][transSet.isEnglish ? 1 : 0]}`
        : `<i class="fas fa-eye-slash"></i> ${translations['hide-note-name'][transSet.isEnglish ? 1 : 0]}`;
      toggleNotesBtn.classList.toggle('active', notesHidden);
    };
    toggleNotesBtn.addEventListener('click', toggleHandler);

    const keyHandler = function (event) {
      // 如果按下的键是空格键，并且事件目标不是输入框或文本区域
      if (
        event.code === 'Space' &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'TEXTAREA'
      ) {
        event.preventDefault() // 防止空格键滚动页面
        clearAllSelections()
      }
    }

    const changeHandler = function () {
      showScale(this.value)
    }

    // 清除所有选择
    clearSelectionBtn.addEventListener('click', clearAllSelections)

    // 添加键盘事件监听
    document.addEventListener('keydown', keyHandler)

    // 调式选择事件
    scaleSelector.addEventListener('change', changeHandler)

    // 添加音符点击事件
    const notHandlers = Array.from(notes).map((note) => {
      // 保存原始音名
      note.dataset.note = note.textContent

      const handler = function () {
        const wasSelected = note.classList.contains('selected')

        if (wasSelected) {
          note.classList.remove('selected')
          updateStatusBar(
            translations['please-click-note'][transSet.isEnglish ? 1 : 0],
          )
        } else {
          note.classList.add('selected')

          // 获取音符信息
          const stringLabel = note
            .closest('.fret-row')
            .querySelector('.string-label').textContent
          const noteName = note.dataset.note

          // 确定是空弦音还是品上音
          if (note.classList.contains('example-open-note')) {
            updateStatusBar(`${stringLabel} ${transSet.isEnglish ? 'Open String' : '空弦音'} ${noteName}`, true)
          } else {
            // 获取品位
            const noteContainer = note.parentElement
            const fretContainers = noteContainer.parentElement.children
            const fretIndex = Array.from(fretContainers).indexOf(noteContainer)

            // 获取品位数字
            const area = note.closest('.fretboard-content, .extended-frets')
            const fretHeader = area.querySelector('.fretboard-header')
            const fretNum = fretHeader.children[fretIndex].textContent

            updateStatusBar(`${stringLabel} ${fretNum}${transSet.isEnglish ? ' Fret' : '品'} ${noteName}`, true)
          }
        }

        // 更新显示状态
        updateNoteVisibility()
      }

      note.addEventListener('click', handler)
      return handler
    })

    // 添加全选功能 - 点击品位数字
    const fretHandlers = Array.from(fretNumbers).map((fretNum) => {
      const handler = function () {
        const fretIndex = Array.from(this.parentNode.children).indexOf(this)
        const isSelected = this.classList.contains('selected')

        // 切换选择状态
        this.classList.toggle('selected', !isSelected)

        // 获取当前活动区域
        const activeArea =
          this.closest('.fretboard-content') || this.closest('.extended-frets')

        // 收集该品位的音符
        const noteNames = []

        // 找到该品位的所有音符
        activeArea.querySelectorAll('.fret-notes').forEach((notesContainer) => {
          const noteContainer = notesContainer.children[fretIndex]
          if (noteContainer) {
            const note = noteContainer.querySelector(
              '.note, .example-open-note',
            )
            if (note) {
              if (!isSelected) {
                note.classList.add('selected')
                noteNames.push(note.dataset.note)
              } else {
                note.classList.remove('selected')
              }
            }
          }
        })

        // 更新显示状态
        updateNoteVisibility()

        // 更新状态栏
        if (!isSelected) {
          updateStatusBar(
            `${this.textContent}${transSet.isEnglish ? ' Fret' : '品'}: ${noteNames.join(', ')}`,
            true,
          )
        } else {
          updateStatusBar(
            translations['please-click-note'][transSet.isEnglish ? 1 : 0],
          )
        }
      }
      fretNum.addEventListener('click', handler)
    })

    // 初始显示母调式
    showScale('none')

    // 更新弦号标签
    function updateStringLabels() {
      rootElm.querySelectorAll('.fret-row').forEach((row, rowIndex) => {
        const stringLabel = row.querySelector('.string-label')
        if (stringLabel) stringLabel.textContent = stringNames[rowIndex]
      })
    }

    // 初始化时更新弦号标签
    updateStringLabels()

    const onDestroy = () => {
      // 切换音符显示
      if (toggleHandler) {
        toggleNotesBtn.removeEventListener('click', toggleHandler);
      }
      // 清除所有选择
      clearSelectionBtn.removeEventListener('click', clearAllSelections)

      // 添加键盘事件监听
      document.removeEventListener('keydown', keyHandler)

      // 调式选择事件
      scaleSelector.removeEventListener('change', changeHandler)

      notes.forEach((note, index) =>
        note.removeEventListener('click', notHandlers[index]),
      )
      fretNumbers.forEach((note, index) =>
        note.removeEventListener('click', fretHandlers[index]),
      )
    }

    return onDestroy
  }

  global.initExample = initExample
})(window)
