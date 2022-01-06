import React from "react";
import Link from "next/link";
import { QuoteObject } from "../types";

const Quote = ({quote}: {quote: any}) => {
  const { _id, content, author, authorSlug, tags } = quote;
  console.log(quote)
  return (
    <>
      <h1>{content}</h1>
      <Link href={`/authors/${authorSlug}`}>
        <a>{author}</a>
      </Link>
      {tags?.map((tag: string) => {
          return <p key={tag}>{tag}</p>
      })}
    </>
  );
};

export default Quote;
