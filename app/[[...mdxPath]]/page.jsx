import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components.js'
import { structuredData } from '../structured-data.js'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

// The page's name in content/: `index` for the home page.
function pageName(params) {
  return params.mdxPath?.length ? params.mdxPath.join('/') : 'index'
}

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  // Every page has a plain Markdown twin, generated at build from the same
  // source, for agents and answer engines that would rather not parse HTML.
  return {
    ...metadata,
    alternates: { types: { 'text/markdown': `/${pageName(params)}.md` } },
  }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  const data = structuredData(pageName(params))
  return (
    <Wrapper toc={toc} metadata={metadata}>
      {data && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      )}
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
