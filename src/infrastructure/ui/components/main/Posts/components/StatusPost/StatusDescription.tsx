import { useEffect } from "react"
import { InfoPost } from "../../../../../../../shared/interfaces/IPost"

import { useRef } from "react"
import { parseText } from "../../../../../../../shared/services/parseText"
import * as dp from 'dompurify'	

interface StatusDescriptionProps {
    post: InfoPost | null
}

export default function StatusDescription({ post }: StatusDescriptionProps) {
    const textRef = useRef<HTMLSpanElement>(null)
    
    useEffect(() => {
        const textFormated = parseText(post ? post.content : '')
        const cleanText = dp.default.sanitize(textFormated, { ALLOWED_TAGS: ['a', 'br'] })
        textRef ? textRef.current!.innerHTML = cleanText : null
    }, [])

    return (
        <div className='status-post-description'>
            <span ref={textRef}></span>
        </div>
    )
}