import { request, gql } from 'graphql-request';
import { Category } from '@/shared/interfaces/category';
import { CommentDto } from '@/shared/dtos/comment.dto';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query GetPosts {
            postsConnection {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
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
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI!, query);
    // @ts-ignore
    return result.postsConnection.edges;
}

export const getPostDetail = async (slug: string) => {
    const query = gql`
        query GetPostDetails($slug : String!) {
            post(where: {slug: $slug}) {
                title
                excerpt
                featuredImage {
                    url
                }
                author{
                    name
                    bio
                    photo {
                        url
                    }
                }
                createdAt
                slug
                content {
                    raw
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    const result = await request(graphqlAPI!, query, { slug });
    // @ts-ignore
    return result.post;
};

export const getSimilarPosts = async (categories: Category[], slug: string) => {
    const query = gql`
        query GetSimilarPosts($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
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
    const result = await request(graphqlAPI!, query, { slug, categories });
    // @ts-ignore
    return result.posts;
};

export const getRecentPosts = async () => {
    const query = gql`
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
    const result = await request(graphqlAPI!, query);
    // @ts-ignore
    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query GetGCategories {
            categories {
                name
                slug
            }
        }
    `;
    const result = await request(graphqlAPI!, query);
    // @ts-ignore
    return result.categories;
};


export const submitComment = async (commentDto: CommentDto) => {
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}})
            { id }
        }
    `;
    const { name, email, slug, comment } = commentDto;
    return request(graphqlAPI!, query, { name, email, slug, comment });
}

export const getComments = async (slug: string) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments (where: { post: { slug: $slug }}){
                name
                createdAt
                comment
            }
        }
    `;
    const result = await request(graphqlAPI!, query, { slug });
    // @ts-ignore
    return result.comments;
};
