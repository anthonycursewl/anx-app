import { API_URL } from "../../config/anx.config.breadriuss"

interface options {
    method: string
    body: any
    content_type?: string
    stringify?: boolean
}

export const secureFetch = async (URL: string, options: options = { method: 'GET', body: null, stringify: true }, setLoading: (v: boolean) => void) => {
    try {
        setLoading(true)
        const res = await fetch(URL, {
            method: options.method,
            headers: options.content_type ? { 'Content-Type': options.content_type } : {},
            credentials: 'include',
            body: options.body ? options.stringify ? JSON.stringify(options.body) : options.body : null
        })
        
        if (!res.ok) {
            const renovateToken = await fetch(`${API_URL}/auth/verify/refresh`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!renovateToken.ok) await res.json().then(error => { throw new Error(error.message) })
            
            const again = await fetch(URL, {
                method: options.method,
                headers: options.content_type ? { 'Content-Type': options.content_type } : {},
                credentials: 'include',
                body: options.body ? options.stringify ? JSON.stringify(options.body) : options.body : null
            })

            if (!again.ok) await res.json().then(error => { throw new Error(error.message) })
            const data = await again.json()
            setLoading(false)
            return { data: data }
        }
            
        const data = await res.json()
        setLoading(false)
        return { data: data }
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}