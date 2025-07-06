// 更新音阶示例练习说明
const updateExampleIns = (translations, isEnglish) => {
  const scaleExampleInstructions = document.querySelectorAll(
    '#scale-example .instructions li',
  )

  const exampleH2 = document.querySelector('#scale-example .instructions h2')
  if (exampleH2) {
    exampleH2.innerHTML = `<i class="fas fa-info-circle"></i> ${translations['instructions-title'][isEnglish ? 1 : 0]}`
  }

  if (scaleExampleInstructions.length >= 2) {
    if (scaleExampleInstructions[0]) scaleExampleInstructions[0].textContent = isEnglish
      ? 'Scale examples for each scale'
      : '各调式音阶示例'
    if (scaleExampleInstructions[1]) scaleExampleInstructions[1].textContent = isEnglish
      ? 'Can be used for teaching aids or personal practice'
      : '可用于教具或个人练习'
  }
}

// 全局挂载
;(function (global) {
  const initTranslate = () => {
    // 语言切换
    const languageToggle = document.getElementById('languageToggle')
    // let isEnglish = true

    // 翻译
    const translations = {
      // 导航
      'nav-chord': ['和弦练习', 'Chord Practice'],
      'nav-scale': ['音阶练习', 'Scale Practice'],
      'nav-example': ['音阶示例', 'Scale Example'],
      'nav-lang': ['English', '中文'],
      // 导航气泡说明
      'nav-tip-example': ['查看各调式音阶分布', 'View scale distribution'],
      'nav-tip-scale': ['答题识别音符位置', 'Quiz to identify note positions'],
      'nav-tip-chord': ['答题识别和弦级数', 'Quiz to identify chord degrees'],

      // footer
      footer: ['吉他指板学习系统', 'Guitar Learning System'],

      // 术语
      // 可根据调式名单扩展：
      'scale-name-cMajor': ['C大调（A小调）', 'C Major (A Minor)'],
      'scale-name-dMajor': ['D大调（B小调）', 'D Major (B Minor)'],
      'scale-name-eMajor': ['E大调（C#小调）', 'E Major (C# Minor)'],
      'scale-name-fMajor': ['F大调（D小调）', 'F Major (D Minor)'],
      'scale-name-gMajor': ['G大调（E小调）', 'G Major (E Minor)'],
      'scale-name-aMajor': ['A大调（F#小调）', 'A Major (F# Minor)'],
      'scale-name-bMajor': ['B大调（G#小调）', 'B Major (G# Minor)'],
      
      // 音阶示例筛选器选项
      'scale-example-none': ['自然调式（母调式）', 'Natural Scale (Parent Scale)'],
      'scale-example-cMajor_aMinor': ['C大调（A小调）', 'C Major (A Minor)'],
      'scale-example-fMajor_dMinor': ['F大调（D小调）', 'F Major (D Minor)'],
      'scale-example-gMajor_eMinor': ['G大调（E小调）', 'G Major (E Minor)'],
      'scale-example-dMajor_bMinor': ['D大调（B小调）', 'D Major (B Minor)'],
      'scale-example-aMajor_fsMinor': ['A大调（F#小调）', 'A Major (F# Minor)'],
      'scale-example-eMajor_csMinor': ['E大调（C#小调）', 'E Major (C# Minor)'],
      'scale-example-bMajor_gsMinor': ['B大调（G#小调）', 'B Major (G# Minor)'],

      // 和弦类型
      'chord-type-major': ['大三和弦', 'Major'],
      'chord-type-minor': ['小三和弦', 'Minor'],
      'chord-type-diminished': ['减三和弦', 'Diminished'],

      // 通用
      title: ['吉他学习系统', 'Guitar Learning System'],
      'page-title': ['吉他指板学习系统 - 和弦与音阶练习', 'Guitar Fretboard Learning System - Chord and Scale Practice'],
      'start-practice': ['开始练习', 'Start Practice'],
      'end-practice': ['结束练习', 'End Practice'],
      correct: ['正确', 'Correct'],
      incorrect: ['错误', 'Incorrect'],
      space: ['空格键', 'Space'],
      'instructions-title': ['使用说明', 'Instructions'],

      // 和弦练习
      'chord-title': ['吉他指板和弦练习工具', 'Guitar Chord Practice Tool'],
      'chord-subtitle': [
        '交互式和弦练习 - 测试您对调式和弦的掌握程度',
        'Interactive chord practice - Test your mastery of modal chords',
      ],
      'chord-status': [
        '请选择调式并点击"开始练习"按钮',
        'Please select a scale and click "Start Practice"',
      ],

      // Line 1
      'chord-instruction-line-1': [
        '通过 调式选择 下拉菜单选择要练习的调式',
        'Select the scale you want to practice using the scale dropdown menu',
      ],
      'chord-instruction-word-1-1': ['通过', 'Via'],
      'chord-instruction-word-1-2': ['调式选择', 'scale selection'],
      'chord-instruction-word-1-3': [
        '下拉菜单选择要练习的调式',
        'select the scale to practice from the dropdown',
      ],

      // Line 2
      'chord-instruction-line-2': [
        '点击 开始练习 按钮开始练习',
        'Click the "Start Practice" button to begin',
      ],
      'chord-instruction-word-2-1': ['点击', 'Click'],
      'chord-instruction-word-2-2': ['开始练习', 'Start Practice'],
      'chord-instruction-word-2-3': [
        '按钮开始练习',
        'button to begin practice',
      ],

      // Line 3
      'chord-instruction-line-3': [
        '练习开始后，系统会随机提问该调式的某个级别和弦',
        'Once practice starts, the system will randomly ask a chord from the selected scale degree',
      ],
      'chord-instruction-word-3-1': ['练习开始后', 'Once practice starts'],
      'chord-instruction-word-3-2': [
        '系统会随机提问该调式的某个级别和弦',
        'the system will ask a chord from that scale',
      ],

      // Line 4
      'chord-instruction-line-4': [
        '点击上方对应的 和弦卡片 回答问题',
        'Click the corresponding chord card above to answer',
      ],
      'chord-instruction-word-4-1': [
        '点击上方对应的',
        'Click the matching one above',
      ],
      'chord-instruction-word-4-2': ['和弦卡片', 'chord card'],
      'chord-instruction-word-4-3': ['回答问题', 'to answer the question'],

      // Line 5
      'chord-instruction-line-5': [
        '系统会显示您的回答是否正确，并显示正确答案',
        'The system will show whether your answer is correct and display the correct chord',
      ],
      'chord-instruction-word-5-1': [
        '系统会显示您的回答是否正确',
        'system shows if your answer is correct',
      ],
      'chord-instruction-word-5-2': [
        '并显示正确答案',
        'and displays the correct answer',
      ],

      // Line 6
      'chord-instruction-line-6': [
        '练习过程中会统计您的正确和错误次数',
        'Your correct and incorrect attempts will be tracked during practice',
      ],
      'chord-instruction-word-6-1': ['练习过程中', 'during practice'],
      'chord-instruction-word-6-2': [
        '统计您的正确和错误次数',
        'track your correct and incorrect attempts',
      ],

      // Line 7
      'chord-instruction-line-7': [
        '点击 结束练习 按钮可以随时结束练习',
        'Click the "End Practice" button to stop at any time',
      ],
      'chord-instruction-word-7-1': ['点击', 'Click'],
      'chord-instruction-word-7-2': ['结束练习', 'End Practice'],
      'chord-instruction-word-7-3': [
        '按钮可以随时结束练习',
        'button to stop anytime',
      ],

      // Line 8
      'chord-instruction-line-8': [
        '提示：练习模式下和弦顺序会被打乱',
        'Tip: In practice mode, chord order will be shuffled',
      ],
      'chord-instruction-word-8-1': ['提示', 'Tip'],
      'chord-instruction-word-8-2': [
        '练习模式下和弦顺序会被打乱',
        'Chord order will be shuffled in practice mode',
      ],

      'chord-practice-started': ['练习已开始: ', 'Practice started: '],
      'chord-practice-ended': [
        '练习已结束 - 正确: ',
        'Practice ended - Correct: ',
      ],
      'chord-error': ['错误! 正确答案是 ', 'Incorrect! The correct answer is '],
      'chord-success': ['正确! ', 'Correct! '],
      'chord-question': ['问题: 该调式的 ', 'Question: What is the '],
      'chord-level': [' 级和弦是？', ' level chord?'],

      // 音阶练习
      'scale-title': ['吉他指板音阶练习工具', 'Guitar Scale Practice Tool'],
      'scale-subtitle': [
        '交互式音阶练习 - 测试您对指板音阶的掌握程度',
        'Interactive scale practice - Test your mastery of the fretboard',
      ],
      'scale-status': [
        '请选择调式并点击"开始练习"按钮',
        'Please select a scale and click "Start Practice"',
      ],
      'scale-instruction-1': ['通过', 'Select a scale from the'],
      'scale-instruction-2': ['下拉菜单选择要练习的调式', 'dropdown menu'],
      'scale-instruction-3': ['点击', 'Click the'],
      'scale-instruction-4': ['按钮开始练习', 'button to start practicing'],
      'scale-instruction-5': [
        '练习开始后，指板上会随机高亮显示一个音符',
        'A random note will be highlighted on the fretboard',
      ],
      'scale-instruction-6': ['点击上方对应的', 'Click the corresponding'],
      'scale-instruction-7': [
        '回答该音符在调式中的位置',
        'solfa button to indicate the position in the scale',
      ],
      'scale-instruction-8': [
        '系统会显示您的回答是否正确',
        'The system will show if your answer is correct',
      ],
      'scale-instruction-9': [
        '练习过程中会统计您的正确和错误次数',
        'Your correct and incorrect counts will be recorded',
      ],
      'scale-instruction-10': ['点击', 'Click the'],
      'scale-instruction-11': [
        '按钮可以随时结束练习',
        'button to end practice at any time',
      ],
      'scale-instruction-12': [
        '重要：练习模式下指板不显示唱名数字，以增加练习难度',
        'Important: Solfa numbers are hidden in practice mode to increase difficulty',
      ],
      'scale-practice-started': ['练习已开始: ', 'Practice started: '],
      'scale-practice-ended': [
        '练习已结束 - 正确: ',
        'Practice ended - Correct: ',
      ],
      'scale-error': ['错误! 正确答案是 ', 'Incorrect! The correct answer is '],
      'scale-success': ['正确! 这是', 'Correct! This is '],
      'scale-question': ['请识别这个音符: ', 'Identify this note: '],

      // Line 1
      'scale-instruction-line-1': [
        '通过 调式选择 下拉菜单选择要练习的调式',
        'Select the scale you want to practice using the scale dropdown menu',
      ],
      'scale-instruction-word-1-1': ['通过', 'Via'],
      'scale-instruction-word-1-2': ['调式选择', 'scale selection'],
      'scale-instruction-word-1-3': [
        '下拉菜单选择要练习的调式',
        'select the scale to practice from the dropdown',
      ],

      // Line 2
      'scale-instruction-line-2': [
        '点击 开始练习 按钮开始练习',
        'Click the "Start Practice" button to begin',
      ],
      'scale-instruction-word-2-1': ['点击', 'Click'],
      'scale-instruction-word-2-2': ['开始练习', 'Start Practice'],
      'scale-instruction-word-2-3': [
        '按钮开始练习',
        'button to begin practice',
      ],

      // Line 3
      'scale-instruction-line-3': [
        '练习开始后，指板上会随机高亮显示一个音符',
        'After practice starts, a random note will be highlighted on the fretboard',
      ],
      'scale-instruction-word-3-1': ['练习开始后', 'After practice starts'],
      'scale-instruction-word-3-2': [
        '指板上会随机高亮显示一个音符',
        'a random note will be highlighted on the fretboard',
      ],

      // Line 4
      'scale-instruction-line-4': [
        '点击上方对应的 唱名按钮 (数字1-7) 回答该音符在调式中的位置',
        'Click the corresponding solfège button (numbers 1–7) above to answer the scale degree',
      ],
      'scale-instruction-word-4-1': [
        '点击上方对应的',
        'Click the matching one above',
      ],
      'scale-instruction-word-4-2': ['唱名按钮', 'solfège button'],
      'scale-instruction-word-4-3': ['数字1-7', 'numbers 1–7'],
      'scale-instruction-word-4-4': [
        '回答该音符在调式中的位置',
        "to answer the note's scale degree",
      ],

      // Line 5
      'scale-instruction-line-5': [
        '系统会显示您的回答是否正确',
        'The system will indicate whether your answer is correct',
      ],
      'scale-instruction-word-5-1': [
        '系统会显示您的回答是否正确',
        'The system will show if your answer is correct',
      ],

      // Line 6
      'scale-instruction-line-6': [
        '练习过程中会统计您的正确和错误次数',
        'Your correct and incorrect attempts will be tracked during practice',
      ],
      'scale-instruction-word-6-1': ['练习过程中', 'During practice'],
      'scale-instruction-word-6-2': [
        '统计您的正确和错误次数',
        'track your correct and incorrect attempts',
      ],

      // Line 7
      'scale-instruction-line-7': [
        '点击 结束练习 按钮可以随时结束练习',
        'Click the "End Practice" button to stop at any time',
      ],
      'scale-instruction-word-7-1': ['点击', 'Click'],
      'scale-instruction-word-7-2': ['结束练习', 'End Practice'],
      'scale-instruction-word-7-3': [
        '按钮可以随时结束练习',
        'button to end the practice anytime',
      ],

      // Line 8
      'scale-instruction-line-8': [
        '重要：练习模式下指板不显示唱名数字，以增加练习难度',
        'Important: In practice mode, solfège numbers are hidden to increase difficulty',
      ],
      'scale-instruction-word-8-1': ['重要', 'Important'],
      'scale-instruction-word-8-2': [
        '练习模式下指板不显示唱名数字',
        'solfège numbers are hidden on the fretboard in practice mode',
      ],
      'scale-instruction-word-8-3': [
        '以增加练习难度',
        'to increase the challenge',
      ],

      // 音阶示例
      'hide-note-name': ['隐藏音名', 'Hide note name'],
      'show-note-name': ['显示音名', 'Show note name'],
      'clear-all-select': ['清除所有选择', 'Clear All Selected'],
      'all-selected-cleared': ['已清除所有选择', 'All Selected Cleared'],
      'please-click-note': ['请点击指板上的音符', 'Please Click Note'],
      'scale-example-status': ['请选择调式或点击指板上的音符 - 品丝和品位显示已优化', 'Please select a scale or click notes on the fretboard - Fret and position display optimized'],

      // Line 1
      'instruction-word-1-1': ['通过', 'Via'],
      'instruction-word-1-2': ['调式选择', 'scale selection'],
      'instruction-word-1-3': [
        '下拉菜单选择自然调式（母调式）或关系大小调音阶',
        'select a natural or relative major/minor scale',
      ],

      // Line 2
      'instruction-word-2-1': ['点击', 'Click'],
      'instruction-word-2-2': ['隐藏音名', 'Hide Note Names'],
      'instruction-word-2-3': [
        '按钮可以切换指板上音名的显示状态',
        'to toggle note names on the fretboard',
      ],

      // Line 3
      'instruction-word-3-1': ['点击任意品格', 'Click any fret'],
      'instruction-word-3-2': [
        '可以在该位置添加/移除选择标记（绿色圆点）',
        'to add or remove selection markers (green dot)',
      ],

      // Line 4
      'instruction-word-4-1': [
        '点击琴弦最左侧的空弦位置可以显示空弦音',
        'Click the open string area on the far left to display open string notes',
      ],

      // Line 5
      'instruction-word-5-1': ['使用', 'Use'],
      'instruction-word-5-2': ['清除所有选择', 'Clear All Selections'],
      'instruction-word-5-3': ['空格键', 'Space key'],
      'instruction-word-5-4': [
        '按钮可以移除所有选择标记',
        'button to remove all markers',
      ],

      // Line 6
      'instruction-word-6-1': [
        '左上角的箭头按钮',
        'arrow button in the top-left',
      ],
      'instruction-word-6-2': [
        '可以切换显示0-12品或13-23品',
        'to toggle frets 0–12 or 13–23',
      ],

      // Line 7
      'instruction-word-7-1': ['点击品位数字', 'Click fret number'],
      'instruction-word-7-2': [
        '可以全选/取消全选该品位的所有音符',
        'to select or deselect all notes on that fret',
      ],

      // Line 8
      'instruction-word-8-1': [
        '本指板包含6根弦（1弦为最细弦，6弦为最粗弦）',
        'This fretboard has 6 strings(string 1 is the thinnest, string 6 is the thickest)',
      ],

      // Line 9
      'instruction-word-9-1': ['当前版本', 'Current version'],
      'instruction-word-9-2': [
        '添加F大调，优化界面布局',
        'Added F major scale and improved layout',
      ],

      // 图例
      'legend-root': ['根音', 'Root'],
      'legend-scale': ['音阶音', 'Scale Note'],
      'legend-selected': ['用户选择', 'Selected'],
    }

    const transSet = { isEnglish: true, translations }

    function updateLanguage() {
      const { isEnglish } = transSet

      document.getElementById('home-title').innerText =
        translations['title'][isEnglish ? 1 : 0]
      
      // 更新页面标题
      document.title = translations['page-title'][isEnglish ? 1 : 0]

      // 更新导航
      document.querySelector('[data-target="chord-practice"]').textContent =
        translations['nav-chord'][isEnglish ? 1 : 0]
      document.querySelector('[data-target="scale-practice"]').textContent =
        translations['nav-scale'][isEnglish ? 1 : 0]
      document.querySelector('[data-target="scale-example"]').textContent =
        translations['nav-example'][isEnglish ? 1 : 0]
      document.querySelector('#languageToggle span').textContent =
        translations['nav-lang'][isEnglish ? 1 : 0]

      // 更新导航栏按钮title为中英文气泡说明
      document.querySelector('[data-target="scale-example"]').title = `${translations['nav-tip-example'][isEnglish ? 1 : 0]}`
      document.querySelector('[data-target="scale-practice"]').title = `${translations['nav-tip-scale'][isEnglish ? 1 : 0]}`
      document.querySelector('[data-target="chord-practice"]').title = `${translations['nav-tip-chord'][isEnglish ? 1 : 0]}`

      // 更新和弦练习
      // document.querySelector(
      //   '#chord-practice h1',
      // ).innerHTML = `<i class="fas fa-music"></i> ${
      //   translations['chord-title'][isEnglish ? 1 : 0]
      // }`
      // document.querySelector('#chord-practice .subtitle').textContent =
      //   translations['chord-subtitle'][isEnglish ? 1 : 0]

      const chordPracticeBtn = document.querySelector('#chordPracticeBtn')
      if (chordPracticeBtn) chordPracticeBtn.innerHTML = `<i class="fas fa-play"></i> ${translations['start-practice'][isEnglish ? 1 : 0]}`
      const chordStatusBarP = document.querySelector('#chordStatusBar p')
      if (chordStatusBarP) chordStatusBarP.textContent = translations['chord-status'][isEnglish ? 1 : 0]
      const chordStatsCorrect = document.querySelector('#chordStats .stat-item:nth-child(1) span')
      if (chordStatsCorrect) chordStatsCorrect.textContent = translations['correct'][isEnglish ? 1 : 0]
      const chordStatsIncorrect = document.querySelector('#chordStats .stat-item:nth-child(2) span')
      if (chordStatsIncorrect) chordStatsIncorrect.textContent = translations['incorrect'][isEnglish ? 1 : 0]
      const chordH2 = document.querySelector('#chord-practice .instructions h2')
      if (chordH2) chordH2.innerHTML = `<i class="fas fa-info-circle"></i> ${translations['instructions-title'][isEnglish ? 1 : 0]}`

      // 更新音阶练习
      // document.querySelector(
      //   '#scale-practice h1',
      // ).innerHTML = `<i class="fas fa-guitar"></i> ${
      //   translations['scale-title'][isEnglish ? 1 : 0]
      // }`
      // document.querySelector('#scale-practice .subtitle').textContent =
      //   translations['scale-subtitle'][isEnglish ? 1 : 0]

      const scalePracticeBtn = document.querySelector('#scalePracticeBtn')
      if (scalePracticeBtn) scalePracticeBtn.innerHTML = `<i class="fas fa-play"></i> ${translations['start-practice'][isEnglish ? 1 : 0]}`
      const scaleStatusBarP = document.querySelector('#scaleStatusBar p')
      if (scaleStatusBarP) scaleStatusBarP.textContent = translations['scale-status'][isEnglish ? 1 : 0]
      const scaleStatsCorrect = document.querySelector('#scaleStats .stat-item:nth-child(1) span')
      if (scaleStatsCorrect) scaleStatsCorrect.textContent = translations['correct'][isEnglish ? 1 : 0]
      const scaleStatsIncorrect = document.querySelector('#scaleStats .stat-item:nth-child(2) span')
      if (scaleStatsIncorrect) scaleStatsIncorrect.textContent = translations['incorrect'][isEnglish ? 1 : 0]
      const scaleH2 = document.querySelector('#scale-practice .instructions h2')
      if (scaleH2) scaleH2.innerHTML = `<i class="fas fa-info-circle"></i> ${translations['instructions-title'][isEnglish ? 1 : 0]}`

      // 更新音阶练习说明
      const scaleInstructions = document.querySelectorAll(
        '#scale-practice .instructions li',
      )
      if (scaleInstructions.length >= 2) {
        scaleInstructions[0].textContent = isEnglish
          ? 'Scale examples and practice for each scale'
          : '各调式音阶示例及练习'
        scaleInstructions[1].textContent = isEnglish
          ? 'Click the start button to practice'
          : '点击开始按钮进行练习'
      }

      // 更新音阶示例说明
      const exampleInstructions = document.querySelectorAll(
        '#scale-example .instructions li',
      )
      if (exampleInstructions.length >= 2) {
        exampleInstructions[0].textContent = isEnglish
          ? 'Scale examples for each scale'
          : '各调式音阶示例'
        exampleInstructions[1].textContent = isEnglish
          ? 'Can be used for teaching aids or personal practice'
          : '可用于教具或个人练习'
      }
      const exampleH2 = document.querySelector('#scale-example .instructions h2')
      if (exampleH2) exampleH2.innerHTML = `<i class="fas fa-info-circle"></i> ${translations['instructions-title'][isEnglish ? 1 : 0]}`

      // 更新音阶示例
      const clearSelectionBtn = document.getElementById('clearSelection')
      if (clearSelectionBtn) clearSelectionBtn.innerHTML = `\n      <i class=\"fas fa-eraser\"></i> ${translations['clear-all-select'][isEnglish ? 1 : 0]} <span class=\"key-hint\">${translations['space'][isEnglish ? 1 : 0]}</span>`
      // const toggleNotesBtn = document.getElementById('toggleNotes')
      // if (toggleNotesBtn) toggleNotesBtn.innerHTML = `\n      <i class=\"fas fa-music\"></i> ${translations['hide-note-name'][isEnglish ? 1 : 0]}`
      
      // 更新筛选器选项
      // 和弦练习筛选器
      const chordScaleOptions = document.querySelectorAll('#chordScaleSelector option')
      chordScaleOptions[0].textContent = translations['scale-name-cMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[1].textContent = translations['scale-name-dMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[2].textContent = translations['scale-name-eMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[3].textContent = translations['scale-name-fMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[4].textContent = translations['scale-name-gMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[5].textContent = translations['scale-name-aMajor'][isEnglish ? 1 : 0]
      chordScaleOptions[6].textContent = translations['scale-name-bMajor'][isEnglish ? 1 : 0]
      
      // 音阶练习筛选器
      const scaleScaleOptions = document.querySelectorAll('#scaleScaleSelector option')
      scaleScaleOptions[0].textContent = translations['scale-name-cMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[1].textContent = translations['scale-name-dMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[2].textContent = translations['scale-name-eMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[3].textContent = translations['scale-name-fMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[4].textContent = translations['scale-name-gMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[5].textContent = translations['scale-name-aMajor'][isEnglish ? 1 : 0]
      scaleScaleOptions[6].textContent = translations['scale-name-bMajor'][isEnglish ? 1 : 0]
      
      // 音阶示例筛选器
      const scaleExampleOptions = document.querySelectorAll('#scaleSelector option')
      scaleExampleOptions[0].textContent = translations['scale-example-none'][isEnglish ? 1 : 0]
      scaleExampleOptions[1].textContent = translations['scale-example-cMajor_aMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[2].textContent = translations['scale-example-fMajor_dMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[3].textContent = translations['scale-example-gMajor_eMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[4].textContent = translations['scale-example-dMajor_bMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[5].textContent = translations['scale-example-aMajor_fsMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[6].textContent = translations['scale-example-eMajor_csMinor'][isEnglish ? 1 : 0]
      scaleExampleOptions[7].textContent = translations['scale-example-bMajor_gsMinor'][isEnglish ? 1 : 0]
      
      // 更新音阶示例状态栏
      const statusBarP = document.querySelector('#statusBar p')
      if (statusBarP) statusBarP.textContent = translations['scale-example-status'][isEnglish ? 1 : 0]
      
      updateExampleIns(translations, isEnglish)

      // ----------- 新增：重新初始化当前激活tab功能，保证事件恢复 -----------
      // 查找当前激活tab
      const activeSection = document.querySelector('.content-section.active')
      if (activeSection) {
        const id = activeSection.id
        if (window.destroyer) window.destroyer()
        if (id === 'chord-practice' && window.initChord) {
          window.destroyer = window.initChord(transSet, activeSection)
        } else if (id === 'scale-practice' && window.initScale) {
          window.destroyer = window.initScale(transSet, activeSection)
        } else if (id === 'scale-example' && window.initExample) {
          window.destroyer = window.initExample(transSet, activeSection)
        }
      }
      // ----------------------------------------------------------

      // 更新页脚
      const footerP = document.querySelector('footer p')
      if (footerP) footerP.textContent = `${translations['footer'][isEnglish ? 1 : 0]} © 2025 v1.0`

      // 更新音阶示例图例
      const legend = document.getElementById('scaleLegend')
      if (legend) {
        const items = legend.querySelectorAll('.legend-item span')
        if (items.length >= 3) {
          items[0].textContent = translations['legend-root'][isEnglish ? 1 : 0]
          items[1].textContent = translations['legend-scale'][isEnglish ? 1 : 0]
          items[2].textContent = translations['legend-selected'][isEnglish ? 1 : 0]
        }
      }
    }

    languageToggle.addEventListener('click', function () {
      transSet.isEnglish = !transSet.isEnglish
      updateLanguage()
    })

    // init
    updateLanguage()

    return transSet
  }

  global.initTranslate = initTranslate
})(window)
