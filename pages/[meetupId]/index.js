import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

//當有一個動態的url(meetupid)就會需要設定他的path
export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_CONNECT);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //set 1 代表只回傳_id
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    //設定為false時只有支援的path才會被顯示, 否則顯示404
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  //getStaticProps runs in build time
  //所以只會顯示在終端
  const client = await MongoClient.connect(process.env.DB_CONNECT);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 10,
  };
}
