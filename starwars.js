import { play } from "./music.js";
import { toRoman } from "./roman.js";

const API_ENDPOINT = "https://swapi.info/api";

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

// busca os filmes e cria os <li>
fetch(`${API_ENDPOINT}/films`)
	.then((response) => response.json())
	.then((data) => {
		data.sort(ordenaFilmes);
		data.forEach((film) => {
			const episodeRoman = toRoman(film.episode_id).padEnd(3, " ");
			const li = document.createElement("li");
			li.textContent = `Episode ${episodeRoman} - ${film.title}`;
			ul.appendChild(li);
		});
	})
	.catch((error) => console.error("Erro:", error));
