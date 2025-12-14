export async function fetchGitHubUser(username:string) {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

    if (!response.ok) {
        throw new Error("User not found!");
    } else {
        return await response.json();
    }
}
