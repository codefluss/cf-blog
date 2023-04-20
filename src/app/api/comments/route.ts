import { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient(graphqlAPI!, {
    headers: {
      authorization: `Bearer ${graphCMSToken!}`
    }
  });

  const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
          createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
      }
  `;
  console.log('fritz', req.body);
  const name = req.body.name;
  const email = req.body.email;
  const comment = req.body.comment;
  const slug = req.body.slug;
  
  try {
    const result = await graphQLClient.request(query, {
      // @ts-ignore
      name,
      // @ts-ignore
      email,
      // @ts-ignore
      comment,
      // @ts-ignore
      slug,
    });

    // @ts-ignore

    return res.json(result);
  } catch (error) {
    console.log(error);
    // @ts-ignore
    return res.json({ error: error });
  }
}
