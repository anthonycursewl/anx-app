import { FormEvent, RefObject, useRef, useState } from 'react'
import './login.css'

import { Link } from 'react-router-dom'

// Svgs
import PasswordIcon from '../../../../assets/svgs/login/PasswordIcon'
import EmailIcon from '../../../../assets/svgs/login/EmailIcon'

// Services
import { useFetch } from '../../../api/useFetch'
import { API_URL } from '../../../../config/anx.config.breadriuss'

// hooks 
import { useNavigate } from 'react-router-dom'

export default function LoginComponent() {
    const formRef: RefObject<HTMLFormElement> = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const nav = useNavigate()

    const handleSumbit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = formRef.current?.elements

        if (formData) {
            const email = formData.namedItem('email') as HTMLInputElement
            const password = formData.namedItem('password') as HTMLInputElement

            if (!email.value || !password.value) {
                console.error('ANX | Form data is null')
                return
            }

            const { data, error } = await useFetch(`${API_URL}/auth/login`, 'POST', {
                email: email.value,
                password: password.value 
            }, setLoading)

            if (error) {
                console.log(error)
                console.log
                return
            }

            if (data) {
                console.log(data)
                nav('/feed')
            }
        }
    }

    return (
        <section className='login'>
            <div className='login-content'>

                <div className='login-content-lines'>
                    <div className='login-line-horizontal-top'></div>

                    <div className='login-title'>

                        <div className='login-title-description'>
                            <div className='info-login'>
                                <h1>Anx | Breadriuss</h1>
                            </div>
                            <p>Hello there, I think it's obvious this UI looks so similar to <a href="https://x.com">X</a> and
                            I wanna agree with you, I was really bored and wanted to make something like this because- I can, and why not? 
                            and before you start complaining about it yes it's almost a clone shhh.
                            </p> 
                        </div>

                        <div className='login-title-description'>
                            <div className='info-login'>
                                <h2>Its name is Anx</h2>
                            </div>
                            <p>You could ask urself, what is Anx? well, I can't answer that because I don't know but I think I'll know it soon, at the moment I'm trying 
                            to enjoy this moment and create a new "Platform" where my friends can share their moments and their projects as well.
                            </p>
                        </div>

                        <div className='login-title-description'>
                            <div className='info-login'>
                                <h2>Do you want to complain about this?</h2>
                            </div>
                            <p>
                                You can send me an email at <a href="mailto:zerpaanthony.wx@breadriuss.com">zerpaanthony.wx@breadriuss.com</a> or visit my <a href="https://github.com/anthonycursewl">Github</a>, if you wanna propose something such as a new feature,
                                something I should add or something I should improve, you can do it through those options. <Link to={"/read-more-about-anx-and-somehting-else"}>Read more</Link> 
                            </p>
                        </div>
                    </div>

                    <form className='login-form' ref={formRef} onSubmit={handleSumbit}>
                        <div className='login-logo'>
                            <img src="https://www.breadriuss.com/logo_recortado.png" alt="Breadriss Logo" />
                        </div>

                        <div className='login-inputs'>
                            <div className='login-single-input'>
                                <PasswordIcon />
                                <label>Email</label>
                            </div>
                            <input type="email" name='email' id='email' placeholder='email@breadriuss.com'/>
                        </div>

                        <div className='login-inputs'>
                            <div className='login-single-input'>
                                <EmailIcon />
                                <label>Password</label>
                            </div>
                            <input type="password" placeholder='Password...' name='password' id='password'/>
                        </div>

                        <div className='login-button'>
                            {
                                loading ? 'Loading' :
                                <button>Log in</button>
                            }
                        </div>
                    </form>

                    <div className='login-line-horizontal-bottom'></div>
                </div>

            </div>
        </section>
    )
}