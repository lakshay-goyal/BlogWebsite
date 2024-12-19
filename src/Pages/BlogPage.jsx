import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const [relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const { setLoading, loading } = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error fetching blog data:", error);
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(blogId) {
            fetchRelatedBlogs();
            // Scroll to top when navigating to a new blog
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 pt-20 pb-16 max-w-4xl">
                <button
                    onClick={() => navigation(-1)}
                    className="mb-8 px-4 py-2 flex items-center gap-2 rounded-lg bg-white hover:bg-gray-100 text-gray-600 shadow-sm transition-colors"
                >
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>

                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-gray-600">Loading blog content...</p>
                    </div>
                ) : blog ? (
                    <div className="space-y-12">
                        <article className="bg-white rounded-xl shadow-sm p-6">
                            <BlogDetails post={blog} />
                        </article>

                        {relatedblogs.length > 0 && (
                            <section className="mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4">
                                    Related Blogs
                                </h2>
                                <div className="grid gap-6">
                                    {relatedblogs.map((post) => (
                                        <article 
                                            key={post.id} 
                                            className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:translate-y-[-2px]"
                                        >
                                            <BlogDetails post={post} />
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                        <svg 
                            className="w-16 h-16 text-gray-400 mb-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-xl text-gray-600 mb-2">No Blog Found</p>
                        <p className="text-gray-500">
                            The blog you're looking for might have been removed or is temporarily unavailable.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlogPage;