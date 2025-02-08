import { useEffect, useState } from "react"
import './user-posts.css'

// Services & Constants 
import { API_URL } from "../../../../../config/anx.config.breadriuss"
import { secureFetch } from "../../../../api/secureFetch"
import { useGlobalState } from "../../../../../shared/utils/GlobalState"

// Compoents
import CardPost from "./components/PostAuth/card-post"
import CreatePost from "./components/create-post"
import ModalConfirm from "../../../../../shared/components/ModalConfirm"
import PostEdit from "./components/EditPost/PostEdit"

// Types
import { InfoPost } from "../../../../../shared/interfaces/IPost"

export default function UserPosts() {
    const { setPosts, posts, notis, setNotis } = useGlobalState()
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState<InfoPost>({} as InfoPost)

    const getPosts = async () => {
        const { data, error } = await secureFetch(`${API_URL}/posts/list`, { method: 'GET', body: null }, setLoading)

        if  (error) {
            console.log(error)
            return 
        }

        if (data) {
            setPosts(data)
        }
    }

    const ShowPosts = () => {
        return  !loading ? 
        posts.map((post: InfoPost) => <CardPost
        setSelectedPost={setSelectedPost}
        key={post.id}
        post={post}
        />) :
        <div className="loading-spin"></div>
    }

    const handleDeletePost = async () => {
        const { data, error } = await secureFetch(`${API_URL}/posts/delete/${selectedPost.id}`, { method: 'DELETE', body: null, stringify: false }, () => {})
        if (error) {
            setLoading(false)
            console.log(error)
            setNotis([...notis, { message: error || "Error deleting post", type: "error", options: { isLoading: true } }])
        }
        if (data) {
            setLoading(false)
            setNotis([...notis, { message: "Post deleted successfully", type: "success", options: { isLoading: true } }])
        }
    }
    
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <CreatePost />
            <ShowPosts />
            <ModalConfirm options={{ title: 'Do you want to delete this post?', description: "you can't undo this action", postInfo: selectedPost, onConfirm: handleDeletePost, onCancel: () => {}}}/>
            <PostEdit post={selectedPost} />          
        </>
    )
}