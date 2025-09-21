import React from 'react'
import UploadMedia from '../components/UploadMedia'
import ShowMedia from '../components/ShowMedia'

const MediaPage = () => {
  return (
    <div className="min-h-screen flex flex-col p-6 overflow-y-auto">
      {/* Upload Section */}
      <UploadMedia />

      {/* Media Display Section */}
      <div className="mt-8 flex-1 overflow-y-auto">
        <ShowMedia />
      </div>
    </div>
  )
}

export default MediaPage
