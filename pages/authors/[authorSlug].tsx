import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { QuoteObject } from "../../types";

const AuthorPage = ({ quotes }: { quotes: QuoteObject[] }) => {
  const router = useRouter();
  const { pid } = router.query;
  //author
  //del author salen las tags
  console.log(quotes);
  return (
    <>
      <p>hoafks</p>
      {quotes.map((quote) => (
        <div key={quote._id}>
          <p>{quote.content}</p>
          <p>{quote.author}</p>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(
    `https://api.quotable.io/quotes?author=${context.params?.authorSlug}`
  );
  console.log("data: ", res.data.results);
  const author = res.data;
  const quotes = res.data.results;
  return {
    props: {
      quotes,
    },
  };
};

export default AuthorPage;
