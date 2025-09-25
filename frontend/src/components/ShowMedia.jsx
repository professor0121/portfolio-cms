import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMedia } from '../redux/slices/mediaSlice'
import Loader from './Loader'

const ShowMedia = () => {
  const dispatch = useDispatch()
  const { mediaList, loading, error } = useSelector((state) => state.media)
  const [copiedUrl, setCopiedUrl] = useState("")

  useEffect(() => {
    dispatch(getAllMedia())
  }, [dispatch])

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(""), 2000) // reset after 2s
  }

  return (
    <div>
      {loading && <p><Loader/></p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {mediaList.map((media, index) => (
          <div
            key={index}
            className="bg-transparent rounded-lg shadow-md p-3 flex flex-col items-center gap-2"
          >
            {media.type === "image" && (
              <img src={media.url} alt="" className="w-full h-48 object-cover rounded-md" />
            )}
            {media.type === "video" && (
              <video src={media.url} controls className="w-full h-48 rounded-md" />
            )}
            {media.type === "raw" && (
              <a
                href={media.url}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File
              </a>
            )}

            {/* Copy URL */}
            <div className="w-full flex items-center justify-between mt-2">
              <input
                type="text"
                readOnly
                value={media.url}
                className="flex-1 border bg-transparent border-gray-300 rounded-l-md p-1 text-sm truncate"
              />
              <button
                onClick={() => handleCopy(media.url)}
                className="bg-blue-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700 transition"
              >
                {copiedUrl === media.url ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowMedia
