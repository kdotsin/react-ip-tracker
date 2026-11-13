import IpContext from "./context/IpContext.ts";
import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import useFetch from "./hooks/useFetch.ts";
import ContentBar from "./components/ContentBar.tsx";
import MapView from "./components/MapView.tsx";

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
    <IpContext.Provider value={data}>
      <div className="flex h-dvh flex-col">
        <header className="flex h-80 shrink-0 flex-col items-center gap-10 px-6 pt-8 bg-img md:h-[220px]">
          <SearchBar onSubmit={submitState} />
          <div className="address-container relative z-10 w-full">
            <ContentBar />
          </div>
        </header>
        <main className="isolate flex-1">
          <MapView />
        </main>
      </div>
    </IpContext.Provider>
  );
}

export default App;
