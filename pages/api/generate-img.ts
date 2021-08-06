import { NextApiRequest, NextApiResponse } from 'next'
import { generateImg } from '@helpers/server/generate-img'

interface Req extends NextApiRequest {
  query: {
    q: string
    tags: string[]
  }
}

export default async function handle(req: Req, res: NextApiResponse) {
  let { q: slug, tags = [] } = req.query
  const canvas = await generateImg({ slug, tags })

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': canvas.toBuffer().length,
    })
    .end(canvas.toBuffer('image/png'))
}
