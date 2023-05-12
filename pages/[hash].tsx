import { UrlHash } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/landing.module.css'

const Redirect: NextPage = () => {
  const router = useRouter();

  const getUrlHash = async (hash: string) => {
    const urlHash = await axios.get<UrlHash>(`./api/get/${hash}`);
    if(urlHash.status == 200){
      router.replace(urlHash.data.url);
    }
    else router.replace("/")
  }

  useEffect(() => {
    const hash = router.query.hash
    if(hash){
      getUrlHash(hash as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className={styles.container}>

    </div>     
  )
}

export default Redirect
