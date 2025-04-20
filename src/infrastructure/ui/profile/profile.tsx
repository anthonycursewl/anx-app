import { useParams } from "react-router-dom"
import './profile.css'
import { useGlobalState } from "../../../shared/utils/GlobalState"
import { useEffect, useState } from "react"
import { useFetch } from "../../api/useFetch"
import { API_URL } from "../../../config/anx.config.breadriuss"

// svgs
import VerifiedIcon from "../../../assets/svgs/feed/VerifiedIcon"
import LocationIcon from "../../../assets/svgs/profile/LocationIcon"
import LinkIcon from "../../../assets/svgs/profile/LinkIcon"
import CalenderIcon from "../../../assets/svgs/profile/CalenderIcon"
// Components
import ListPost from "./ListPosts/ListPost"
import EditProfile from "./EditProfile/EditProfile"
import { ShowLinks } from "./components/ShowLinks"

export default function Profile() {
    const { username } = useParams()
    const { infoUser, notis, setNotis, isAuthenticated } = useGlobalState()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { setIsEditingProfile, profile, setProfile } = useGlobalState()



    const fetchUser = async () => {
        if (profile.id !== 'loaded') return

        const { data, error } = await useFetch(`${API_URL}/user/profile/${username?.split('@')[1]}`, 'GET', null, setLoading)
        if (error) {
            setNotis([...notis, { message: "Error fetching user", type: "error", options: { isLoading: true } }])
            setError(error)
            return 
        }

        if (data) {
            setProfile(data)
        }
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
                            <ShowLinks profile={profile}/>
                        </div>

                        <div className="profile-single-date-joined">
                            <CalenderIcon />
                            <span>Joined at {new Date(profile.users.created_at).toDateString()}</span>
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