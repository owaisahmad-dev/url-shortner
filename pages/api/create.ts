// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, UrlHash } from '@prisma/client'
import { sha256 } from '../../helpers';

const MAX_HASH_LENGTH = 64;
const HASH_LENGTH = 4;


interface CreateUrlHashDto {
  url: string;
}

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
    
export type CustomRequest = Override<NextApiRequest, { body: CreateUrlHashDto }>



export default async function handler(
  req: CustomRequest,
  res: NextApiResponse<UrlHash | string>
) {
  if(req.method !== "POST"){
    return res.status(401);
  }

  const prisma = new PrismaClient();
  const hash = await sha256(req.body.url);

  let i = 0;

  // checking if the hash exists
  while (i < MAX_HASH_LENGTH) {
    const hashSlice = hash.slice(i, HASH_LENGTH + i);
    const storedValue = await prisma.urlHash.findFirst({
      where: {
        hash: hashSlice,
      }
    })
    if(!storedValue) break;
    ++i;
  }

  if (i > MAX_HASH_LENGTH){
    res.status(500).send("Cannot shorten this URL");
  }

  const newHashEntry = await prisma.urlHash.create({
    data: {
      url: req.body.url,
      hash: hash.slice(i, HASH_LENGTH + i)
    }
  })

  return res.send(newHashEntry)
}
