
import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
// const Test2 = () => {
//     // specify upload params and url for your files

    
//     // called every time a file's `status` changes
//     // 
    
//     // receives array of files that are done uploading when submit button is clicked
   
  
//     return (
//      
//       <h1>Hello</h1>
//     )
//   }
  
//   export default <Test2 />


export default function Test2() {
      const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
      const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
      const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
      }
  return (
      <div style={{marginTop:200}}>
         <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
      />
      </div>
  ) ;
}
