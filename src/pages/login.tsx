import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginData, setLoginData] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;

    const validate = () => {
        if (!emailRegex.test(formData.email)) {
            alert('Invalid email format! Please use a valid email format');
            return false;
        }
        if (!passwordRegex.test(formData.password)) {
            alert('Invalid password! Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
            }

            setLoginData(data);
            setError('');
        } catch (error: any) {
            console.error('Login error', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (loginData) {
            router.replace('/products');
        }
    }, [loginData, router]);

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-2xl font-semibold text-gray-700 text-center mb-6">Email</label>
                    <input 
                        className="block w-full bg-transparent border border-black rounded-md py-2 px-10"
                        type="email" 
                        onChange={handleChange} 
                        value={formData.email}
                        name="email" 
                        placeholder="Ketik emailmu disini"
                        required
                    />
                    <label htmlFor="password" className="text-2xl font-semibold text-gray-700 text-center mb-6">Password</label>
                    <input 
                        className="block w-full bg-transparent border border-black rounded-md py-2 px-10"
                        type="password" 
                        onChange={handleChange} 
                        value={formData.password} 
                        name="password"
                        placeholder="Masukan password"
                        required
                    />
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                    <Link href="/register" className='text-black flex flex-wrap'>Doesn't have account? Register now</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
