import type { GitHubUser } from "../types.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import { checkIfFollowingGitHubUser, followGitHubUser, unfollowGitHubUser } from "../api/github.ts";
import { FaUserMinus, FaGithubAlt, FaUserPlus } from "react-icons/fa";

function UserCard({ user }: {user:GitHubUser}) {
    // query to check if user is following
    const { data: isFollowing, refetch } = useQuery({
        queryKey: ["follow-status", user.login],
        queryFn: () => checkIfFollowingGitHubUser(user.login),
        enabled: !!user.login
    });
    // mutation to follow the user
    const followMutation = useMutation({
        mutationFn: () => followGitHubUser(user.login),
        onSuccess: () => {
            console.log(`You are now following ${user.login}`);
            refetch();
        },
        onError: (error) => {
            console.log(error.message);
        }
    });
    // mutation to unfollow the user
    const unfollowMutation = useMutation({
        mutationFn: () => unfollowGitHubUser(user.login),
        onSuccess: () => {
            console.log(`You are no longer following ${user.login}`);
            refetch();
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    function handleFollow() {
        if (isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    }

    return (
        <div className="user-card">
            <img src={user.avatar_url} alt={user.name} className="avatar" />
            <h2>{user.name || user.login}</h2>
            <p className="bio">{user.bio}</p>
            <div className="user-card-buttons">
                <button
                    className={`follow-btn ${isFollowing ? "following" : ""}`}
                    onClick={ handleFollow }
                    disabled={ followMutation.isPending || unfollowMutation.isPending }
                >
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
