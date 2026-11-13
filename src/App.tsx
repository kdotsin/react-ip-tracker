import IpContext from "./context/IpContext.ts";
import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import useFetch from "./hooks/useFetch.ts";
import ContentBar from "./components/ContentBar.tsx";

function App() {
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data } = useFetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_UAFQBYZUGgSsKTTEmqICIWGKZkZRL&ipAddress=",
    submittedQuery,
  );

  function submitState(input: string) {
    setSubmittedQuery(input);
    console.log(`submittedQuery ${submittedQuery}`);
    console.log(data);
  }

  return (
    <div>
      <IpContext.Provider value={data}>
        <SearchBar onSubmit={submitState} />
        <ContentBar />
      </IpContext.Provider>
      {data?.ip}
      {data?.isp}
      {data?.location.city}
    </div>
  );
}

export default App;
