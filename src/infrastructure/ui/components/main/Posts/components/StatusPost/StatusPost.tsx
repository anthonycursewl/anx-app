import './StatusPost.css'

// Services
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../../../../../../config/anx.config.breadriuss'
import { secureFetch } from '../../../../../../api/secureFetch'

// Hooks
import { useEffect, useState } from 'react'
import { InfoPost } from '../../../../../../../shared/interfaces/IPost'

// Svgs
import VerifiedIcon from '../../../../../../../assets/svgs/feed/VerifiedIcon'
import ThreePointsIcon from '../../../../../../../assets/svgs/feed/ThreePointsIcon'
import ArrowPostIcon from '../../../../../../../assets/svgs/post/ArrowIcon'
import IconTrash from '../../../../../../../assets/svgs/post/IconTrash'
import EditIcon from '../../../../../../../assets/svgs/post/EditIcon'
import ShareIcon from '../../../../../../../assets/svgs/post/ShareIcon'

// Components
import StatusDescription from './StatusDescription'
import PostEdit from '../EditPost/PostEdit'
import ModalConfirm from '../../../../../../../shared/components/ModalConfirm'
import { useGlobalState } from '../../../../../../../shared/utils/GlobalState'

export default function StatusPost() {
    const { id_post } = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [post, setPost] = useState<InfoPost>({} as InfoPost)
    const [showStatusOptions, setStatusOptions] = useState<boolean>(false)
    const { setIsEditing, setNotis, notis, setIsConfirming, isAuthenticated } = useGlobalState()
    const nav = useNavigate()

    const getPostById = async () => {
        const { data, error } = await secureFetch(`${API_URL}/posts/get/${id_post}`, { method: 'GET', body: null, stringify: false, content_type: 'application/json' }, setLoading) 

        if (error) {
            setNotis([...notis, { message: error || "Error getting post", type: "error", options: { isLoading: true } }])
        }

        if (data) {
            if (data.length === 0) {
                return nav('/feed')
            }
            setPost(data)
        }
    }

    const handleDeletePost = async () => {
        const { data, error } = await secureFetch(`${API_URL}/posts/delete/${post?.id}`, { method: 'DELETE', body: null, stringify: false }, () => {})
        if (error) {
            setNotis([...notis, { message: error || "Error deleting post", type: "error", options: { isLoading: true } }])
            return
        }

        if (data) {
            setNotis([...notis, { message: "Post deleted successfully", type: "success", options: { isLoading: true } }])
        }
    }

    useEffect(() => {
        getPostById()
    }, [])

    return (
        <div className='status-post'>
            <div className='status-post-title'>
                <span onClick={() => {nav(-1)}}>
                    <ArrowPostIcon />
                </span>
                <span>Post</span>
            </div> 
            {
            !loading ?
            <>
                <div className='status-post-content'>
                <div className='status-post-front'>
                    <img src={post ? post.users.user_profile[0].avatar_url : '/no-profile-pic.webp'} alt={`${post && post.users.name}'s profile picture`} />

                    <div className='status-post-header'>
                        <div className='status-post-content-info'>
                            <div className='status-post-content-name'>
                                <h3 onClick={() => {nav(`/profile/@${post && post.users.username}`)}}>{post && post.users.name}</h3>
                                {post && post.users.is_verified && <VerifiedIcon />}
                            </div>
                            <span>@{post && post.users.username}</span>
                        </div>

                        <div className='status-post-content-options'>
                            <span onClick={() => {
                                setStatusOptions(!showStatusOptions)

                                setTimeout(() => {
                                    setStatusOptions(false)
                                }, 2000)
                            }}>
                                <ThreePointsIcon />
                            </span>
                            
                            {
                                showStatusOptions && (
                                    <div className='status-post-options'>
                                    <ul>
                                        {
                                        isAuthenticated &&
                                        <>
                                            <li>
                                                <ShareIcon />
                                                Share
                                            </li>
                                            <li onClick={() => 
                                                setIsEditing(true)
                                            }>
                                                <EditIcon />
                                                Edit
                                            </li>
                                            <li onClick={() => setIsConfirming(true)}>
                                                <IconTrash />
                                                Delete
                                            </li>
                                        </>
                                        }
                                    </ul>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                
                <StatusDescription post={post ? post : null} />
                
                <div className='status-post-image'>
                    {
                        post ? post.images_url.length > 0 && 
                        <img src={post ? post.images_url[0] : ''} alt={`${post && post.users.name}'s profile picture`} /> : ''
                    }
                </div>
            </div>
            <div className='status-post-comments'>
                <span>Comments aren't available yet.</span>
            </div> 
                <PostEdit post={post!} />
                <ModalConfirm options={{ title: 'Are you sure you want to delete this post?', description: "You can't undo this action", onConfirm: handleDeletePost, onCancel: () => {}, postInfo: post! }}/>
            </>
            : 
            <div className='loading-container'>
                <div className='loading-spin'></div>
            </div>
            }


        </div>
    )
}