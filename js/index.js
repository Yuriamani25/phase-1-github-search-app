document.getElementById('github-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search').value;
  
    try {
      // Fetch users from GitHub User Search Endpoint
      const users = await searchGitHubUsers(searchQuery);
      displayUsers(users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  });
  
  document.getElementById('user-list').addEventListener('click', async function(event) {
    if (event.target.tagName === 'LI') {
      const username = event.target.dataset.username;
      
      try {
        // Fetch repositories from GitHub User Repos Endpoint
        const repos = await getUserRepositories(username);
        displayRepositories(repos);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  });
  
  async function searchGitHubUsers(query) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    return data.items;
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.login;
      li.dataset.username = user.login;
      userList.appendChild(li);
    });
  }
  
  async function getUserRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    return data;
  }
  
  function displayRepositories(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.textContent = repo.name;
      reposList.appendChild(li);
    });
  }
  