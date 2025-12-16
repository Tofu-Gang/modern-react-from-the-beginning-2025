import type { GitHubUser } from "../types.ts";
import { useQuery } from "@tanstack/react-query";
import { checkIfFollowingUser } from "../api/github.ts";
import {FaUserMinus, FaGithubAlt, FaUserPlus} from "react-icons/fa";

function UserCard({ user }: {user:GitHubUser}) {
    const { data: isFollowing, refetch } = useQuery({
        queryKey: ["follow-status", user.login],
        queryFn: () => checkIfFollowingUser(user.login),
        enabled: !!user.login
    });

    return (
        <div className="user-card">
            <img src={user.avatar_url} alt={user.name} className="avatar" />
            <h2>{user.name || user.login}</h2>
            <p className="bio">{user.bio}</p>
            <div className="user-card-buttons">
                <button className={`follow-btn ${isFollowing ? "following" : ""}`}>
                    {isFollowing ? (
                        <>
                            <FaUserMinus className="follow-icon" /> Following
                        </>
                    ) : (
                        <>
                            <FaUserPlus className="follow-icon" /> Follow User
                        </>
                    )}</button>
                <a
                    href={user.html_url}
                    className="profile-btn"
                    target="_blank" rel="noopener noreferref"
                >
                    <FaGithubAlt /> View GitHub Profile
                </a>
            </div>
        </div>
    );
}

export default UserCard;
