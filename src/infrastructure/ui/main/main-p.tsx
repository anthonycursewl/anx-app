import './main-p.css'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'

// Svgs
import HomeIcon from '../../../assets/svgs/side-nav/HomeIcon'
import ProjectIcon from '../../../assets/svgs/side-nav/ProjectIcon'

// Components
// @ts-ignore
import ProfileLittleCard from './components/profile-little-card'
import { useGlobalState } from '../../../shared/utils/GlobalState'
// @ts-ignore
import { IUser } from '../../../../shared/interfaces/IUser'


export default function MainP() {
    const { pathname } = useLocation() 
    const { loadingData, isAuthenticated, infoUser } = useGlobalState()
    const { username } = useParams()

    const projectsMockup = [
        { 
            id: 1, 
            title: "Firu | A pet who loves coding", 
            description: "Firu it's an virtual pet where you can enhance your coding skills, and play with it.",
            techs: [
                { 
                    id: 1, 
                    icon_url: "https://img.icons8.com/color/48/000000/angularjs.png",
                    name: "Angular" 
                }, 
                { 
                    id: 2,
                    icon_url: "https://img.icons8.com/color/48/000000/kotlin.png",
                    name: "Kotlin" 
                }] 
        },
        { 
            id: 2, 
            title: "Bitter Ticket",
            description: "An app where you can create and manage your tickets. You can also create and manage your projects and assign tickets to them.",
            techs: [
                { 
                    id: 1, 
                    icon_url: "https://img.icons8.com/color/48/000000/react-native.png",
                    name: "React" 
                }, 
                { 
                    id: 2, 
                    icon_url: "https://img.icons8.com/color/48/000000/typescript.png",
                    name: "Typescript" 
                },
                {
                    id: 3,
                    icon_url: "https://img.icons8.com/color/48/000000/nodejs.png",
                    name: "NodeJS with NestJs"
                },
                {
                    id: 4,
                    icon_url: "https://api.plusinfosys.com/public/technology/34/postgre.png",
                    name: "PostgreSQL"
                }
            ] 
        },
        { 
            id: 3, 
            title: "Wheek", 
            description: "Wheek is a SaaS (software as a service) where you can manage sales, products and clients.",
            techs: [
                { 
                    id: 1, 
                    icon_url: "https://img.icons8.com/color/48/000000/angularjs.png",
                    name: "Angular" 
                }, 
                { 
                    id: 2, 
                    icon_url: "https://img.icons8.com/color/48/000000/kotlin.png",
                    name: "Kotlin" 
                },
                {
                    id: 3,
                    icon_url: "https://img.icons8.com/color/48/000000/spring.png",
                    name: "Spring Boot"
                }
            ]
        },
    ]

    return (
        <section className='main-p'>

            <div className='main-info-side'>
                <div className='main-info-side-container'>
                    <div className='main-info-side-logo'>
                        <img src="https://www.breadriuss.com/logo_recortado.png" alt="Breadriuss Logo" />
                    </div>

                    <div className='main-info-side-nav'>
                        <Link to={"/feed"}>
                            <div className='main-info-side-nav-icon'>
                                <HomeIcon />
                            </div>
                            <div className='main-info-side-nav-text'>
                                <p>Home</p>
                            </div>
                        </Link>

                        <Link to={""}>
                            <div className='main-info-side-nav-icon'>
                                <ProjectIcon />
                            </div>
                            <div className='main-info-side-nav-text'>
                                <p>Projects</p>
                            </div>
                        </Link>
                    </div>

                    <div className='main-info-side-button'>
                        <button>Post</button>
                    </div>
                </div>

                {loadingData ? <ProfileLittleCard username={"guest"} name={"Guest"} profileImageUrl={""} isVerified={false} /> : isAuthenticated 
                ? 
                <ProfileLittleCard username={infoUser.username} name={infoUser.name} profileImageUrl={infoUser?.user_profile[0].avatar_url} isVerified={infoUser.is_verified} /> : 
                <ProfileLittleCard username={"guest"} name={"Guest"} profileImageUrl={""} isVerified={false} />
                }
            </div>

            <div className='main-p--info'>
                <div className='main-p--box'>
                    {
                        pathname.includes('/profile') ?
                        <a className={`box-site ${pathname.includes('/profile') ? 'box-site-active' : ''}`}><p>{username}</p></a> :
                        <>
                            <a className={`box-site ${pathname === '/feed' ? 'box-site-active' : ''}`}><p>For you</p></a>
                            <a className={`box-site ${pathname.includes('/projects') ? 'box-site-active' : ''}`}><p>Projects</p></a>
                        </>
                    }
                </div>
                
                <Outlet /> 
            </div>

            <div className='main-aside-info'>
                <div className='main-aside-content'>
                    <div className='main-aside-content-title'>
                        <h1>Here you can find projects from <span className='main-aside-content-creators'>Creators</span></h1>
                    </div>

                    <div className='main-aside-content-projects'>
                        {projectsMockup.map((project, _) => (

                            <div className='main-aside-content-project' key={_}>
                                <div className='m-content-project'>
                                    <h2>{project.title}</h2>
                                    <p>{project.description}</p>
                                </div>

                                <div className='m-content-techs'>
                                    <div className='m-content-techs-title'>
                                        <p>Techs</p>
                                    </div>

                                    <div className='m-content-techs-list'>
                                        {project.techs.map((tech, index) => (
                                        <div className='m-content-tech' key={index}>
                                            <img src={tech.icon_url} alt={`${tech.name}'s logo`} />
                                            <p>{tech.name}</p>
                                        </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            
                            </div>

                        ))}
                    </div>

                </div>                 
            </div>
        
        </section>
    )
}