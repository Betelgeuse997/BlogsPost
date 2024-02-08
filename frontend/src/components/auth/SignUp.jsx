import React, { useState } from 'react'
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
// import image from '../../images/signUp.svg';
import { useSignUpFormState } from './authState.js';
import { createUser } from '../../services/api';

const SignUp = () => {
    const { signUpFormState, setSignUpFormState, handleInputChange } = useSignUpFormState();
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(signUpFormState.errors).every((error) => error === '')) {
            setMessage("Loading....");
            const result = await createUser(
                { name: signUpFormState.name, email: signUpFormState.email, password: signUpFormState.password });

            setSignUpFormState({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                errors: {}
            });

            setMessage(result.data.message);
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div className='p-4 my-4 w-25'>
            
                {/* <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: '10px' }} /> */}
                {message && (
                    <Alert className='text-center p-1' variant='info'>
                        {message}
                    </Alert>
                )}
                <div className='flex flex-col border-2 border-indigo-600 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSubmit} onFocus={handleInputFocus}>
                    <div className='my-4'>
                        <label className='flex text-2xl justify-start text-indigo-800 font-bold font-mono'>Name</label>
                        <input 
                            required
                            type='text' 
                            placeholder='Enter Name' 
                            name='name'
                            value={signUpFormState.name} 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.name} 
                            className='border-2 border-gray-500 px-4 py-2 w-full bg-slate-200 hover:bg-slate-300 px-4 rounded-lg'/>
                        {signUpFormState.errors.name &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.name}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='flex text-2xl justify-start text-indigo-800 font-bold font-mono'>Email address</label>
                        <input 
                            required 
                            type='email' 
                            placeholder='Enter email address' 
                            name='email' 
                            onChange={handleInputChange}
                            value={signUpFormState.email} 
                            isInvalid={!!signUpFormState.errors.email}
                            className='border-2 border-gray-500 px-4 py-2 w-full bg-slate-200 hover:bg-slate-300 px-4 rounded-lg' />
                        {signUpFormState.errors.email &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.email}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='flex text-2xl justify-start text-indigo-800 font-bold font-mono'>New Password</label>
                        <input 
                            required 
                            type='password' 
                            placeholder='New Password' 
                            name='password'
                            value={signUpFormState.password} 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.password} 
                            className='border-2 border-gray-500 px-4 py-2 w-full bg-slate-200 hover:bg-slate-300 px-4 rounded-lg'/>
                        {signUpFormState.errors.password &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.password}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='flex text-2xl justify-start text-indigo-800 font-bold font-mono'>Confirm Password</label>
                        <input 
                            required 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={signUpFormState.confirmPassword}
                            name='confirmPassword' 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.confirmPassword}
                            className='border-2 border-gray-500 px-4 py-2 w-full bg-slate-200 hover:bg-slate-300 px-4 rounded-lg' />
                        {signUpFormState.errors.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <button className='bg-blue-600 hover:bg-indigo-700 px-4 py-1 rounded-lg font-mono text-white text-l my-2' onClick={handleSubmit} type='submit'>Submit</button>
                    <div className='mr-3 font-mono text-black text-l my-2'>
                        <span> Already have an account? </span> &nbsp;
                        <a className='bg-blue-600 hover:bg-indigo-700 px-4 py-1 rounded-lg font-mono text-white text-l my-2' href='/user/signIn'>Sign In</a>
                    </div>
                </div>
            
        </div >
    )
}

export default SignUp;