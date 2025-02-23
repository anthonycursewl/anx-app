import './portfolio.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useGlobalState } from '../../../../shared/utils/GlobalState'

// Objects 
import { skills } from './objects/skills'
import { Routes } from './objects/routes'
import { bitter, forcegym } from './objects/images'

// components
import CardSkill from './components/CardSkill'
import RouteLine from './components/RouteLine'
import SliderImages from './components/SliderImages'


export default function Portfolio() {
    const ref = new URLSearchParams(window.location.search)
    const { notis, setNotis } = useGlobalState()
    const [isCopied, setIsCopied] = useState<number>(0)
    
    useEffect(() => {
        console.log(ref.get('ref'))

        document.title = 'Portfolio | Anthony Zerpa'
    }, [])

    const copyToClipboard = () => {
        setIsCopied(isCopied + 1)
        if (isCopied > 4) return 

        if (isCopied > 3) {
            return setNotis([...notis, { type: 'warning', message: 'You have copied 3 times', options: { isLoading: true } }])
        }

        navigator.clipboard.writeText('https://github.com/anthonycursewl')
        setNotis([...notis, { type: 'success', message: 'Copied to clipboard', options: { isLoading: true } }])
    }

    const imgTest = 'https://freepngimg.com/save/69350-decorative-magic-purple-light-beam-icon/690x460'

    const imgSquare = 'https://www.pngkit.com/png/full/437-4374751_aesthetic-grid-gridoverlay-overlay-tumblr-grunge-altern-white.png'

    return (
        <section className='anx-show-portfolio'>
            <div className='anx--d'>
            </div>
            <img src={imgTest} alt="Image Test" className='anx--img'/>

            <div className='anx-show-portfolio-content'>

                <div className='anx-p-greetings'>
                    {/* <img src={profilePic} alt="Anthony Zerpa Profile Picture" /> */}
                    <h1 id='anx-hello'>Hello👋🏻, I'm Anthony Zerpa, <br />a <span>Full-stack developer.</span></h1>

                    <div className='anx-p-contact'>
                        <a href="" download={true}>
                            <img src="/icons/icon-cv.png" alt="CV Icon" />
                            Download CV
                        </a>
                        <button onClick={copyToClipboard}>
                            <img src="/icons/icon-email.png" alt="Email Icon" />
                            zerpanthony.wx@breadriuss.com
                        </button>
                        <a href="https://github.com/anthonycursewl" target="_blank">
                            <img src="/icons/icon-github.png" alt="GitHub Icon" />
                        </a>
                    </div>

                    <div className='anx-p-description'>
                        <p>I'm a Full-stack developer with a passion for creating innovative and user-friendly web applications. I've been practicing all these years and I'm always looking for new challenges to improve my skills.</p>
                        <p>If you're here it's because you might be interested in my portfolio or just want to know more about me. I'm Anthony, I'm 21, I live in Venezuela and I'm a Tech enthusiast. 
                        Part of my time I'm programming and studying, and I'm in the last year of Computer Engineering at UPTAIET. In my free time I'm producing music, creating new sounds.</p>
                    </div>

                    <div className='anx--projects'>
                        <div className='anx--roadmap-content'>
                             <h2>Personal Projects</h2>
                            <p>Some personal project that I've been working on. They're a testament to how I've been taking advantage of my skills as a <strong>full stack developer.</strong></p>
                        </div>

                        <div className='anx-projects-cards'>

                            <div className='anx-card-project'>
                                <div className='anx-card-project-content'>
                                    <div className='anx-card-project-title'>
                                        <h3>Bitter</h3>
                                        <span>v1.0.0</span>
                                    </div>
                                    <p>Bitter is a web application that allows you to save contacts, images, and poems, all in one place. It uses a system of smart links to share your poems and images.
                                        In its upcoming update Bitter will have a ticket system to manage your events, projects, and more. 
                                    </p>
                                </div>
                                
                                <SliderImages images={bitter} />
                            </div>

                            <div className='anx-card-project'>
                                <div className='anx-card-project-content'>
                                    <div className='anx-card-project-title'>
                                        <h3>Force Gym</h3>
                                        <span>v0.0.1</span>
                                    </div>
                                    <p>Bitter is a web application that allows you to save contacts, images, and poems, all in one place. It uses a system of smart links to share your poems and images.
                                        In its upcoming update Bitter will have a ticket system to manage your events, projects, and more. 
                                    </p>
                                </div>
                                
                                <SliderImages images={forcegym} />
                            </div>


                        </div>
                    </div>

                    <div className='anx--skills'>
                        <div className='anx--roadmap-content'>
                            <h2>Skills</h2>
                            <p>These are the skills that I've acquired so far. Soft and Hard skills</p>
                            <br />
                        </div>

                        <div className='anx--skills-icons'>
                            {skills.map((skill, index) => (
                                <CardSkill key={index} imgSquare={imgSquare} path={skill.path} alt={skill.alt} />
                            ))}
                        </div>
                    </div>

                    <div className='anx--roadmap'>
                        <div className='anx--roadmap-content'>
                            <h2>My personal Route</h2>
                            <p>This is the current road that I've been following to be a Full-stack developer and avoid any kind of problem.</p>
                            <br />
                        </div>

                        <div className='anx--roadmap-diagram'>
                            <img src={imgTest} alt="Image Test"/>

                            {Routes.map((route, index) => (
                                <RouteLine key={index} title={route.title} description={route.description} />
                            ))} 
                            <RouteLine isContent={false}/>                          
                             
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}