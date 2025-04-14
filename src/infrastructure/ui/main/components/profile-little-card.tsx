import './profile-little-card.css'

import ThreePointsIcon from '../../../../assets/svgs/feed/ThreePointsIcon';
import VerifiedIcon from '../../../../assets/svgs/feed/VerifiedIcon';
// Estados
import { useState } from 'react';

// Svgs
import LogoutIcon from '../../../../assets/svgs/profile/LogoutIcon';
import ReportIcon from '../../../../assets/svgs/post/ReportIcon';
import { useNavigate } from 'react-router-dom';

interface ProfileLittleCardProps {
    username: string;
    name: string;
    profileImageUrl: string;
    isVerified: boolean
}

export default function ProfileLittleCard({ username, name, profileImageUrl, isVerified }: ProfileLittleCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const nav = useNavigate(); 

  return (
    <div className="main-info-side-profile" onClick={() => {setShowOptions(false)}}>

      <img
        src={profileImageUrl || '/no-profile-pic.webp'}
        alt={`${username}'s profile picture`}
      />

      <div className="main-info-side-profile-content">
        <div className="main-info-side-profile-info">
          <div className="profile-side-verified">
            <p onClick={() => nav(`/profile/@${username}`)}>{name}</p>
            {isVerified && <VerifiedIcon />}
          </div>
          <span>@{username}</span>
        </div>

        <div className="main-info-side-profile-options">
          <span onClick={(e) => {e.stopPropagation(); setShowOptions(!showOptions)}} className='main-info-side-options'>
            <ThreePointsIcon />
          </span>
        </div>

        <div className={`main-modal-info-profile ${showOptions ? 'active' : ''}`}>
          <div className='main-modal-info-profile-options'>

            <ul className='main-m-options-list'>
              <li onClick={() => nav(`/profile/@${username}`)}>
                <ReportIcon />
                
                <div className='option-list-info'>
                  <p>Profile</p>
                  <p>Go to profile</p>
                </div>
              </li>
              <li>
                <LogoutIcon />

                <div className='option-list-info'>
                  <p>
                    Log out
                  </p>
                  <p>Log out of anx</p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>

    </div>
  );
}
