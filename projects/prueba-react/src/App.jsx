import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;

        setFact(fact);
      });
  }, []);

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`
    ).then((response) => {
      const { url } = response;
      setImage(url);
    });
  }, [fact]);
  console.log(image);
  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {image && (
        <img
          src={image}
          alt={`Imagen extraida usando las primeras tres palabras de ${fact}`}
        />
      )}
    </main>
  );
}
