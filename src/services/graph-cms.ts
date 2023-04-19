import { gql, GraphQLClient } from 'graphql-request';
import { Category } from '@/interfaces/category';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export async function getPosts(): Promise<any> {
    return getEdgesResponse(getPostsQuery);
}

export async function getRecentPosts(): Promise<any> {
    return getPostsResponse(getRecentPostsQuery);
}

export async function getSimilarPosts(categories: Category[], slug: string): Promise<any> {
    return getPostsResponse(getSimilarPostsQuery);
}

export async function getCategories(): Promise<any> {
    return getCategoriesResponse(getCategoriesQuery);
}


const getPostsQuery = gql`
    query GetAllPosts {
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

const getRecentPostsQuery = gql`
    query GetRecentPosts {
        posts(
            orderBy: createdAt_ASC
            last: 3
        ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
    }
`;

const getSimilarPostsQuery = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
        posts(
            where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}} }
            last: 3
        ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
    }
`;

const getCategoriesQuery = gql`
    query GetCategories {
        categories {
            name
            slug
        }
    }
`;



async function getEdgesResponse(query: string): Promise<any> {
    if (!graphqlAPI) return;
    try {
        const client = new GraphQLClient(graphqlAPI);
        const response = await client.request(query);
        // @ts-ignore
        return response.postsConnection.edges;
    } catch (error) {
        
        console.error(error);
    }
}

async function getPostsResponse(query: string): Promise<any> {
    if (!graphqlAPI) return;
    try {
        const client = new GraphQLClient(graphqlAPI);
        const response = await client.request(query);
        // @ts-ignore
        return response.posts;
    } catch (error) {

        console.error(error);
    }
}

async function getCategoriesResponse(query: string): Promise<any> {
    if (!graphqlAPI) return;
    try {
        const client = new GraphQLClient(graphqlAPI);
        const response = await client.request(query);
        // @ts-ignore
        return response.categories;
    } catch (error) {

        console.error(error);
    }
}
