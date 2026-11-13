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
    <div className="flex h-80 flex-col items-center gap-10 px-6 pt-8 bg-img md:h-[220px]">
      <IpContext.Provider value={data}>
        <SearchBar onSubmit={submitState} />
        <div className="address-container">
          <ContentBar />
        </div>
      </IpContext.Provider>
    </div>
  );
}

export default App;
