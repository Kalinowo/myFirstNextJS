import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Vzone</title>
        <meta name="description" content="oil oil de"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//Server side Render
//when to use - if you need access to concrete(具體) request object, you don't have req/res in getStaticProps
//and when you have data that change frequently
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

//Static Generation
export async function getStaticProps() {
  //normally you can only use fetch in the browser,
  //but in next you can use in server side code as well.
  const client = await MongoClient.connect(process.env.DB_CONNECT);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // [不確定]讓畫面每10秒更新一次/或是只有http request時才更新
    revalidate: 10,
  };
}
