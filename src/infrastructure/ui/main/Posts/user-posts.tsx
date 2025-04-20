import { useState, useEffect, useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import './user-posts.css';

// Services & Constants
import { API_URL } from '../../../../config/anx.config.breadriuss';
import { secureFetch } from '../../../api/secureFetch';
import { useGlobalState } from '../../../../shared/utils/GlobalState';

// Components
import CardPost from './components/PostAuth/card-post';
import CreatePost from './components/create-post';
import ModalConfirm from '../../../../shared/components/ModalConfirm';
import PostEdit from './components/EditPost/PostEdit';

// Types
import { InfoPost } from '../../../../shared/interfaces/IPost';

const POSTS_PER_PAGE = 10;
const ESTIMATED_ITEM_HEIGHT = 250;

export default function UserPosts() {
    // Global State
    const { notis, setNotis, setSelectedPost, selectedPost, posts, setPosts, currentPage, setCurrentPage } = useGlobalState();

    // Pagination
    const [hasMore, setHasMore] = useState<boolean>(true);

    // Loading states
    const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    // Refresh state
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    // refs
    const positioningRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    const fetchPostsPage = useCallback(async (pageToFetch: number): Promise<{ data: InfoPost[], hasMore: boolean }> => {
        const url = `${API_URL}/posts/list?skip=${pageToFetch}&take=${POSTS_PER_PAGE}`;
        const { data, error } = await secureFetch(url, { method: 'GET', body: null }, () => {});

        if (error) {
            setNotis([...notis, { message: `Error fetching posts: ${error.message || error}`, type: "error", options: { isLoading: true } }]);
             return { data: [], hasMore: false };
         }

         if (data) {
            const moreAvailable = data.length === POSTS_PER_PAGE;
            return { data: data as InfoPost[], hasMore: moreAvailable };
        } 
            
        setNotis([...notis, { message: "Received invalid data format", type: "warning", options: { isLoading: true } }]);
        return { data: [], hasMore: false };
    }, []);

    useEffect(() => {
        if (isRefreshing) return;

        let isMounted = true;
        setIsLoadingInitial(true);

        fetchPostsPage(1).then(({ data, hasMore: moreData }) => {
            if (isMounted) {
                setPosts(data);
                setHasMore(moreData);
                if (moreData) {
                    setCurrentPage(2);
                }
            }
        }).finally(() => {
            if (isMounted) {
                setIsLoadingInitial(false);
            }
        });

        return () => { isMounted = false };
    }, [fetchPostsPage, isRefreshing]);

    const loadMore = useCallback(async () => {
        if (isLoadingInitial || isLoadingMore || !hasMore || isRefreshing) {
            console.log('Already loading or no more data to load.');
            return;
        }
        console.log('Loading more posts...');
        
        setIsLoadingMore(true);
        const { data: newPosts, hasMore: moreData } = await fetchPostsPage(currentPage);
        if (newPosts.length > 0) {
            setPosts([...posts, ...newPosts]);

            if (newPosts.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }
        }

        setHasMore(moreData);
        if (moreData) {
            setCurrentPage(currentPage + 1);
        }

        setIsLoadingMore(false);

    }, [isLoadingInitial, isLoadingMore, hasMore, currentPage, fetchPostsPage, isRefreshing]);

    // @ts-ignore
    const handleRefresh = useCallback(async () => {
        if (isLoadingInitial || isLoadingMore || isRefreshing) {
            return;
        }
        setIsRefreshing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            const { data: refreshedPosts, hasMore: moreData } = await fetchPostsPage(1);

            setPosts(refreshedPosts);
            setHasMore(moreData);

            if (moreData) {
                setCurrentPage(2);
            } 

        } catch (error) {
            console.error("Error during refresh:", error);
        } finally {
            setIsRefreshing(false);
            setIsLoadingInitial(false);
            setIsLoadingMore(false);
        }
    }, [fetchPostsPage, isLoadingInitial, isLoadingMore, isRefreshing, setPosts, setHasMore, setCurrentPage, setIsLoadingInitial, setIsLoadingMore]);

    const rowVirtualizer = useVirtualizer({
        count: hasMore ? posts.length + 1 : posts.length,
        getScrollElement: () => typeof window !== 'undefined' ? document.documentElement : null,
        getItemKey: (index) => posts[index]?.id ?? index,
        estimateSize: () => ESTIMATED_ITEM_HEIGHT,
        overscan: 5,
        measureElement: typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
         ? element => element.getBoundingClientRect().height
         : undefined,
    });

    useEffect(() => {
        const loaderElement = loaderRef.current

        if (!loaderElement || !hasMore || isLoadingMore) return; 

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry.isIntersecting && !isLoadingMore) {
                loadMore();
            }
        }

        const observer = new IntersectionObserver(observerCallback, options);
        observer.observe(loaderElement);

        return () => {
            observer.disconnect();
        }
    }, [hasMore, isLoadingMore, loadMore, loaderRef]);


     // --- Delete Post ---
     const handleDeletePost = async () => {
         if (!selectedPost) return;
        const postIdToDelete = selectedPost.id;
        const { data, error } = await secureFetch(`${API_URL}/posts/delete/${postIdToDelete}`, { method: 'DELETE', body: null, stringify: false }, () => {});

        if (error) {
            console.error("Error deleting post:", error);
            setNotis([...notis, { message: error.message || "Error deleting post", type: "error", options: { isLoading: true } }]);
        }

        if (data) {
            setNotis([...notis, { message: 'Post deleted successfully', type: 'success', options: { isLoading: true } }]);
            const prevScrollTop = document.documentElement.scrollTop;
            setPosts(posts.filter(p => p.id !== postIdToDelete));
            rowVirtualizer.measure();
            setSelectedPost(null);
             requestAnimationFrame(() => {
                 requestAnimationFrame(() => {
                    document.documentElement.scrollTop = prevScrollTop;
                 });
             });
        }
    };

    return (
        <>
            <CreatePost />
            {isLoadingInitial && posts.length === 0 && <div className="loading-spin"></div>}
            <div ref={positioningRef} style={{ width: '100%', position: 'relative' }}>
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'static' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const isLoaderRow = virtualItem.index >= posts.length;
                        const post = posts[virtualItem.index];
                        return (
                            <div
                                key={virtualItem.key}
                                ref={rowVirtualizer.measureElement}
                                data-index={virtualItem.index}
                                style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%',
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}>
                                {isLoaderRow ? (
                                    hasMore ? <div ref={loaderRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}><div className='loading-spin'></div></div> : null
                                ) : post ? (
                                    <CardPost post={post} setSelectedPost={setSelectedPost}/>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
            {!hasMore && posts.length > 0 && <div style={{ textAlign: 'center', padding: '10px', color: 'grey' }}>--</div>}
            {selectedPost && (
               <>
                 <ModalConfirm options={{
                    title: 'Delete Post',
                    description: 'Are you sure you want to delete this post?',
                    onConfirm: handleDeletePost,
                    onCancel: () => setSelectedPost(null),
                    postInfo: selectedPost,
                 }} />
                 <PostEdit post={selectedPost} />
               </>
            )}
        </>
    );
}