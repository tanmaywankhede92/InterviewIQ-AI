import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss";

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({username,email,password})
        if (success) {
            navigate("/")
        }
    }

    if(loading){
        return (<main className='loading-screen'><h1>Creating your workspace...</h1></main>)
    }

    return (
        <main className='auth-page'>
            <section className='auth-hero' aria-label='InterviewIQ introduction'>
                <p className='auth-eyebrow'>InterviewIQ</p>
                <h1>Build sharper answers before the real interview.</h1>
                <p>Save role-specific prep plans, questions, skill gaps, and roadmaps in one calm workspace.</p>
            </section>

            <div className="form-container">
                <div className='form-heading'>
                    <p className='auth-eyebrow'>Start preparing</p>
                    <h2>Create account</h2>
                    <p>It only takes a minute to set up your prep workspace.</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' autoComplete='username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' autoComplete='email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' autoComplete='new-password' required />
                    </div>

                    <button className='button primary-button' type='submit'>Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
