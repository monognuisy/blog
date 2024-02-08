module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `monognuisy blog.`,
    author: {
      name: `monognuisy`,
      summary: `studying Computer & Software Science in Hanyang University, Seoul, Korea`,
    },
    description: `CS blog by monognuisy`,
    siteUrl: `https://monognuisy.github.io/blog/`,
    // social: {
    //   twitter: ``,
    // },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/image`,
        name: `image`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
              macros: {
                "\\dv": `{\\dfrac{{\\rm d}{#1}}{{\\rm d}{#2}}}`,
                "\\pdv": `{\\dfrac{{\\partial}{#1}}{{\\partial}{#2}}}`,
                "\\dd": `{{\\rm d}{#1}}`,
                "\\norm": `{\\left \\Vert {#1} \\right \\Vert}`,
                "\\iindep": `{\\perp \\! \\! \\! \\perp}`,
                "\\indep": `\\mathrel{\\iindep}`,
                "\\expect": `{\\mathbb{E} \\left[{#1}\\right]}`,
                "\\vari": `{\\mathrm{Var} \\left[{#1}\\right]}`,
                "\\cov": `{\\mathrm{Cov} \\left({#1}, {#2}\\right)}`,
              },
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-numbered-footnotes`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://monognuisy.github.io/blog",
        sitemap: "https://monognuisy.github.io/blog/sitemap-0.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => {
    //           return allMarkdownRemark.nodes.map(node => {
    //             return Object.assign({}, node.frontmatter, {
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ "content:encoded": node.html }],
    //             })
    //           })
    //         },
    //         query: `
    //           {
    //             allMarkdownRemark(
    //               sort: { order: DESC, fields: [frontmatter___date] },
    //             ) {
    //               nodes {
    //                 excerpt
    //                 html
    //                 fields {
    //                   slug
    //                 }
    //                 frontmatter {
    //                   title
    //                   date
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "Gatsby Starter Blog RSS Feed",
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `monognuisy blog`,
        short_name: `monognuisy blog`,
        start_url: `/blog`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/logo_trans_squareBlue.webp`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
