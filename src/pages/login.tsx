import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { email, password } = context.query;

    if (!email || !password) {
        return { props: { loginData: null, error: null } };
    }

    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return {
            props: { loginData: data, error: null },
        };
    } catch (error) {
        console.error('Login error', error);
        return {
            props: { loginData: null, error: error },
        };
    }
};

const Login = ({ loginData, error }: any) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
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

        router.push({
            pathname: '/login',
            query: { email: formData.email, password: formData.password },
        });
    };

    if (loginData) {
        router.replace('/products');
    }

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
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                    </form>
                </div>
            </div>
    );
};

export default Login;