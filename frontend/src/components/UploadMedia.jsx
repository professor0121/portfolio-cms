// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { uploadMedia } from "../redux/slices/mediaSlice";

// const UploadMedia = () => {
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();
//   const { loading, mediaList } = useSelector((state) => state.media);

//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handleUpload = () => {
//     if (file) dispatch(uploadMedia(file));
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Uploading..." : "Upload"}
//       </button>

//       <div className="mt-4">
//         {mediaList.map((media, index) => (
//           <div key={index}>
//             {media.type.startsWith("image") && <img src={media.url} alt="" width="200" />}
//             {media.type.startsWith("video") && <video src={media.url} controls width="300" />}
//             {media.type === "application/pdf" && <a href={media.url} target="_blank">View PDF</a>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UploadMedia;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../redux/slices/mediaSlice";
import { Card } from "./ui/card";

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.media);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = () => {
    if (file) dispatch(uploadMedia(file));
  };

  return (
    <Card className="bg-transparent text-white p-6 space-y-4 h-[20vh] flex flex-col justify-center items-center mx-10 my-10">
      {/* Upload Section */}
        <input
          type="file"
          onChange={handleFileChange}
          className=""
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white font-semibold transition-colors 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
    </Card>
  );
};

export default UploadMedia;

