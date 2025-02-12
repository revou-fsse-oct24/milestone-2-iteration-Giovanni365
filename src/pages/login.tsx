import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials.');
            }
    
            await login(formData.email, formData.password);
    
            alert('Login successful! Redirecting to products...');
            router.replace('/products');
    
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <label className="text-2xl font-semibold text-gray-700">Email</label>
                    <input
                        className="block w-full border border-black rounded-md py-2 px-4"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label className="text-2xl font-semibold text-gray-700 mt-4">Password</label>
                    <input
                        className="block w-full border border-black rounded-md py-2 px-4"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        placeholder="Enter your password"
                        required
                    />

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                        Login
                    </button>

                    <Link href="/register" className="text-black flex justify-center mt-4">
                        Don't have an account? Register now
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
