export const calculateTimePassed = (isoString: string): string => { 
    const givenDate = new Date(isoString); 
    const currentDate = new Date(); 
    
    const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime(); 

    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)); 
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); 
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    if (differenceInDays > 365) {
        return `${Math.floor(differenceInDays / 365)}y ago`
    }

    if (differenceInDays > 30) {
        return `${Math.floor(differenceInDays / 30)}m ago`
    }
    
    if (differenceInDays > 0) {
        return `${differenceInDays}d ago`
    }

    if (differenceInHours > 0) {
        return `${differenceInHours}h ago`
    }
    
    if (differenceInMinutes > 0) {
        return `${differenceInMinutes}m ago`
    }

    if (differenceInMilliseconds > 0) {
        return `Just now`
    }

    return ''
}