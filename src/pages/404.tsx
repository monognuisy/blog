import * as React from "react"
import { graphql, PageProps, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

interface NotFoundQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const NotFoundPage = ({ location }: PageProps) => {
  const data: NotFoundQueryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness. 😢</p>
    </Layout>
  )
}

export default NotFoundPage
