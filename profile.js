
document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profile');

    const getCharacterById = async (characterId) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const character = await response.json();
            renderProfile(character);
        } catch (error) {
            console.error('Error fetching character data:', error);
        }
    };

    const renderProfile = (character) => {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');
        profileCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Location: ${character.location.name}</p>
            <p>Gender: ${character.gender}</p>
            <p>Species: ${character.species}</p>
            <!-- Add more details as needed -->
        `;
        profileContainer.appendChild(profileCard);
    };


    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    if (characterId) {
        getCharacterById(characterId);
    } else {
        console.error('Character ID not provided in the URL.');
    }
});
