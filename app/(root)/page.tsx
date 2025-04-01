import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { auth } from "@/auth";
import {desc} from 'drizzle-orm'
import { Book } from "@/types";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[];
  const result = await db.select().from(users);
  console.log(JSON.stringify(result,null,2));
  return (
    <>
    {/* @ts-ignore */}
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
      title="Latest books"
      // @ts-ignore
      books={latestBooks.slice(1)}
      containerClassName="mt-28"
      />
    </>
  );
}

export default Home;