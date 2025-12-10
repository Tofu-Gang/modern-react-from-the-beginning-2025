import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | About"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
            {/* Intro */}
            <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
                <img
                    src="/images/profile.jpg"
                    alt="profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md" />
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hey, this is Tofu Gang SW!👋</h1>
                    <p className="text-gray-300 text-lg">
                        Web developer, Python programmer and a cat person
                    </p>
                </div>
            </div>
            {/* Bio */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Bio
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    web dev, Python, Advent of Code, Codewars, cats, books, movies, tv & panel shows, boardgames, guitar, bass guitar, drums, languages
                </p>
            </div>
            {/* Tech Stack */}
            <h2 className="text-2xl font-semibold text-white mb-4">🚀 Tech I Use</h2>
            <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
                {["React", "Express", "Node", "Python"].map((tech) => (
                    <li key={tech} className="bg-gray-700 px-3 py-1 rounded-md">{tech}</li>
                ))}
            </ul>
        </div>
    );
}

export default AboutPage;
