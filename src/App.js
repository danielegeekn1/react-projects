import { useEffect, useState } from "react";
import AniList from "./Components/AniList";

//import { ANI_API_URL } from "./Api";
function App() {
  const [aniResp, setAniResp] = useState();
  const fetchAnime = async () => {
    const fetchAni = await fetch(
      " https://api.jikan.moe/v4/anime?q=naruto&sfw"
    );
    const fetchAniResp = await fetchAni.json();
    const aniMapResp = Object.entries(fetchAniResp);
    console.log(aniMapResp);

    setAniResp(aniMapResp.data);
  };
  useEffect(() => {
    fetchAnime();
  }, []);
  return (
    <div className="App">
      <AniList aniList={aniResp} />
      <button onClick={fetchAnime}>fetch</button>
    </div>
  );
}

export default App;
