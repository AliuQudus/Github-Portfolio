// // State management
// let state = {
//   username: "",
//   loading: false,
//   error: "",
//   userData: null,
//   repos: [],
//   readme: null,
//   showPortfolio: false,
// };

// function setState(newState) {
//   state = { ...state, ...newState };
//   render();
// }

// // API Functions
// async function fetchGitHubData() {
//   if (!state.username.trim()) {
//     setState({ error: "Please enter a GitHub username" });
//     return;
//   }

//   setState({ loading: true, error: "", showPortfolio: false });

//   try {
//     const userResponse = await fetch(
//       `https://api.github.com/users/${state.username}`
//     );
//     if (!userResponse.ok) {
//       throw new Error("User not found");
//     }
//     const user = await userResponse.json();

//     const reposResponse = await fetch(
//       `https://api.github.com/users/${state.username}/repos?sort=updated&per_page=6`
//     );
//     const reposData = await reposResponse.json();

//     let readme = null;
//     try {
//       const readmeResponse = await fetch(
//         `https://api.github.com/repos/${state.username}/${state.username}/readme`,
//         {
//           headers: { Accept: "application/vnd.github.v3.raw" },
//         }
//       );
//       if (readmeResponse.ok) {
//         const readmeText = await readmeResponse.text();
//         readme = marked.parse(readmeText);
//       }
//     } catch (e) {
//       console.log("No profile README found");
//     }

//     setState({
//       userData: user,
//       repos: reposData,
//       readme: readme,
//       showPortfolio: true,
//       loading: false,
//     });
//   } catch (err) {
//     setState({
//       error: err.message || "Failed to fetch GitHub data",
//       loading: false,
//     });
//   }
// }

// // Render Functions
// function renderPortfolio() {
//   const { userData, repos, readme } = state;

//   return `
//     <div class="min-h-screen bg-zinc-900 text-gray-100">
//       <div class="bg-zinc-800 border-b border-zinc-700">
//         <div class="max-w-6xl mx-auto px-6 py-8">
//           <button onclick="setState({ showPortfolio: false, username: '', userData: null, repos: [], readme: null })" 
//                   class="mb-6 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-100 rounded transition">
//             ← Generate New Portfolio
//           </button>
          
//           <div class="flex flex-col md:flex-row items-center gap-8">
//             <img src="${userData.avatar_url}" alt="${userData.name}" 
//                  class="w-40 h-40 rounded-full border-2 border-zinc-600">
//             <div class="text-center md:text-left flex-1">
//               <h1 class="text-5xl font-bold mb-2 text-gray-100">${
//                 userData.name || userData.login
//               }</h1>
//               <p class="text-xl text-gray-400 mb-4">@${userData.login}</p>
//               ${
//                 userData.bio
//                   ? `<p class="text-lg text-gray-300 mb-4">${userData.bio}</p>`
//                   : ""
//               }
              
//               <div class="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400">
//                 ${
//                   userData.location
//                     ? `
//                   <div class="flex items-center gap-1">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                     </svg>
//                     <span>${userData.location}</span>
//                   </div>
//                 `
//                     : ""
//                 }
//                 ${
//                   userData.email
//                     ? `
//                   <div class="flex items-center gap-1">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                     </svg>
//                     <span>${userData.email}</span>
//                   </div>
//                 `
//                     : ""
//                 }
//                 ${
//                   userData.blog
//                     ? `
//                   <a href="${userData.blog}" target="_blank" rel="noopener noreferrer" 
//                      class="flex items-center gap-1 hover:text-gray-200">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
//                     </svg>
//                     <span>Website</span>
//                   </a>
//                 `
//                     : ""
//                 }
//                 ${
//                   userData.company
//                     ? `
//                   <div class="flex items-center gap-1">
//                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
//                     </svg>
//                     <span>${userData.company}</span>
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//             </div>
//           </div>

