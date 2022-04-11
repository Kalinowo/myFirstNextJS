import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    axios.post("/api/new-meetup", enteredMeetupData).then((data) => {
      console.log(data);
    });
    //replace確保不能使用back回到上一頁
    router.replace("/");
    // const response = await fetch("/api/new-meetup", {
    //   method: "POST",
    //   body: JSON.stringify(enteredMeetupData),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // console.log(data);
  }
  return (
    <>
      <Head>
        <title>Add a N ew Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunites"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
