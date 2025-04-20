import { InfoPost } from "./IPost"
export interface CardPostProps { 
    post: InfoPost,
    setSelectedPost: (post: InfoPost) => void
    style?: React.CSSProperties
}