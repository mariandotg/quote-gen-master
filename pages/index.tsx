import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [quote, setQuote] = useState("");

  const baseURL = "https://api.quotable.io/"

  const getQuote = async () => {
    try {
      const res = await axios.get(`${baseURL}random`);
      setQuote(res.data.content);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuote();
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{quote}</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
