import React from 'react'
import profile from '@/assets/images/profile.png'


export default function page() {
    return (
        <div className='w-full -mt-6  items-center justify-center mx-auto bg-white'>
                <main className="flex-1">
                    <section className="h-36 md:h-56 bg-gradient-to-t from-[#00726B] to-[#38B68D] bg-center bg-cover "></section>
                    <section className="container px-4 py-10 mx-auto -mt-28">
                    <div className="flex flex-col items-center">
                        <div className="object-cover w-32 h-32 bg-red-300  border-4 border-white rounded-lg shadow-md">
                        {/* <Image src={profile} alt="profile" width={128} height={128}  /> */}
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-xl font-semibold text-center text-gray-800 sm:text-3xl ">Muhammad Nurifai</h3>
                            <h5 className="text-lg text-center text-gray-500 ">muhammadnurifai@gmail.com</h5>          
                            <div className="flex flex-col items-center mt-10 sm:flex-row sm:space-x-6">
                                <p className="text-gray-500 dark:text-gray-400"><span className="font-bold">5</span> Posts in Forum </p>
                            </div>
                            {/* <div className=" mt-4 flex space-x-3 ">
                            <a href="" className="block px-4 py-2 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg  hover:bg-gray-100  focus:outline-none">
                            <QuestionAnswerRoundedIcon sx={{with: 20, height: 20}}/> My Post
                            </a>
                            <a href="" className="flex items-center justify-center px-4 py-2 space-x-3 text-sm text-gray-600 transition-colors duration-300 transform border active:border-[#00726B] rounded-lg  hover:bg-gray-100  focus:outline-none">
                            <BiSolidBookmark size="20" /> My Bookmark
                            </a>
                            </div> */}
                        </div>
                    </div>
                
                    <div className="w-full md:w-3/4 mx-auto h-96 mt-10">
                        {/* <div key={post.id} className=" items-start px-4 py-6 my-5 shadow-md rounded-lg outline-1 border" >
                            <div className="flex">
                                <div className=" rounded-full mr-2">
                                <Image
                                    src={post.user.photoURL}
                                    alt="Picture of the author"
                                    width={50}
                                    height={50}
                                    className="rounded-full" />
                                </div>
                                <div className="items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900 -mt-1">{post.user.displayName}</p>
                                <p className="text-gray-700 text-sm">
                                {post.data.createdAt._seconds * 1000 > new Date().getTime() - 7 * 24 * 60 * 60 * 1000 ? (
                                    <TimeAgo date={new Date(post.data.createdAt._seconds * 1000)} />
                                ) : (
                                    <span>{new Date(post.data.createdAt._seconds * 1000).toLocaleDateString()}</span>
                                )}
                                </p>
                            </div>
                            </div>
                            <Link href={`/forum/${post.id}`}>
                                <div className="my-3">
                                <p className="text-gray-700 text-xl font-bold">{post.data.title}</p>
                                <p className="text-gray-700">{post.data.topics}</p>
                                </div>
                            </Link>
                            <hr />
                                <div className=" mt-3 flex items-center">
                                    <div className="flex 2 text-gray-700 text-sm mr-3">
                                    <LikeButton itemId={post.id} />
                                    <span>{post.data.likes}</span>
                                    </div>
                                    <div className="flex  text-gray-700 text-sm mr-3">
                                    <BiCommentDetail
                                    size='20'
                                    />
                                    <span>{post.commentCount}</span>
                                    </div>
                                    <div className="flex  text-gray-700 text-sm mr-3">
                                    <Bookmark itemId={post.id} />
                                    </div>
                                    <div className="flex  text-gray-700 text-sm mr-3">
                                        <BiLink size='20'
                                        onClick={() => {
                                        const linkElement = document.querySelector(`a[href="/forum/${post.id}"]`);
                                        const link = (linkElement as HTMLAnchorElement).href;                  
                                        if (link) {
                                            navigator.clipboard.writeText(link);
                                        }
                                        }}
                                        
                                        />
                                    </div>
                                </div>
                            </div> */}
                    </div>
                        
                    
                    
                    </section>
                </main>
            </div>
    )
}