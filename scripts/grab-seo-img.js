const fs = require('fs/promises')
const data = require('../personal-data.json')
const { chromium } = require('playwright-chromium')

const useSEOImg = async (browser, url) => {
  try {
    const page = await browser.newPage({ colorScheme: 'dark' })
    await page.goto(url)

    return await page.evaluate(() => {
      const isOgImgExist = document.querySelector('meta[property="og:image"]')
      const isTwitterImgExist = document.querySelector('meta[property="twitter:image:src"]')

      if (isOgImgExist) {
        return isOgImgExist.getAttribute('content')
      } else if (isTwitterImgExist) {
        return isTwitterImgExist.getAttribute('content')
      } else {
        return ''
      }
    })
  } catch (err) {
    throw new Error(`Unable to obtain github seo image at: ${err}`)
  }
}

const useScreenshot = async (browser, p, screenshotOptions, outputPath) => {
  try {
    const page = await browser.newPage({ colorScheme: 'dark' })
    await page.goto(p.web_url)

    // some page load slower, so have to add delay to js
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)))

    await page.screenshot(screenshotOptions)
    return outputPath
  } catch (err) {
    throw new Error(`Unable to take screenshot: ${err}`)
  }
}

async function getRoutesImages(browser) {
  try {
    const routes = [
      { web_url: '', name: 'Home' },
      { web_url: 'side-projects', name: 'side-projects' },
      { web_url: 'blogs', name: 'Blogs' },
    ].map(route => ({ ...route, web_url: `http://localhost:3000/${route.web_url}` }))

    return await Promise.all(
      routes.map(
        async r =>
          await useScreenshot(
            browser,
            r,
            { path: `./public/assets/routes/${r.name}.png` },
            `/assets/routes/${r.name}.png`,
          ),
      ),
    )
  } catch (err) {
    throw new Error(`Failed to getRoutesImages :${err}`)
  }
}

async function generateSideProjectImg(browser) {
  try {
    const projects = data.projects.map(async p => ({
      ...p,
      img: p.web_url
        ? await useScreenshot(
            browser,
            p,
            { path: `./public/assets/projects/${p.name}.png` },
            `/assets/projects/${p.name}.png`,
          )
        : await useSEOImg(browser, p.github_url),
    }))

    const newProjects = await Promise.all(projects)

    await fs.writeFile('./personal-data.json', JSON.stringify({ ...data, projects: newProjects }, null, 2), 'utf-8')
  } catch (err) {
    throw new Error(`Failed to generate SideProjectImg: ${err}`)
  }
}

;(async () => {
  let browser
  try {
    browser = await chromium.launch({ headless: true })

    await getRoutesImages(browser)
    await generateSideProjectImg(browser)
  } catch (e) {
    throw new Error(`Whole process gone wrong: ${e}`)
  } finally {
    await browser.close()
  }
})()
