import { useParams } from "react-router-dom"
import './profile.css'
import { useGlobalState } from "../../../../shared/utils/GlobalState"
import { useEffect, useState } from "react"
import { useFetch } from "../../../api/useFetch"
import { API_URL } from "../../../../config/anx.config.breadriuss"

// Services
import { calculateTimePassed } from "../../../../shared/services/parse-date"

// svgs
import VerifiedIcon from "../../../../assets/svgs/feed/VerifiedIcon"
import LocationIcon from "../../../../assets/svgs/profile/LocationIcon"
import LinkIcon from "../../../../assets/svgs/profile/LinkIcon"
import CalenderIcon from "../../../../assets/svgs/profile/CalenderIcon"

// Components
import ListPost from "./ListPosts/ListPost"
import EditProfile from "./EditProfile/EditProfile"

type IUserProfile = {
    id: string;
    bio: string;
    avatar_url: string;
    banner_url: string;
    location: string;
    websites_urls: string[];
    user_id: string;
    users: {
        id: string;
        username: string;
        name: string;
        email: string;
        role_id: string
        is_verified: boolean;
        created_at: string;
    }
}

export default function Profile() {
    const { username } = useParams()
    const { infoUser, notis, setNotis, isAuthenticated } = useGlobalState()
    const [loading, setLoading] = useState<boolean>(false)
    const [profile, setProfile] = useState<IUserProfile>({ id: '', bio: '', avatar_url: '', banner_url: '', location: '', websites_urls: [], user_id: '', users: { id: '', username: '', name: '', email: '', role_id: '', is_verified: false, created_at: '' } })
    const [error, setError] = useState<string | null>(null)

    const { setIsEditingProfile } = useGlobalState()


    const fetchUser = async () => {
        const { data, error } = await useFetch(`${API_URL}/user/profile/${username}`, 'GET', null, setLoading)

        if (error) {
            console.log(error)
            setNotis([...notis, { message: "Error fetching user", type: "error", options: { isLoading: true } }])
            setError(error)
            return 
        }

        if (data) {
            console.log(data)
            setProfile(data)
        }
    }

    const ShowLinks = () => {
        if (!profile.websites_urls || profile.websites_urls.length === 0) return
        let parseLinks = []
        for (let i = 0; i < profile.websites_urls.length; i++) {
            const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
            if (regex.test(profile.websites_urls[i])) {
                parseLinks.push(profile.websites_urls[i])
            }
        }

        return parseLinks.length > 0 ? parseLinks.map((link, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="">
                {link}
            </a>
        ))
        : null
    }

    const handleEditingProfile = () => {
        document.body.style.overflow = 'hidden'
        setIsEditingProfile(true)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="profile-component">

            {
            loading ? <div className="loading-spin"></div> :
            <>
                <div className="profile">
                    <div className="profile-banner">
                        <img
                            src={profile.banner_url || '/placeholder/gray_color_background.jpg'}
                            alt={`${profile.users.username}'s profile banner`}
                            />
                    </div>

                    <div className="profile-avatar">
                        <img
                            src={profile.avatar_url || '/no-profile-pic.webp'}
                            alt={`${profile.users.username}'s profile picture`}
                            />
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-content-edit">
                        {
                            isAuthenticated && infoUser?.id === profile.users.id ?
                            <button onClick={() => handleEditingProfile()}>Edit Profile</button> :
                            <button>Follow</button>
                        }
                    </div>

                    <div className="profile-content-header">
                        <div className="profile-content-check-verified">
                            <h1>{profile.users.name}</h1>
                            {profile.users.is_verified && <VerifiedIcon />}  
                        </div>
                        <p>@{profile.users.username}</p>
                    </div>

                    <div className="profile-content-bio">
                        <p>{profile.bio}</p>
                    </div>

                    <div className="profile-content-links">
                        <div className="profile-single-link">
                            <LocationIcon />
                            <p>{profile.location}</p>
                        </div>

                        <div className="profile-single-web">
                            <LinkIcon />
                            <ShowLinks />
                        </div>

                        <div className="profile-single-date-joined">
                            <CalenderIcon />
                            <span>Joined at {calculateTimePassed(profile.users.created_at)}</span>
                        </div>
                    </div>
                </div>

                <ListPost id={profile.users.id}/>
                <EditProfile profile={profile}/>
            </>
            }

            {
            error ?
                <div className="profile-content">
                {error && <p>🟥 {error.toString().split('Error: ')[1]}</p>}
            </div> : null
            }
        </div>
    )
}