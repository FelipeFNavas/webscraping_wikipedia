import axios from "axios";
import cheerio from "cheerio";

const url = "https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme";

async function getMovies() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const movies_list = [];
  $(".wikitable tbody tr").each((i, elem) => {
    const movie_name = $(elem)
      .find('td[style*="background:#FAEB86"]')
      .last()
      .text()
      .replace("\n", "");

    if (movie_name) {
      const movie_year = $(elem)
        .find('td[style*="background:#FAEB86"]')
        .first()
        .prev("td")
        .text()
        .slice(-5)
        .replace("\n", "");

      movies_list.push({ name: movie_name, year: movie_year });
    }
  });

  console.log(movies_list);
}

getMovies();
