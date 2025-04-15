import { IUserProfile } from "../types/IUserProfile";
export const ShowLinks = ({ profile }: { profile: IUserProfile }) => {
        if (!profile.websites_urls || profile.websites_urls.length === 0) return
        let parseLinks = []
        for (let i = 0; i < profile.websites_urls.length; i++) {
            const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
            if (regex.test(profile.websites_urls[i])) {
                parseLinks.push(profile.websites_urls[i])
            }
        }

        return parseLinks.length > 0 ? parseLinks.map((link, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="">
                {link}
            </a>
        ))
        : null
}