// import Author from './Author.astro';

export interface Props {
  title: string
  author: string
  publishDate: string
  heroImage: string
}

export function BlogPost(props: any) {
  const { title, author, publishDate, heroImage } = props
  return (
    <div className='layout'>
      {/*<article className="content">*/}
      {/*  <div>*/}
      {/*    <header>*/}
      {/*      { heroImage && <img width="720" height="420" className="hero-image" loading="lazy" src={ heroImage } /> }*/}
      {/*      <p className="publish-date">{ publishDate }</p>*/}
      {/*      <h1 className="title">{ title }</h1>*/}
      {/*      <Author name="@FredKSchott" url="https://twitter.com/FredKSchott" />*/}
      {/*    </header>*/}
      {/*    <main>*/}

      {/*    </main>*/}
      {/*</article>*/}
    </div>
  )
}

/*
<style>
  .hero-image {
  width: 100vw;
  object-fit: cover;
  object-position: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
  max-width: 1280px;
}

  @media (max-width: 50em) {
  .hero-image {
  height: 260px;
  margin-top: 0;
  margin-bottom: 2rem;
}
}

  .content {
  margin - bottom: 8rem;
}

  .content :global(main > * + *) {
  margin - top: 1rem;
}

  .content :global(h2) {
  margin - top: 4rem;
}

  header {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 4px solid var(--theme-divider);
}

  .title,
  .author,
  .publish-date {
  margin: 0;
}

  .publish-date,
  .author {
  color: var(--theme-text-lighter);
}

  .title {
  font - size: 2.25rem;
  font-weight: 700;
}
</style>
 */