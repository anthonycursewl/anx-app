export type IUserProfile = {
    id: string;
    bio: string;
    avatar_url: string;
    banner_url: string;
    location: string;
    websites_urls: string[];
    user_id: string;
    users: {
        id: string;
        username: string;
        name: string;
        email: string;
        role_id: string
        is_verified: boolean;
        created_at: string;
    }
}