
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const filtersContainer = document.createElement('div');
  const detailsContainer = document.getElementById('details-container');
  filtersContainer.innerHTML = `
      <label>Status:
        <select class="st3" id="statusFilter">
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label>Location:
        <input type="text" id="locationFilter">
      </label>
      <label>Episode:
        <input type="text" id="episodeFilter">
      </label>
      <label>Gender:
        <select id="genderFilter">
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label>Search by Name:
        <input type="text" id="nameSearch" placeholder="Enter character name">
      </label>
      <button onclick="applyFilters()">Apply Filters</button>
    `;
  appContainer.appendChild(filtersContainer);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      renderCharacters(data.results);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  window.applyFilters = () => {
    const statusFilter = document.getElementById('statusFilter').value;
    const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
    const episodeFilter = document.getElementById('episodeFilter').value.toLowerCase();
    const genderFilter = document.getElementById('genderFilter').value;
    const nameSearch = document.getElementById('nameSearch').value.toLowerCase();

    fetch(`https://rickandmortyapi.com/api/character?status=${statusFilter}&location=${locationFilter}&gender=${genderFilter}&episode=${episodeFilter}`)
      .then(response => response.json())
      .then(data => {
        const filteredCharacters = data.results.filter(character =>
          character.name.toLowerCase().includes(nameSearch)
        );
        renderCharacters(filteredCharacters);
      })
      .catch(error => console.error('Error fetching filtered data:', error));
  };

  const renderCharacters = (characters) => {
    appContainer.innerHTML = '';
    characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <h3>${character.name}</h3>
          <p>Status: ${character.status}</p>
          <p>Location: ${character.location.name}</p>
          
          <p>Number of Episodes: ${character.episode.length}</p>
    
          <p>Gender: ${character.gender}</p>
        `;

      card.addEventListener('click', () => {
       
        fetchCharacterDetails(character.id);
      });
      appContainer.appendChild(card);
    });
  };


  const fetchCharacterDetails = async (characterId) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const characterDetails = await response.json();

      displayCharacterDetails(characterDetails);

      
      console.log('Character Details:', characterDetails);
      
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const displayCharacterDetails = (characterDetails) => {
    
    const newWindow = window.open('', '_blank');
    
  
    if (newWindow) {
      
      const detailsElement = newWindow.document.createElement('div');
      detailsElement.style.border = '1px solid #ccc';
      detailsElement.style.padding = '20px';
      
      detailsElement.innerHTML = `
        <h2 style="color: #333;">${characterDetails.name}</h2>
        <img src="${characterDetails.image}" alt="${characterDetails.episode}" style="max-width: 100%;">
        <p>Species: ${characterDetails.species}</p>
        <p>Gender: ${characterDetails.gender}</p>
        <p>Status: ${characterDetails.status}</p>
        <p>Residents: ${characterDetails.location.name}</p>
        <p>Origin: ${characterDetails.location.url}</p>
        <p>Episode Name: ${characterDetails.episode.length}</p>
      `;
  
      
      newWindow.document.body.appendChild(detailsElement);
    } else {
      console.error('Unable to open a new window.');
    }
  };
  




  const initializeFilters = () => {
    const statusFilter = localStorage.getItem('statusFilter') || '';
    const locationFilter = localStorage.getItem('locationFilter') || '';
    const episodeFilter = localStorage.getItem('episodeFilter') || '';
    const genderFilter = localStorage.getItem('genderFilter') || '';
    const nameSearch = localStorage.getItem('nameSearch') || '';

    document.getElementById('statusFilter').value = statusFilter;
    document.getElementById('locationFilter').value = locationFilter;
    document.getElementById('episodeFilter').value = episodeFilter;
    document.getElementById('genderFilter').value = genderFilter;
    document.getElementById('nameSearch').value = nameSearch;



    applyFilters();
  };


  initializeFilters();
  fetchCharacters();
});

window.addEventListener('beforeunload', () => {
  const statusFilter = document.getElementById('statusFilter').value;
  const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
  const episodeFilter = document.getElementById('episodeFilter').value.toLowerCase();
  const genderFilter = document.getElementById('genderFilter').value;
  const nameSearch = document.getElementById('nameSearch').value.toLowerCase();

  localStorage.setItem('statusFilter', statusFilter);
  localStorage.setItem('locationFilter', locationFilter);
  localStorage.setItem('episodeFilter', episodeFilter);
  localStorage.setItem('genderFilter', genderFilter);
  localStorage.setItem('nameSearch', nameSearch);
});

end//











