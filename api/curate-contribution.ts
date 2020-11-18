require('dotenv').config();

import sanityClient from '@sanity/client';
import {NowRequest, NowResponse} from '@now/node';

const projectId = process.env.SANITY_PROJECT_ID;

const client = sanityClient({
  projectId,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async (req: NowRequest, res: NowResponse) => {
  const {docId, contributionType} = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (typeof docId !== 'string') {
    return res.status(400).json({
      error: 'Missing doc id',
    });
  }
  if (typeof contributionType !== 'string') {
    return res.status(400).json({
      error: 'Missing contribution type',
    });
  }

  const curatedDoc = {
    _id: `curated.${docId}`,
    _type: 'curatedContribution',
    contribution: {
      _type: 'reference',
      _ref: docId
    },
  }

  try {
    await client.createIfNotExists(curatedDoc)

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "We couldn't create the document",
    });
  }
};