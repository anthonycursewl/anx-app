export const useFetch = async (URL: string, method: string, body: any, setLoading: (v: boolean) => void) => {
    try {
        setLoading(true)
        const res = await fetch(URL, { 
            method: method, 
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null,
            credentials: 'include'
            })

            if (!res.ok) await res.json().then(error => { throw new Error(error.message) })
            const data = await res.json()

            setLoading(false)
            return { data: data }
    } catch (error: any) {
        setLoading(false)
        return { error: error }
    }
}