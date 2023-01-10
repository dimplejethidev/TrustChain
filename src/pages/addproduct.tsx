import { NextPage } from 'next';
import { useState } from 'react';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Input from '../components/form-elements/input';
import Button from '../components/form-elements/button';
import FileUpload from '../components/form-elements/file-upload';
import Header from '../components/form-components/Header';

const Addproduct: NextPage = () => {
  const [data, setData] = useState({})
  const [imageUrl, setImageUrl] = useState('')

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleImage = (e: any) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setImageUrl(image)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Submission logics
  }

  return (
    <>
      <Head>
        <title>Add Product</title>
        <meta name="description" content="Chain - Add Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Add Product" />
          <div className="flex flex-col text-center w-full">
            <div className="w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="px-6 py-6 lg:px-8">
                    <form className="space-y-6">
                      <div className="flex flex-col md:flex-row space-x-5">
                        <div className="w-full md:w-1/2 space-y-6">
                          <Input
                            id="productid"
                            name="productid"
                            label="Product ID"
                            type="text"
                            placeholder="Product ID"
                            onChange={handleData}
                          />
                          <Input
                            id="productname"
                            name="productname"
                            label="Product Name"
                            placeholder="Product Name"
                            onChange={handleData}
                          />
                          <Input
                            id="description"
                            name="description"
                            label="Description"
                            placeholder="Description"
                            onChange={handleData}
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                          <Input
                            id="Location"
                            name="Location"
                            label="Location"
                            placeholder="Location"
                            onChange={handleData}
                          />
                          <div className="flex space-x-5">
                            <FileUpload
                              id="productimage"
                              name="productimage"
                              label="Product Image"
                              onChange={handleImage}
                            />
                            <Image 
                              src={imageUrl !== '' ? imageUrl : '/previewIcon.png'} 
                              alt="preview" 
                              width={200} 
                              height={200} />
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px]">
                        <Button
                          label="Add Product"
                          onClick={handleSubmit}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Addproduct