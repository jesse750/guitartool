// 基础功能 js，已挂载到window
const loaderMap = {
  'scale-example': initExample,
  'scale-practice': initScale,
  'chord-practice': initChord
}

document.addEventListener('DOMContentLoaded', function () {
  // 初始化翻译
  const transSet = initTranslate()

  // 导航切换
  const navLinks = document.querySelectorAll('.nav-link')
  const contentSections = document.querySelectorAll('.content-section')

  window.destroyer

  // 页面初始只高亮第一个导航栏并显示对应内容
  navLinks.forEach((link, idx) => link.classList.toggle('active', idx === 0))
  contentSections.forEach((section, idx) => section.classList.toggle('active', idx === 0))
  const firstTarget = navLinks[0].dataset.target
  const firstSection = document.getElementById(firstTarget)
  window.destroyer = loaderMap[firstTarget](transSet, firstSection)

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const target = this.dataset.target

      window.destroyer?.()

      // 更新导航链接状态
      navLinks.forEach((link) => link.classList.remove('active'))
      this.classList.add('active')

      // 更新内容区域显示
      contentSections.forEach((section) => {
        section.classList.remove('active')
      })
      const section = document.getElementById(target)
      section.classList.add('active')

      // 加载对应功能js
      window.destroyer = loaderMap[target](transSet, section)
    })
  })
})
