async function getWordLocalDatabase(word) {
    const url = "http://localhost:8080/api/entries/" + word;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const results = await response.json();
        // console.log(results);
        return results;
    } catch (error) {
        console.error(error.message);
        return null;
    }

}

async function getWordDictionaryAPI(word) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const results = await response.json();
        // console.log(results);
        return results;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function getResult(word) {
    word = word.toLowerCase();
    // word[0] = word[0].toUpperCase();
    const results_localdatabase = await getWordLocalDatabase(word); 
    console.log(results_localdatabase);
    console.log(results_localdatabase.word_type);
    console.log(results_localdatabase.definition);
    const results_dictionaryapi = await getWordDictionaryAPI(word);
    // console.log(results_dictionaryapi);

    const reading = results_dictionaryapi ? results_dictionaryapi[0].phonetic : null;
    let result_item = ""; 
    let result_items = [];
    let meaning_groups = "";
    let word_type = null;

    if (results_localdatabase != undefined) {

        // for (let i = 0; i < results_localdatabase.length; i++) {
        for (let i = 0; i < 1; i++) {
            let result = results_localdatabase;
            word_type = result.wordtype;
            let definition = result.definition;

            meaning_groups += `
                <li>${definition}</li>
            `;
        }

        result_item = `
            <div class="result-item">
                <div class="word-section">
                    <div class="word-main">
                        <span class="word">${word}</span>
                        <span class="reading">${reading}</span>
                        <span class="source-db">Local Database</span>
                    </div>
                    <div class="tags">
                        <span class="tag tag-common">Common word</span>
                        <span class="tag tag-level">A1</span>
                    </div>
                </div>
                <div class="meanings-section">
                    <div class="meaning-group">
                        <div class="pos">${word_type}</div>
                        <ol class="definitions">
                            ${meaning_groups}
                        </ol>
                    </div>
                </div>
            </div>
        `

        result_items.push(result_item);
    }

    if (results_dictionaryapi != undefined) {
        for (let i = 0; i < results_dictionaryapi.length; i++) {
            let result = results_dictionaryapi[i];
            let word = result.word.toLowerCase();
            let phonetic = result.phonetic || result.phonetics[0].text || "/nodata/";
            let meanings = result.meanings;
            let meanings_str = "";

            for (let j = 0; j < meanings.length; j++) {
                let meaning = meanings[j];
                let partOfSpeech = meaning.partOfSpeech;
                let definitions = meaning.definitions;
                let meaning_str = "";

                for (let k = 0; k < definitions.length; k++) {
                    let definition = definitions[k].definition;
                    meaning_str += `<li>${definition}</li>`;
                }

                meanings_str += `
                    <div class="meaning-group">
                        <div class="pos">${partOfSpeech}</div>
                        <ol class="definitions">
                            ${meaning_str}
                        </ol>
                    </div>
                `

                result_item = `
                    <div class="result-item">
                        <div class="word-section">
                            <div class="word-main">
                                <span class="word">${word}</span>
                                <span class="reading">${phonetic}</span>
                                <span class="source-api">Free Dictionary API</span>
                            </div>
                            <div class="tags">
                                <span class="tag tag-common">Common word</span>
                                <span class="tag tag-level">A1</span>
                            </div>
                        </div>
                        <div class="meanings-section">
                            ${meanings_str}
                        </div>
                    </div>
                `

                result_items.push(result_item);
            }
        }
    }

    if (result_items.length === 0) {
        result_items.push(`
            <div class="wordnotfound">
                Word not found, sorry, we tried our best, sincerely.
            </div>
        `)
    }

    return result_items
}

export async function updateResultItems(word) {
    const result_items = await getResult(word);
    const results_container = document.getElementById("resultsContainer");
    results_container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (const item of result_items) {
        const div = document.createElement("div");
        div.innerHTML = item;
        fragment.appendChild(div.firstElementChild);
    }

    results_container.appendChild(fragment);
}