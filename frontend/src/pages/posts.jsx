import React from 'react'
import PageHero from '../components/PageHero'
import PostSidebar from '../components/PostSidebar'
import PostGallery from '../components/PostGallery'
const posts = () => {
  return (
    <div>
      <PageHero 
      heading="Posts" 
      subheading="Welcome to the blog posts page" 
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
      cta={{ text: "Read More", link: "/posts" }}
      />
      <div className='flex md:flex-row flex-col gap-4 container mx-auto my-8 px-4'>
        <PostGallery className="flex-1" />
        <PostSidebar className="w-full md:w-[20%]" />
      </div>
    </div>
  )
}

export default posts