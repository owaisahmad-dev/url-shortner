import { UrlHash } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'
import styles from '../styles/landing.module.css'

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewUrl = async () => {
    const {status, data} = await axios.post<UrlHash>('./api/create', {url})
    if(status === 200){
      setResult(data.hash)
    }
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    createNewUrl();
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.greet}>Welcome to short.ner :))</h1>
      <div className={styles.inputBox}>
        <input disabled={isLoading} name="url" value={url} onChange={e => setUrl(e.target.value)} placeholder='Enter url here'/>
        <button onClick={handleSubmit}>Shorten!</button>
      </div>
      <div className={styles.resultBox}>
        {result && <>NEW URL: <Link href={`http://short.ner/${result}`}>{`http://short.ner/${result}`}</Link></>}
      </div>
    </div>     
  )
}

export default Home