//           <div class="grid grid-cols-3 gap-4 mt-8">
//             <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
//               <div class="text-3xl font-bold text-gray-100">${
//                 userData.public_repos
//               }</div>
//               <div class="text-sm text-gray-400">Repositories</div>
//             </div>
//             <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
//               <div class="text-3xl font-bold text-gray-100">${
//                 userData.followers
//               }</div>
//               <div class="text-sm text-gray-400">Followers</div>
//             </div>
//             <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
//               <div class="text-3xl font-bold text-gray-100">${
//                 userData.following
//               }</div>
//               <div class="text-sm text-gray-400">Following</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       ${
//         readme
//           ? `
//         <div class="max-w-6xl mx-auto px-6 py-12">
//           <div class="bg-zinc-800 border border-zinc-700 rounded p-8">
//             <h2 class="text-3xl font-bold mb-6 text-gray-100 flex items-center gap-2">
//               <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
//               </svg>
//               About Me
//             </h2>
//             <div class="markdown-content text-gray-300">
//               ${readme}
//             </div>
//           </div>
//         </div>
//       `
//           : ""
//       }

//       <div class="max-w-6xl mx-auto px-6 py-12">
//         <h2 class="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
//           <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
//           </svg>
//           Recent Projects
//         </h2>
//         <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           ${repos
//             .map(
//               (repo) => `
//             <a href="${
//               repo.html_url
//             }" target="_blank" rel="noopener noreferrer" 
//                class="bg-zinc-800 border border-zinc-700 rounded p-6 hover:border-zinc-600 transition group">
//               <h3 class="text-xl font-semibold mb-2 text-gray-100 group-hover:text-white">${
//                 repo.name
//               }</h3>
//               <p class="text-gray-400 text-sm mb-4 line-clamp-2">
//                 ${repo.description || "No description available"}
//               </p>
              
//               <div class="flex gap-4 text-sm text-gray-500">
//                 <div class="flex items-center gap-1">
//                   <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                   </svg>
//                   <span>${repo.stargazers_count}</span>
//                 </div>
//                 <div class="flex items-center gap-1">
//                   <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
//                   </svg>
//                   <span>${repo.forks_count}</span>
//                 </div>
//                 ${
//                   repo.language
//                     ? `
//                   <div class="flex items-center gap-1">
//                     <div class="w-3 h-3 rounded-full bg-gray-500"></div>
//                     <span>${repo.language}</span>
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//             </a>
//           `
//             )
//             .join("")}
//         </div>
//       </div>

//       <div class="bg-zinc-800 border-t border-zinc-700 mt-12">
//         <div class="max-w-6xl mx-auto px-6 py-8 text-center">
//           <a href="${
//             userData.html_url
//           }" target="_blank" rel="noopener noreferrer" 
//              class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-gray-100 rounded transition text-lg font-semibold">
//             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
//             </svg>
//             View GitHub Profile
//           </a>
//         </div>
//       </div>
//     </div>
//   `;
// }

// function renderInput() {
//   return `
//     <div class="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
//       <div class="bg-zinc-800 border border-zinc-700 rounded p-8 max-w-md w-full">
//         <div class="text-center mb-8">
//           <svg class="w-16 h-16 mx-auto mb-4 text-gray-100" fill="currentColor" viewBox="0 0 24 24">
//             <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
//           </svg>
//           <h1 class="text-4xl font-bold text-gray-100 mb-2">Portfolio Generator</h1>
//           <p class="text-gray-400">Generate a portfolio from your GitHub profile</p>
//         </div>

//         <div class="space-y-4">
//           <div>
//             <label class="block text-gray-300 text-sm font-semibold mb-2">GitHub Username</label>
//             <input 
//               type="text" 
//               id="username-input"
//               value="${state.username}"
//               placeholder="octocat"
//               class="w-full px-4 py-3 rounded bg-zinc-700 border border-zinc-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
//               onkeypress="if(event.key === 'Enter') fetchGitHubData()"
//             >
//           </div>

//           ${
//             state.error
//               ? `
//             <div class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
//               ${state.error}
//             </div>
//           `
//               : ""
//           }

