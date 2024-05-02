fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    processRecommendations(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function processRecommendations(data) {
 
  const searchInput = document.querySelector('input[type="text"]');
  const searchResultsContainer = document.getElementById('search-results');

  searchInput.addEventListener('keyup', function(event) {
    const query = event.target.value.toLowerCase();
    const searchResults = [];


    data.countries.forEach(country => {
      if (country.name.toLowerCase().includes(query)) {
        searchResults.push(country);
      }
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(query)) {
          searchResults.push(city);
        }
      });
    });


    data.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(query)) {
        searchResults.push(temple);
      }
    });

    data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(query)) {
        searchResults.push(beach);
      }
    });

    displaySearchResults(searchResults);
  });

  function displaySearchResults(results) {

    searchResultsContainer.innerHTML = '';


    results.forEach(result => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('search-result');

      const resultName = document.createElement('h3');
      resultName.textContent = result.name;
      resultDiv.appendChild(resultName);

      const resultImage = document.createElement('img');
      resultImage.src = result.imageUrl;
      resultImage.alt = result.name;
      resultDiv.appendChild(resultImage);

      const resultDescription = document.createElement('p');
      resultDescription.textContent = result.description;
      resultDiv.appendChild(resultDescription);

      searchResultsContainer.appendChild(resultDiv);
    });

    // Show search results container
    searchResultsContainer.style.display = 'block';
  }
}
