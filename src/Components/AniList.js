import React from "react";

function AniList({ aniList }) {
  return (
    <div>
      <h2>anime</h2>

      {aniList &&
        aniList.map((anime, i) => (
          <main>
            <h4>{anime.title}</h4>
            <ul key={i}>
              <li>{anime}</li>
              <img src={anime.images.jpg.image_url} alt="animeImage" />
            </ul>
          </main>
        ))}
    </div>
  );
}

export default AniList;
