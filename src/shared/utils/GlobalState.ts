import { create } from "zustand";

// Interface for posts
import { InfoPost } from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";
import { ITypeNotification } from "../interfaces/ITypeNotification";
import { getCookie } from "../services/getCookie";

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
    selectedPost: InfoPost;
    setSelectedPost: (selectedPost: InfoPost) => void;
    somethingChanged: boolean;
    setSomethingChanged: (somethingChanged: boolean) => void;
    isEditingProfile: boolean;
    setIsEditingProfile: (isEditingProfile: boolean) => void
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
    selectedPost: {} as InfoPost,
    setSelectedPost: (selectedPost: InfoPost) => set({ selectedPost }),
    somethingChanged: false,
    setSomethingChanged: (somethingChanged: boolean) => set({ somethingChanged }),
    isEditingProfile: false,
    setIsEditingProfile: (isEditingProfile: boolean) => set({ isEditingProfile })
}))