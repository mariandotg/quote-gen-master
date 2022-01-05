import type { GetServerSideProps } from "next";
import axios from "axios";
import { QuoteObject } from "../../types";

const AuthorPage = ({ quotes }: { quotes: QuoteObject[] }) => {
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
    `${process.env.BASE_URL}quotes?author=${context.params?.authorSlug}`
  );
  const quotes = res.data.results;
  return {
    props: {
      quotes,
    },
  };
};

export default AuthorPage;
