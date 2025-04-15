import { useEffect, useState } from "react"
import CardPost from "../../main/Posts/components/PostAuth/card-post"
import { InfoPost } from "../../../../shared/interfaces/IPost"
import { useGlobalState } from "../../../../shared/utils/GlobalState"
// Config
import { API_URL } from "../../../../config/anx.config.breadriuss"
// services
import { secureFetch } from "../../../api/secureFetch"
// components
import PostEdit from "../../main/Posts/components/EditPost/PostEdit"
import ModalConfirm from "../../../../shared/components/ModalConfirm"

export default function ListPost({ id }: { id: string }) {
    const [posts, setPosts] = useState<InfoPost[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { setSelectedPost, selectedPost, setSomethingChanged, somethingChanged } = useGlobalState()

    const getPosts = async () => {
        const { data, error } = await secureFetch(`${API_URL}/posts/list/user/${id}`, { method: 'GET', body: null }, setLoading)

        if (error) {
            console.log(error)
            return 
        }

        if (data) {
            setPosts(data)
        }
    }

    const handleDeletePost = async () => {  
        const { data, error } = await secureFetch(`${API_URL}/posts/delete/${selectedPost.id}`, { method: 'DELETE', body: null, stringify: false }, () => {})

        if (error) {
            console.log(error)
            return
        }

        if (data) {
            console.log(data)
            setSomethingChanged(!somethingChanged)
        }
    }

    useEffect(() => {
        getPosts()
    }, [somethingChanged])

    return (
        <>
            {loading ? 
                <div className="loading-spin"></div> : 
            posts.map((post: InfoPost) => 
                <CardPost key={post.id} post={post} setSelectedPost={setSelectedPost} />
            )}

            <PostEdit post={selectedPost}/>
            <ModalConfirm options={{ postInfo: selectedPost, title: 'Are you sure you want to delete this post?', description: "Youn can't undo this action", onConfirm: handleDeletePost, onCancel: () => {}}}/>
        </>
    )
}