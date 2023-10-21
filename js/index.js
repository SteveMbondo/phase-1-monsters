document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const monsterForm = document.getElementById('monster-form');
    const loadMoreButton = document.getElementById('load-more');
    let currentPage = 1;
  
    const fetchMonsters = (page, limit = 50) => {
      return fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(response => response.json());
    };
  
    fetchMonsters(currentPage)
      .then(monsters => displayMonsters(monsters));
  
    monsterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
      const newMonster = { name, age, description };
  
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newMonster)
      })
        .then(response => response.json())
        .then(data => {
          const newMonsters = [data];
          displayMonsters(newMonsters);
        });
  
      monsterForm.reset();
    });
    const displayMonsters = (monsters) => {
        monsters.forEach(monster => {
          const monsterDiv = document.createElement('div');
          monsterDiv.innerHTML = `
            <h3>Name: ${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
        });
      };
  
    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters(currentPage)
        .then(monsters => displayMonsters(monsters));
    });
  });
  