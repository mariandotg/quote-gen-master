import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuoteObject } from "../types";


const Home: NextPage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [authorQuotes, setAuthorQuotes] = useState<QuoteObject[]>([]);

  const baseURL = "https://api.quotable.io/";

  const getQuotesOfAuthor = async (author: string) => {
    try {
      const res = await fetch(`${baseURL}quotes?author=${author}`);
      const result = await axios.get(`${baseURL}quotes?author=${author}`);
      //const result = await res.json();
      setAuthorQuotes(result.data.results);
      console.log("result.data ", result.data);
      console.log("result.data.results ", result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuote = async () => {
    try {
      const res = await axios.get(`${baseURL}random`);
      setQuote(res.data.content);
      setAuthor(res.data.authorSlug);
      setTags(res.data.tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={getQuote}>New quote</button>
        <h1>{quote}</h1>
        <Link href={`/authors/${author}`}>{author}</Link>
        <p>{tags}</p>
        {authorQuotes.length !== 0 ? (
          authorQuotes.map((quote) => <p key={quote._id}>{quote.content}{" "}{quote.authorSlug}</p>)
        ) : (
          <p>nada</p>
        )}
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
