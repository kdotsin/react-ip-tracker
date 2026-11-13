import useFetch from "./hooks/useFetch.ts";
import IpContext from "./context/IpContext.ts";

function App() {
  const { data } = useFetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_UAFQBYZUGgSsKTTEmqICIWGKZkZRL&ipAddress=",
    "8.8.8.8",
  );
  return (
    <IpContext.Provider value={data}>
      <div>
        <h1>hello world</h1>
        <div>
          {data?.ip}
          {data?.location.city}
        </div>
      </div>
    </IpContext.Provider>
  );
}

export default App;
