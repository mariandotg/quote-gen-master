import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuoteObject } from "../types";
import Quote from "../components/Quote";

const Home: NextPage = () => {
  const [quote, setQuote] = useState({});

  const getQuote = async () => {
    try {
      const res = await axios.get(`${process.env.BASE_URL}random`);
      setQuote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedQuote = JSON.parse(localStorage.getItem("Quote.randomQuote")!);
    if (storedQuote) {
      setQuote(storedQuote);
    } else getQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem("Quote.randomQuote", JSON.stringify(quote));
  }, [quote]);

  const { _id, content, author, authorSlug, tags }: any = quote;

  return (
    <div className={styles.container}>
      <Head>
        <title>Quote</title>
        <meta name="description" content="Random famous quotes generator" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <button onClick={getQuote}>New quote</button>
        <Quote quote={quote} />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
