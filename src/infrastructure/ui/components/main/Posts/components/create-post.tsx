import './create-post.css'
import { useGlobalState } from "../../../../../../shared/utils/GlobalState";

// Components
import PostAuth from './PostAuth/PostAuth';

export default function CreatePost() {
  const { infoUser, isAuthenticated } = useGlobalState()    
  
  return (
    <div className="main-post-create">

      <div className="main-post-create-profile">
        <img
          src={
            isAuthenticated
              ? infoUser?.user_profile[0].avatar_url
              : "/no-profile-pic.webp"
          }
          alt={`${isAuthenticated ? infoUser?.name : "User"}'s profile picture`}
        />
      </div>

      <PostAuth options_auth={{ IsAuthenticated: isAuthenticated }}/> 
    </div>
  );
}
