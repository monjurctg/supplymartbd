import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { requestData } from '../api/requestData';
import { Spin } from 'antd';
export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const ref = useRef(null);
  const[loading,setLoading]=useState(false)

  function blobToFile(theBlob, fileName, ext) {
    return new File([theBlob], fileName, {
      type: ext === 'png' ? 'image/png' : 'image/jpeg',
    });
  }

  useEffect(() => {
    async function execute(params) {
 
      if (file) {
        setLoading(true)
        let formData = new FormData();
        formData.append('type', 'search');
        formData.append('source', '1688');
        formData.append('image', file);
        let res = await requestData(
          true,
          'post',
          '/product/search-by-image',
          formData,
        );
        //console.log(res);

        setFile(null);
        setLoading(false)
        router.push(`/shop/china/${res.key}`);
      }

    }
    execute();
  }, [file]);



  function handleImageUpload(event) {
    var imageFile = event.target.files[0];
    console.log(imageFile);
    if (!imageFile || !imageFile.name.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
      return false;
    }
    let ext = imageFile.name.toLowerCase().includes('png') ? 'png' : 'jpg';
    var options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        let finalFile = blobToFile(compressedFile, `image.${ext}`, ext);
        setFile(finalFile);
        console.log(finalFile);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }


  if(loading){
    return   <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 999999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    
    }}
  >
    <Spin size="large" tip="Loading..." />
  </div>
  }

  
  return (
    <div>
      <input
        name="uploadImage"
        ref={ref}
        id="inputId"
        type="file"
        style={{ position: 'fixed', top: '-100em' }}
        onChange={(e) => handleImageUpload(e)}
      ></input>
      <div
        onClick={() => {
          if (ref && ref.current) {
            ref.current.click();
          }
        }}
        style={{
          paddingLeft: '0.5rem',
          border: 'none',
          height: '40px',
          width: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        }}
      >
        <IoCameraOutline size={24} />
        
 
      </div>
    </div>
  );
}
