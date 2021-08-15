import { NextApiRequest, NextApiResponse } from 'next'

interface Req extends NextApiRequest {
  query: {
    q: string
    tags: string[]
  }
}

export default async function handle(req: Req, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    res.redirect('/404')
  } else {
    let { q: slug, tags = [] } = req.query
    const { generateBlogImg } = await import('@helpers/server/generate-blog-img')
    const canvas = await generateBlogImg({ slug, tags })

    res
      .writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': canvas.toBuffer().length,
      })
      .end(canvas.toBuffer('image/png'))
  }
}
