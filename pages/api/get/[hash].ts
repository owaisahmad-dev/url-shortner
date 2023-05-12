// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, UrlHash } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UrlHash | string>
) {
  if(req.method !== "GET"){
    return res.status(401);
  }

  const prisma = new PrismaClient();
  const hash  = req.query.hash as string;

  const hashEntry = await prisma.urlHash.findFirst({where: {
    hash: hash
  }})

  if(!hashEntry){
    return res.status(404).send("Cannot find the specified URL");
  }

  return res.send(hashEntry)
}
