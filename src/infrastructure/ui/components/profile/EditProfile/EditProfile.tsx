import './EditProfile.css'
import { createPortal } from "react-dom"
import { useGlobalState } from "../../../../../shared/utils/GlobalState"
import { IProfile } from '../../../../../shared/interfaces/IProfile'

interface EditProfileProps {
    profile: IProfile
}

export default function EditProfile({ profile }: EditProfileProps) {
    const { isEditingProfile, setIsEditingProfile } = useGlobalState()

    const closeEditProfile = () => {
        document.body.style.overflow = 'unset'
        setIsEditingProfile(false)
    }


    return createPortal(
        <div className={`edit-profile ${isEditingProfile ? 'active' : '' }`}>
            <div className={`edit-profile-content ${isEditingProfile ? 'active' : '' }`}>
                <p>Edit profile</p>
                {
                    isEditingProfile && (
                        <>
                            <div className='edit-profile-picture'>
                                <img src={profile.avatar_url} alt={''} />
                            </div>

                            <div>
                                <p>{profile.bio}</p>
                            </div>
                        </>
                    )
                }

                <div>
                    <button onClick={() => {closeEditProfile()}}>Close</button>
                </div>
            </div>
        </div>,
        document.getElementById('edit-profile')!
    )
}