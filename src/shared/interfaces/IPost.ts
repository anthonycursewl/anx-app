export interface InfoPost {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    images_url: Array<string>;
    users: {
        id: string;
        username: string;
        name: string;
        is_verified: boolean;
        user_profile: Array<{ avatar_url: string }>
    }
}