import React from 'react'
import PageHero from '../components/PageHero'
import ShowProject from '../components/ShowProject'

const Project = () => {
  return (
    <div>
      <PageHero
        heading="Projects"
        subheading="A showcase of my projects, highlighting my skills and expertise in web development."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        cta={{ text: "Read More", link: "/projects" }}
      />
      <ShowProject/>
    </div>
  )
}

export default Project