//           <button 
//             onclick="fetchGitHubData()"
//             ${state.loading ? "disabled" : ""}
//             class="w-full bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 text-gray-100 font-semibold py-3 px-6 rounded transition duration-200 flex items-center justify-center gap-2">
//             ${
//               state.loading
//                 ? `
//               <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-100"></div>
//               <span>Generating...</span>
//             `
//                 : `
//               <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
//               </svg>
//               <span>Generate Portfolio</span>
//             `
//             }
//           </button>
//         </div>

//         <p class="text-center text-gray-500 text-sm mt-6">
//           Enter any GitHub username to create an instant portfolio
//         </p>
//       </div>
//     </div>
//   `;
// }

// function render() {
//   const app = document.getElementById("app");
//   app.innerHTML = state.showPortfolio ? renderPortfolio() : renderInput();

//   if (!state.showPortfolio) {
//     const input = document.getElementById("username-input");
//     if (input) {
//       input.addEventListener("input", (e) => {
//         state.username = e.target.value;
//       });
//     }
//   }
// }

// // Initialize app
// render();


// Initialize user count
function initUserCount() {
  if (!localStorage.getItem('portfolioUserCount')) {
    localStorage.setItem('portfolioUserCount', '0');
  }
}

function incrementUserCount() {
  const currentCount = parseInt(localStorage.getItem('portfolioUserCount') || '0');
  const newCount = currentCount + 1;
  localStorage.setItem('portfolioUserCount', newCount.toString());
  return newCount;
}

function getUserCount() {
  return parseInt(localStorage.getItem('portfolioUserCount') || '0');
}

// State management
let state = {
  username: "",
  loading: false,
  error: "",
  userData: null,
  repos: [],
  readme: null,
  showPortfolio: false,
  githubToken: "",
  userCount: getUserCount(),
};

function setState(newState) {
  state = { ...state, ...newState };
  render();
}

async function fetchGitHubData() {
  if (!state.username.trim()) {
    setState({ error: "Please enter a GitHub username" });
    return;
  }

  setState({ loading: true, error: "", showPortfolio: false });

  try {
    const headers = {};
    if (state.githubToken) {
      headers['Authorization'] = `token ${state.githubToken}`;
    }

    const userResponse = await fetch(
      `https://api.github.com/users/${state.username}`,
      { headers }
    );
    if (!userResponse.ok) {
      throw new Error("User not found");
    }
    const user = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${state.username}/repos?sort=updated&per_page=100`,
      { headers }
    );
    const reposData = await reposResponse.json();

    let readme = null;
    try {
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${state.username}/${state.username}/readme`,
        {
          headers: { 
            Accept: "application/vnd.github.v3.raw",
            ...(state.githubToken ? { Authorization: `token ${state.githubToken}` } : {})
          },
        }
      );
      if (readmeResponse.ok) {
        const readmeText = await readmeResponse.text();
        readme = marked.parse(readmeText);
      }
    } catch (e) {
      console.log("No profile README found");
    }

    const newCount = incrementUserCount();

    setState({
      userData: user,
      repos: reposData,
      readme: readme,
      showPortfolio: true,
      loading: false,
      userCount: newCount,
    });
  } catch (err) {
    setState({
      error: err.message || "Failed to fetch GitHub data",
      loading: false,
    });
  }
}

function openShareModal() {
  const modal = document.getElementById('share-modal');
  const shareLink = document.getElementById('share-link');
  const baseUrl = window.location.href.split('?')[0];
  const portfolioUrl = `${baseUrl}?user=${state.username}`;
  shareLink.value = portfolioUrl;
  modal.classList.add('active');
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  modal.classList.remove('active');
}

function copyShareLink() {
  const shareLink = document.getElementById('share-link');
  shareLink.select();
  document.execCommand('copy');
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => {
    btn.textContent = originalText;
  }, 2000);
}

