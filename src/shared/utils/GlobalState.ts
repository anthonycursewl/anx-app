import { create } from "zustand";

// Interface for posts
import { InfoPost } from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";
import { ITypeNotification } from "../interfaces/ITypeNotification";
import { getCookie } from "../services/getCookie";
import { IUserProfile } from "../../infrastructure/ui/profile/types/IUserProfile";

const cookie = getCookie('InfoUser')

interface GlobalState { 
    isAuthenticated: boolean | null;
    setIsAuthenticated: (isAuthenticated: boolean | null) => void;
    posts: Array<InfoPost>;
    setPosts: (posts: Array<InfoPost>) => void;
    infoUser: IUser;
    setInfoUser: (infoUser: IUser) => void 
    loadingData: boolean | null;
    setLoadingData: (loadingData: boolean | null) => void
    hasChanged: boolean;
    setHasChanged: (hasChanged: boolean) => void
    isConfirming: boolean;
    setIsConfirming: (isConfirming: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;   
    notis: ITypeNotification[];
    setNotis: (notis: Array<ITypeNotification>) => void;
    selectedPost: InfoPost | null;
    setSelectedPost: (selectedPost: InfoPost | null) => void;
    somethingChanged: boolean;
    setSomethingChanged: (somethingChanged: boolean) => void;
    isEditingProfile: boolean;
    setIsEditingProfile: (isEditingProfile: boolean) => void;
    profile: IUserProfile;
    setProfile: (profile: IUserProfile) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    isAuthenticated: null,
    setIsAuthenticated: (isAuthenticated: boolean | null) => set({ isAuthenticated }),
    posts: Array<InfoPost>(),
    setPosts: (posts: Array<InfoPost>) => set({ posts }),
    infoUser: cookie ? JSON.parse(cookie) : {},
    setInfoUser: (infoUser: IUser) => set({ infoUser }),
    loadingData: null,
    setLoadingData: (loadingData: boolean | null) => set({ loadingData }),
    hasChanged: false,
    setHasChanged: (hasChanged: boolean) => set({ hasChanged }),
    isConfirming: false,
    setIsConfirming: (isConfirming: boolean) => set({ isConfirming }),
    isEditing: false,
    setIsEditing: (isEditing: boolean) => set({ isEditing }),
    notis: Array<ITypeNotification>(),
    setNotis: (notis: ITypeNotification[]) => set({ notis }),
    selectedPost: {
        id: 'loaded',
        content: '',
        created_at: '',
        updated_at: '',
        images_url: [],
        users: {
            id: '',
            username: '',
            name: '',
            is_verified: false,
            user_profile: [{ avatar_url: '' }]
        }
    },
    setSelectedPost: (selectedPost: InfoPost | null) => set({ selectedPost }),
    somethingChanged: false,
    setSomethingChanged: (somethingChanged: boolean) => set({ somethingChanged }),
    isEditingProfile: false,
    setIsEditingProfile: (isEditingProfile: boolean) => set({ isEditingProfile }),
    profile: { id: 'loaded', bio: '', avatar_url: '', banner_url: '', location: '', websites_urls: [], user_id: '', users: { id: '', username: '', name: '', email: '', role_id: '', is_verified: false, created_at: '' } },
    setProfile: (profile: IUserProfile) => set({ profile }),
    currentPage: 1,
    setCurrentPage: (currentPage: number) => set({ currentPage })
}))