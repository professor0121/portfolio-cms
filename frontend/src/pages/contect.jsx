import React from 'react'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'

const contect = () => {
  return (
    <div>
      <PageHero
        heading="Contact Us"
        subheading="Organize your content with categories."
        image="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1950&q=80"
      />
        <ContactForm />
    </div>
  )
}

export default contect