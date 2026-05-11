// friendlyFetch: substitui o fetch nativo adicionando cache no localStorage
// Se a URL já foi requisitada antes, retorna os dados salvos sem chamar a API

export async function friendlyFetch(url) {
	// Verifica se já temos os dados desta URL salvos no cache
	const cached = localStorage.getItem(url);

	if (cached) {
		// Se existir, retorna o objeto (desserializando de JSON para objeto JS)
		return JSON.parse(cached);
	}

	// Se não existir no cache, faz a requisição real
	const response = await fetch(url);
	const data = await response.json();

	// Salva no localStorage (serializando de objeto JS para string JSON)
	localStorage.setItem(url, JSON.stringify(data));

	// Retorna os dados para quem chamou
	return data;
}