function downloadPortfolio() {
  const portfolioHTML = generateFullPortfolioHTML();
  const blob = new Blob([portfolioHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.username}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateFullPortfolioHTML() {
  const { userData } = state;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${userData.name || userData.login} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; background-color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .private-repo { opacity: 0.6; cursor: not-allowed; pointer-events: none; }
  </style>
</head>
<body>
  ${renderPortfolioContent()}
</body>
</html>`;
}

function renderPortfolioContent() {
  const { userData, repos, readme } = state;
  const publicRepos = repos.filter(r => !r.private);
  const privateRepos = repos.filter(r => r.private);

  return `
<div class="min-h-screen bg-zinc-900 text-gray-100">
  <div class="bg-zinc-800 border-b border-zinc-700">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <img src="${userData.avatar_url}" alt="${userData.name}" class="w-40 h-40 rounded-full border-2 border-zinc-600">
        <div class="text-center md:text-left flex-1">
          <h1 class="text-5xl font-bold mb-2 text-gray-100">${userData.name || userData.login}</h1>
          <p class="text-xl text-gray-400 mb-4">@${userData.login}</p>
          ${userData.bio ? `<p class="text-lg text-gray-300 mb-4">${userData.bio}</p>` : ""}
          <div class="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400">
            ${userData.location ? `<div class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>${userData.location}</span></div>` : ""}
            ${userData.email ? `<div class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><span>${userData.email}</span></div>` : ""}
            ${userData.blog ? `<a href="${userData.blog}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:text-gray-200"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg><span>Website</span></a>` : ""}
            ${userData.company ? `<div class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg><span>${userData.company}</span></div>` : ""}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-8">
        <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
          <div class="text-3xl font-bold text-gray-100">${userData.public_repos}</div>
          <div class="text-sm text-gray-400">Public Repos</div>
        </div>
        <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
          <div class="text-3xl font-bold text-gray-100">${userData.followers}</div>
          <div class="text-sm text-gray-400">Followers</div>
        </div>
        <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-center">
          <div class="text-3xl font-bold text-gray-100">${userData.following}</div>
          <div class="text-sm text-gray-400">Following</div>
        </div>
      </div>
    </div>
  </div>
  ${readme ? `<div class="max-w-6xl mx-auto px-6 py-12"><div class="bg-zinc-800 border border-zinc-700 rounded p-8"><h2 class="text-3xl font-bold mb-6 text-gray-100 flex items-center gap-2"><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>About Me</h2><div class="markdown-content text-gray-300">${readme}</div></div></div>` : ""}
  ${publicRepos.length > 0 ? `<div class="max-w-6xl mx-auto px-6 py-12"><h2 class="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2"><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>Public Repositories (${publicRepos.length})</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">${publicRepos.map(repo => `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="bg-zinc-800 border border-zinc-700 rounded p-6 hover:border-zinc-600 transition group"><div class="flex items-start justify-between mb-2"><h3 class="text-xl font-semibold text-gray-100 group-hover:text-white">${repo.name}</h3><svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div><p class="text-gray-400 text-sm mb-4 line-clamp-2">${repo.description || "No description available"}</p><div class="flex gap-4 text-sm text-gray-500"><div class="flex items-center gap-1"><svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><span>${repo.stargazers_count}</span></div><div class="flex items-center gap-1"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><span>${repo.forks_count}</span></div>${repo.language ? `<div class="flex items-center gap-1"><div class="w-3 h-3 rounded-full bg-gray-500"></div><span>${repo.language}</span></div>` : ""}</div></a>`).join("")}</div></div>` : ""}
  ${privateRepos.length > 0 ? `<div class="max-w-6xl mx-auto px-6 py-12"><h2 class="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2"><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>Private Repositories (${privateRepos.length})</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">${privateRepos.map(repo => `<div class="bg-zinc-800 border border-zinc-700 rounded p-6 private-repo"><div class="flex items-start justify-between mb-2"><h3 class="text-xl font-semibold text-gray-100">${repo.name}</h3><svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg></div><p class="text-gray-400 text-sm mb-4 line-clamp-2">${repo.description || "No description available"}</p><div class="flex gap-4 text-sm text-gray-500">${repo.language ? `<div class="flex items-center gap-1"><div class="w-3 h-3 rounded-full bg-gray-500"></div><span>${repo.language}</span></div>` : ""}<span class="text-xs text-gray-600">Private</span></div></div>`).join("")}</div></div>` : ""}
  <div class="bg-zinc-800 border-t border-zinc-700 mt-12"><div class="max-w-6xl mx-auto px-6 py-8 text-center"><a href="${userData.html_url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-gray-100 rounded transition text-lg font-semibold"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>View GitHub Profile</a></div></div>
</div>`;
}

function renderPortfolio() {
  return `
    <div class="min-h-screen bg-zinc-900 text-gray-100">
      <div class="bg-zinc-800 border-b border-zinc-700">
        <div class="max-w-6xl mx-auto px-6 py-8">
          <div class="flex justify-between items-center mb-6">
            <button onclick="setState({ showPortfolio: false, username: '', userData: null, repos: [], readme: null })" 
                    class="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-100 rounded transition">
              ← New Portfolio
            </button>
            <button onclick="openShareModal()" 
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              Share & Download
            </button>
          </div>
          ${renderPortfolioContent()}
        </div>
      </div>
    </div>
  `;
}

function renderInput() {
  return `
    <div class="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <div class="bg-zinc-800 border border-zinc-700 rounded p-8 max-w-md w-full">
        <div class="text-center mb-8">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-100" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-100 mb-2">Portfolio Generator</h1>
          <p class="text-gray-400">Generate a portfolio from your GitHub profile</p>
          <div class="mt-4 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded inline-block">
            <span class="text-gray-400 text-sm">Total users:</span>
            <span class="text-blue-400 font-bold text-lg ml-2">${state.userCount}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">GitHub Username</label>
            <input 
              type="text" 
              id="username-input"
              value="${state.username}"
              placeholder="octocat"
              class="w-full px-4 py-3 rounded bg-zinc-700 border border-zinc-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              onkeypress="if(event.key === 'Enter') fetchGitHubData()"
            >
          </div>

          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">
              GitHub Token (Optional - for private repos)
              <span class="text-xs text-gray-500 font-normal ml-2">Get from github.com/settings/tokens</span>
            </label>
            <input 
              type="password" 
              id="token-input"
              value="${state.githubToken}"
              placeholder="ghp_xxxxxxxxxxxx"
              class="w-full px-4 py-3 rounded bg-zinc-700 border border-zinc-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            >
          </div>

          ${state.error ? `
            <div class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              ${state.error}
            </div>
          ` : ""}

          <button 
            onclick="fetchGitHubData()"
            ${state.loading ? "disabled" : ""}
            class="w-full bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 text-gray-100 font-semibold py-3 px-6 rounded transition duration-200 flex items-center justify-center gap-2">
            ${state.loading ? `
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-100"></div>
              <span>Generating...</span>
            ` : `
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
              <span>Generate Portfolio</span>
            `}
          </button>
        </div>

        <p class="text-center text-gray-500 text-sm mt-6">
          Enter any GitHub username to create an instant portfolio
        </p>
      </div>
    </div>
  `;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = state.showPortfolio ? renderPortfolio() : renderInput();

  if (!state.showPortfolio) {
    const usernameInput = document.getElementById("username-input");
    const tokenInput = document.getElementById("token-input");
    
    if (usernameInput) {
      usernameInput.addEventListener("input", (e) => {
        state.username = e.target.value;
      });
    }
    
    if (tokenInput) {
      tokenInput.addEventListener("input", (e) => {
        state.githubToken = e.target.value;
      });
    }
  }
}

// Check for URL parameters on load
window.addEventListener('DOMContentLoaded', () => {
  initUserCount();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');
  if (username) {
    state.username = username;
    fetchGitHubData();
  } else {
    render();
  }
});