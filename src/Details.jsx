import { useParams } from "react-router";

export default function Details() {
  let params = useParams();
  console.log(params);

  return (
    <>
      <h1>this is detail</h1>{" "}
    </>
  );
}
