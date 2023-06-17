import Wrapper from "@/components/Wrapper";
import { prisma } from "@/utils/prisma";
import Books from "../components/Books";
import Cookies from "js-cookie";

export default function Homepage(props) {
  if (props.error) {
    // Tangani kesalahan di sini jika diperlukan
    return <div>{props.error}</div>;
  }

  return (
    <Wrapper>
      {props.books.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </Wrapper>
  );
}

export async function getServerSideProps() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return {
      props: {
        books,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        error: "Something went wrong",
      },
    };
  }
}
