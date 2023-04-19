import { request, gql, GraphQLClient } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getPosts(): Promise<any> {
    if (!graphqlAPI) return;
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            id
                            name
                            bio
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                        tags {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    
    const result = await request(graphqlAPI, query);
    // @ts-ignore
    return result.postsConnection.edges;
}
