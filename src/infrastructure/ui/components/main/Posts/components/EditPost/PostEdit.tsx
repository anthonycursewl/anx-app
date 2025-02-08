import './PostEdit.css'
import { createPortal } from 'react-dom'

// Interfaces
import { PostEditProps } from '../../../../../../../shared/interfaces/IEditPost'
import { useGlobalState } from '../../../../../../../shared/utils/GlobalState'
import { useEffect, useState } from 'react'

// Svgs 
import SavePost from '../../../../../../../assets/svgs/post/SavePost'
import { IconTrashCancel } from '../../../../../../../assets/svgs/post/IconTrash'
import { secureFetch } from '../../../../../../api/secureFetch'
import { API_URL } from '../../../../../../../config/anx.config.breadriuss'

export default function PostEdit({ post }: PostEditProps) {
    const { isEditing, setIsEditing, notis, setNotis } = useGlobalState()
    const [content, setContent] = useState<string>(post.content)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isEditing) {
            document.body.style.overflow = 'hidden'
            setContent(post.content)
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isEditing])

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isEditing) return

        if (content === post.content) {
            setIsEditing(false)
            setNotis([...notis, { message: 'ANX | No changes made.', type: 'warning', options: { isLoading: false } }])
            return
        }

        const { data, error } = await secureFetch(`${API_URL}/posts/update/${post.id}`, { method: 'PUT', body: { content: content, updated_at: new Date().toISOString() }, stringify: true, content_type: 'application/json' }, setLoading)

        if (error) {
            console.log(error)
            setNotis([...notis, { message: error || 'ANX | Error updating post.', type: 'error', options: { isLoading: true } }])
            setIsEditing(false)
            return 
        }

        if (data) {
            setNotis([...notis, { message: 'ANX | Post updated successfully.', type: 'success', options: { isLoading: true } }])
            setIsEditing(false)
            console.log(data)
        }
     }

    const handleClose = (e: React.FormEvent) => {
        e.preventDefault()
        setIsEditing(false)
    }

    return createPortal(
        <div className={`post-edit ${isEditing ? 'active' : ''}`} onClick={() => setIsEditing(false)}>
            <div className='post-edit-content' onClick={e => e.stopPropagation()}>
                <form className='post-edit-form' onSubmit={handleSumbit}>

                    <div className='post-edit-profile'>
                        <img src={isEditing ? post.users.user_profile[0].avatar_url : ''} alt="" />
                        <textarea name="content" id="cotent" value={isEditing ? content : ''} onChange={e => setContent(e.target.value)}>
                        </textarea>
                    </div>

                    {isEditing && post.images_url.length > 0 &&
                    <div className='post-edit-images'>
                            <img src={post.images_url[0]} alt={`Image in the post ${post.id}`} />
                    </div>
                    }
                    <div className='post-edit-buttons'>
                        {
                        loading ? <div className='loading-spin'></div> :
                        <>
                            <button>
                                <SavePost />
                                Save
                            </button>
                            <button onClick={handleClose}>
                                <IconTrashCancel />
                                Cancel
                            </button>
                        </>
                        }
                    </div>

                </form>
            </div>  
        </div>,
        document.getElementById('post-edit')!   
    )
}