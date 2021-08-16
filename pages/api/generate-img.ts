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
    // http://localhost:3000/api/generate-img?slug=this-is-test-title&tags=javascript&tags=typescript&tags=vim
    let { q: slug, tags = [] } = req.query
    const { generateBlogImg } = await import('../../scripts/generate-blog-img')
    const canvas = await generateBlogImg({ slug, tags })

    res
      .writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': canvas.toBuffer().length,
      })
      .end(canvas.toBuffer('image/png'))
  }
}
