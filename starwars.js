import { play } from "./music.js";
import { toRoman } from "./roman.js";
import { restartAnimation } from "./restart-animation.js";

const API_ENDPOINT = "https://swapi.info/api";

// chamada da função play para reproduzir o tema de introdução
play(
  {
    audioUrl: "audio/tema-sw.mp3",
    coverImageUrl: "imgs/logo.svg",
    title: "Intro",
    artist: "John Williams",
  },
  document.body,
);

// ordena filmes por número do episódio
const ordenaFilmes = (a, b) => a.episode_id - b.episode_id;

// elemento <ul> onde os filmes serão adicionados
const ul = document.querySelector("#filmes ul");
const introEl = document.querySelector("pre.introducao");

// busca os filmes e cria os <li>
fetch(`${API_ENDPOINT}/films`)
  .then((response) => response.json())
  .then((data) => {
    // ordena os filmes por número do episódio
    data.sort(ordenaFilmes);

    // adiciona os filmes ao <ul>
    data.forEach((film) => {
      // converte o número do episódio para romano e adiciona ao <li>
      const episodeRoman = toRoman(film.episode_id).padEnd(3, " ");

      // cria o <li> e adiciona ao <ul>
      const li = document.createElement("li");

      // adiciona o texto ao <li>
      li.textContent = `Episode ${episodeRoman} - ${film.title}`;

      // adiciona o evento de clique ao <li>
      li.addEventListener("click", () => {
        const romano = toRoman(film.episode_id);
        introEl.textContent = `Episode ${romano}
${film.title}

${film.opening_crawl}`;

        // atualiza o texto e reinicia a animação
        restartAnimation(introEl);
      });
      // adiciona o <li> ao <ul>
      ul.appendChild(li);
    });
  })
  // lida com erros de busca de filmes
  .catch((error) => console.error("Erro:", error));
