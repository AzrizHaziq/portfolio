const fs = require('fs/promises')
const data = require('../personal-data.json')
const { chromium } = require('playwright-chromium')

const useSEOImg = async (browser, p) => {
  try {
    const page = await browser.newPage()
    await page.goto(p.github_url)

    return await page.evaluate(() => document.querySelector('meta[property="og:image"]').getAttribute('content'))
  } catch (err) {
    console.error('Unable to obtain github seo image at:', p.github_url, err)
  }
}

const useScreenshot = async (browser, p) => {
  try {
    const page = await browser.newPage()
    await page.goto(p.web_url)

    // some page load slower, so have to add delay to js
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)))

    await page.screenshot({ path: `./public/assets/projects/${p.name}.png` })
    return `/assets/projects/${p.name}.png`
  } catch (err) {
    console.error('Unable to take screenshot', p.url, err)
  }
}

;(async () => {
  const browser = await chromium.launch()

  Promise.all(
    data.projects.map(async p => ({
      ...p,
      img: p.web_url ? await useScreenshot(browser, p) : await useSEOImg(browser, p),
    }))
  )
    .then(projects => {
      return fs.writeFile('./personal-data.json', JSON.stringify({ ...data, projects }, null, 2), 'utf-8')
    })
    .finally(async () => await browser.close())
})()
