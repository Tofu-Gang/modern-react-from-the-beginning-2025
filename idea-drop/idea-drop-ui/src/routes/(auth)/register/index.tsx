import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth.ts";
import { useAuth } from "@/context/AuthContext.tsx";

export const Route = createFileRoute("/(auth)/register/")({
    component: RegisterPage,
})

function RegisterPage() {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            navigate({ to: "/ideas" });
        },
        onError: (error:any) => setError(error.message)
    });

    async function handleSubmit(event:React.FormEvent) {
        event.preventDefault();
        try {
            await mutateAsync({
                name,
                email,
                password
            });
        } catch(error:any) {
            console.log(error.message);
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            { error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                { error }
            </div> }
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="w-full border border-gray rounded-md p-2"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="off"
                />
                <input
                    type="email"
                    className="w-full border border-gray rounded-md p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="off"
                />
                <input
                    type="password"
                    className="w-full border border-gray rounded-md p-2"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="off"
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50"
                    disabled={ isPending }
                >
                    { isPending ? "Registering..." : "Register" }
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                </p>
            </form>
        </div>
    );
}
