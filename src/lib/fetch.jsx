
export async function getGenres() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY
        }&dates=2023-01-01,2024-01-01`
    );
    const json = await response.json();
    return json.results;
}



export async function getPlatforms() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY
        }&dates=2023-01-01,2024-01-01`
    );
    const json = await response.json();
    return json.results;
}


export async function preLoaderFilters() {
  try {
    const genres = await getGenres();
    const platforms = await getPlatforms();
    // console.log("Platforms:", platforms);
    return { genres, platforms }; 
  } catch (error) {
    console.error(error);
  }

}

