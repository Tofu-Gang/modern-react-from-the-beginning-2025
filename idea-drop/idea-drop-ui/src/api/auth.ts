import api from "@/lib/axios";

export async function registerUser({ name, email, password }:{name: string; email: string; password: string}) {
    try {
        const response = await api.post("/auth/register", {
            name,
            email,
            password
        });
        return response.data;
    } catch(error:any) {
        const message = error.response?.data?.message || "Failed to register!";
        throw new Error(message);
    }
}

export async function loginUser(credentials:{email: string; password: string;}) {
    try {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    } catch(error:any) {
        const message = error.response?.data?.message || "Failed to login!";
        throw new Error(message);
    }
}
