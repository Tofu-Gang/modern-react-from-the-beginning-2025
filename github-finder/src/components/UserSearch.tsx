import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, searchGitHubUser } from "../api/github.ts";
import * as React from "react";
import UserCard from "./UserCard.tsx";
import RecentSearches from "./RecentSearches.tsx";
import { useDebounce } from "use-debounce";
import type { GitHubUser } from "../types.ts";

function UserSearch() {
    const [username, setUsername] = useState("");
    const [submittedUsername, setSubmittedUsername] = useState("");
    const [recentUsers, setRecentUsers] = useState<string[]>(() => {
        const stored = localStorage.getItem("recentUsers");
        return stored ? JSON.parse(stored) : [];
    });
    const [debouncedUsername] = useDebounce(username, 300);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // query to fetch specific user
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users", submittedUsername],
        queryFn: () => fetchGitHubUser(submittedUsername),
        enabled: !!submittedUsername
    });

    // query to fetch suggestions from user search
    const { data:suggestions } = useQuery({
        queryKey: ["github-user-suggestion", debouncedUsername],
        queryFn: () => searchGitHubUser(debouncedUsername),
        enabled: debouncedUsername.length > 1
    });

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = username.trim();

        if(trimmed) {
            setSubmittedUsername(trimmed);
            setUsername("");
            setRecentUsers((current) => {
                const updated = [...current.filter((user) => user !== trimmed), trimmed];
                return updated.slice(0, 5);
            });
        }
    }

    useEffect(() => {
        localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
    }, [recentUsers]);

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <div className="dropdown-wrapper">
                    <input
                        type="text"
                        placeholder="Enter GitHub Username..."
                        value={username}
                        onChange={(event) => {
                            const value = event.target.value;
                            setUsername(value);
                            setShowSuggestions(value.trim().length > 1);
                        }}
                    />
                    {showSuggestions && suggestions?.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.slice(0, 5).map((user:GitHubUser) => (
                                <li key={user.login} onClick={() => {
                                    setUsername(user.login);
                                    setShowSuggestions(false);

                                    if (submittedUsername !== user.login) {
                                        setSubmittedUsername(user.login);
                                    } else {
                                        refetch();
                                    }
                                }}>
                                    <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
                                    {user.login}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" >Search</button>
            </form>

            {isLoading && <p className="status">Loading...</p>}
            {isError && <p className="status error">{error.message}</p>}
            {data && (
                <UserCard user={data} />
            )}
            {recentUsers.length > 0 && (
                <RecentSearches users={recentUsers} onSelect={(username) => {
                    setUsername(username);
                    setSubmittedUsername(username);
                }} />
            )}
        </>
    );
}

export default UserSearch;
