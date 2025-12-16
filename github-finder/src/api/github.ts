export async function fetchGitHubUser(username:string) {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

    if (!response.ok) {
        throw new Error("User not found!");
    } else {
        return await response.json();
    }
}

export async function searchGitHubUser(query:string) {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);

    if (!response.ok) {
        throw new Error("User not found!");
    } else {
        const data = await response.json();
        return data.items;
    }
}

// Check if following a user on GitHub
export async function checkIfFollowingGitHubUser(username:string) {
    const token = prompt("insert token");
    const response = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json"
            }
        });

    if(response.status === 204) {
        // following
        return true;
    } else if (response.status === 404) {
        // not following
        return false;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check follow status!");
    }
}

// Follow user on GitHub
export async function followGitHubUser(username:string) {
    const token = prompt("insert token");
    const response = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to follow user!");
    } else {
        return true;
    }
}

// Unfollow user on GitHub
export async function unfollowGitHubUser(username:string) {
    const token = prompt("insert token");
    const response = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to unfollow user!");
    } else {
        return true;
    }
}
