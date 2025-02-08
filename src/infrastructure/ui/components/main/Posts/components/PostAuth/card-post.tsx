import './card-post.css'
import { Link } from 'react-router-dom'

// Svgs
import ThreePointsIcon from '../../../../../../../assets/svgs/feed/ThreePointsIcon'
import VerifiedIcon from '../../../../../../../assets/svgs/feed/VerifiedIcon'
import IconTrash from '../../../../../../../assets/svgs/post/IconTrash'
import EditIcon from '../../../../../../../assets/svgs/post/EditIcon'
import ShareIcon from '../../../../../../../assets/svgs/post/ShareIcon'
import ReportIcon from '../../../../../../../assets/svgs/post/ReportIcon'
import FollowIcon from '../../../../../../../assets/svgs/post/FollowIcon'

// Hooks
import { useEffect, useRef, useState } from 'react'

// Services 
import * as dp from 'dompurify'
import { calculateTimePassed } from '../../../../../../../shared/services/parse-date'
import { useGlobalState } from '../../../../../../../shared/utils/GlobalState'
import { parseText } from '../../../../../../../shared/services/parseText'

// Interfaces
import { CardPostProps } from '../../../../../../../shared/interfaces/ICardPost'

export default function CardPost({ post, setSelectedPost }: CardPostProps) {
    const [timePassed, setTimePassed] = useState<string>('')
    const textRef = useRef<HTMLSpanElement>(null)
    const [isShowOptions, setIsShowOptions] = useState<boolean>(false)      
    
    // Global State
    const { infoUser, setIsConfirming, setIsEditing } = useGlobalState()  
    useEffect(() => {
        setTimePassed(calculateTimePassed(post.created_at))

        setInterval(() => {
            setTimePassed(calculateTimePassed(post.created_at))
        }, 60000);  

        return () => {
            clearInterval(0);
        }
    }, [post.created_at])

    useEffect(() => {
        const textFormated = parseText(post.content)
        const cleanText = dp.default.sanitize(textFormated, { ALLOWED_TAGS: ['a', 'br', 'p'] })
        textRef ? textRef.current!.innerHTML = cleanText : null    
    }, [])

    return (
        <div className='user-post' onClick={() => window.open(`${post.images_url[0]}`, '_blank')}>
            <div className='user-profile'>
                <img src={post.users.user_profile[0].avatar_url} alt="Profile Picture" />
            </div>

            <div className='user-post-content' style={{ gap: post.images_url[0] ? '1rem' : '0'}}>
                
                <div className='user-post-control'>

                    <div className='user-post-header' onClick={(e) => e.stopPropagation()}>

                        <div className='user-post-info' onClick={(e) => e.stopPropagation()}>

                            <div className='user-post-verified'>
                                <p>{post.users.name}</p>
                                {post.users.is_verified && <VerifiedIcon />}
                            </div>

                            <span>@{post.users.username}</span>
                            <p className='user-post-dot'>·</p>
                            <span>{timePassed}</span>
                        </div>

                        <div className='user-post-options'>
                            {isShowOptions && 
                                <div className='modal-menu-options' onMouseLeave={() => {
                                    setTimeout(() => {
                                       setIsShowOptions(false) 
                                    }, 1000);
                                }}>
                                    <ul>
                                        <div className='modal-s-option'>
                                            <ShareIcon />   
                                            <li>Share</li>
                                        </div>
                                        {
                                            post.users.id == infoUser.id ?
                                            <>
                                                <div className='modal-s-option' onClick={() => {
                                                    setSelectedPost(post)
                                                    setIsEditing(true)
                                                }}>
                                                    <EditIcon />   
                                                    <li>Edit</li>
                                                </div>
                                                <div className='modal-s-option' onClick={() => {
                                                    setSelectedPost(post)
                                                    setIsConfirming(true)
                                                }}>
                                                    <IconTrash />   
                                                    <li className='modal-s-option-trash'>Delete</li>
                                                </div>
                                            </> :
                                            <>  
                                                <div className='modal-s-option'>
                                                    <ReportIcon />
                                                    <li>Report</li>
                                                </div>
                                                <div className='modal-s-option'>
                                                    <FollowIcon />
                                                    <li>Follow</li>
                                                </div>
                                            </>   
                                        }
                                    </ul>
                                </div>
                            }
                            <span onClick={(e) => {
                                    e.stopPropagation()
                                    setIsShowOptions(!isShowOptions)
                                    console.log()
                                }}>
                                <ThreePointsIcon />
                            </span>
                        </div>

                    </div>

                    <div className='user-post-description'>
                        <span ref={textRef} onClick={(e) => e.stopPropagation()}></span>
                    </div>
                </div>

                <div className='user-post-image'>
                    {post.images_url[0] && 
                        <img src={post.images_url[0]} alt="Image Post" loading='lazy'/>
                    }
                </div>
            </div>
        </div>
    )
}