import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "../api/github.ts";
import * as React from "react";
import UserCard from "./UserCard.tsx";
import RecentSearches from "./RecentSearches.tsx";

function UserSearch() {
    const [username, setUsername] = useState("");
    const [submittedUsername, setSubmittedUsername] = useState("");
    const [recentUsers, setRecentUsers] = useState<string[]>([]);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users", submittedUsername],
        queryFn: () => fetchGitHubUser(submittedUsername),
        enabled: !!submittedUsername
    });

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = username.trim();

        if(trimmed) {
            setSubmittedUsername(trimmed);
            setRecentUsers((current) => {
                const updated = [...current.filter((user) => user !== trimmed), trimmed];
                return updated.slice(0, 5);
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Enter GitHub Username..."
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
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
