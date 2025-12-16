import type { GitHubUser } from "../types.ts";

type SuggestionDropdownProps = {
    suggestions: GitHubUser[];
    show: boolean;
    onSelect: (username: string) => void;
}

function SuggestionDropdown({ suggestions, show, onSelect }:SuggestionDropdownProps) {
    if (!show) {
        return null;
    } else {
        return (
            <ul className="suggestions">
                {suggestions.slice(0, 5).map((user:GitHubUser) => (
                    <li key={user.login} onClick={() => onSelect(user.login)}>
                        <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
                        {user.login}
                    </li>
                ))}
            </ul>
        );
    }
}

export default SuggestionDropdown;
