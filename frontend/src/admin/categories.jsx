import React from 'react'
import ShowCategories from '../components/ShowCategories'
import CreateCategory from '../components/CreateCategory'

const categories = () => {
  return (
    <div>
      <CreateCategory />
      <ShowCategories />
    </div>
  )
}

export default categories