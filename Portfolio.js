import {
  ExternalLink,
  GitFork,
  Github,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { useState } from "react";

export default function GitHubPortfolioGenerator() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError("");
    setShowPortfolio(false);

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      );
      const reposData = await reposResponse.json();

      setUserData(user);
      setRepos(reposData);
      setShowPortfolio(true);
    } catch (err) {
      setError(err.message || "Failed to fetch GitHub data");
    } finally {
      setLoading(false);
    }
  };

  if (showPortfolio && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <button
              onClick={() => setShowPortfolio(false)}
              className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              ← Generate New Portfolio
            </button>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={userData.avatar_url}
                alt={userData.name}
                className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-2xl"
              />
              <div className="text-center md:text-left flex-1">
                <h1 className="text-5xl font-bold mb-2">
                  {userData.name || userData.login}
                </h1>
                <p className="text-xl text-purple-300 mb-4">
                  @{userData.login}
                </p>
                {userData.bio && (
                  <p className="text-lg text-gray-300 mb-4">{userData.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                  {userData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.email && (
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>{userData.email}</span>
                    </div>
                  )}
                  {userData.blog && (
                    <a
                      href={userData.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-purple-400"
                    >
                      <ExternalLink size={16} />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">
                  {userData.public_repos}
                </div>
                <div className="text-sm text-gray-300">Repositories</div>
              </div>
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{userData.followers}</div>
                <div className="text-sm text-gray-300">Followers</div>
              </div>
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{userData.following}</div>
                <div className="text-sm text-gray-300">Following</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-70 transition border border-gray-700 hover:border-purple-500"
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  {repo.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || "No description available"}
                </p>

                <div className="flex gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} />
                    <span>{repo.forks_count}</span>
                  </div>
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-black bg-opacity-30 backdrop-blur-sm mt-12">
          <div className="max-w-6xl mx-auto px-6 py-8 text-center">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-lg font-semibold"
            >
              <Github size={20} />
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white border-opacity-20">
        <div className="text-center mb-8">
          <Github className="w-16 h-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white mb-2">
            Portfolio Generator
          </h1>
          <p className="text-gray-200">
            Generate a stunning portfolio from your GitHub profile
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              GitHub Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchGitHubData()}
              placeholder="octocat"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={fetchGitHubData}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Github size={20} />
                <span>Generate Portfolio</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-gray-300 text-sm mt-6">
          Enter any GitHub username to create an instant portfolio
        </p>
      </div>
    </div>
  );
}
