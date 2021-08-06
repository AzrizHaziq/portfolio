import fs from 'fs'
import { Canvas, createCanvas, loadImage, NodeCanvasRenderingContext2D } from 'canvas'

const getColor = (n: number): string =>
  ['#EEF2FF', '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'][n - 1]

const config = {
  width: 1200,
  maxWidth: 800,
  height: 630,
  font: getColor(8),
  bgColor: getColor(3),
  outBorder: getColor(5),
  underline: getColor(4),
}

const pipe =
  (...fns: Function[]) =>
  (initial: any) =>
    fns.reduce((acc, fn) => fn(acc), initial)

const removeDash = (text: string): string => text.replace(/-/g, ' ')
const toCapitalize = (text: string): string => `${text[0].toUpperCase()}${text.slice(1, text.length)}` // to uppercase
const breakWords = (text: string): string[] => text.split(' ')

const throwIfMoreThanItems =
  <U>(n: number, errMsg = `Should not have larger than ${n} items`) =>
  (arr: U[]) => {
    if (arr.length > n) throw Error(errMsg)
    return arr
  }

const breakLines = (texts: string[]) =>
  texts.reduce<Array<string[]>>(
    (acc, curr: string) => {
      const maxLineChars = 20

      if (acc[acc.length - 1].join(' ').length + curr.length < maxLineChars) {
        acc[acc.length - 1].push(curr)
      } else {
        acc.push([curr])
      }

      return acc
    },
    [[]],
  )

export const textToWrite = pipe(removeDash, toCapitalize, breakWords, breakLines, throwIfMoreThanItems(2))

export const writeTextInCanvas = (context: NodeCanvasRenderingContext2D, text: string, y: number) => {
  context.font = 'bold 70pt Menlo'

  const metrics = context.measureText(text)

  context.fillStyle = config.underline
  // @ts-ignore
  context.fillRect(600 - metrics.width / 2 - 10, y + metrics.emHeightDescent - 40, metrics.width, 40)
  context.fillStyle = config.font
  context.fillText(text, 600, y)
}

export const writeTagInCanvas = (context: NodeCanvasRenderingContext2D, texts: string[], y: number) => {
  context.fillStyle = config.font
  context.font = 'normal 20pt Menlo'
  context.fillText(texts.join(', '), 600, y)
}

export const writeFooterInCanvas = async (context: NodeCanvasRenderingContext2D, y: number) => {
  context.fillStyle = '#fff'
  context.font = 'bold 30pt Menlo'
  context.fillText(process.env.VERCEL_URL as string, 600, 530)

  const image = await loadImage('./public/android-chrome-192x192.png')
  context.drawImage(image, 260, y, 70, 70)
}

export const writeToFile = async (slug: string, canvas: Canvas) => {
  const out = fs.createWriteStream(`./public/assets/blogs/${slug}.png`)
  const stream = canvas.createPNGStream()

  stream.pipe(out)
  // eslint-disable-next-line no-console
  out.on('finish', () => console.log(`${slug}.png created`))
}

export async function generateImg({
  slug = 'init-post-2-12312312-asdasdasd-123123',
  tags = ['jasvacript', 'typescript', 'dx'],
}): Promise<Canvas> {
  // taken from https://flaviocopes.com/canvas-node-generate-image/
  const title: string[][] = textToWrite(slug)

  const canvas = createCanvas(config.width, config.height)
  const context = canvas.getContext('2d')

  context.textAlign = 'center'
  context.textBaseline = 'top'

  const grd = context.createLinearGradient(0, 0, config.width, config.height)
  grd.addColorStop(0, getColor(5))
  grd.addColorStop(1, getColor(4))

  // Fill with gradient
  context.fillStyle = grd
  context.fillRect(0, 0, config.width, config.height)

  writeTextInCanvas(context, title[0].join(' '), 100)
  title[1] && writeTextInCanvas(context, title[1].join(' '), 220)
  tags.length > 0 && writeTagInCanvas(context, tags, 470)
  await writeFooterInCanvas(context, 520)

  return canvas
}
