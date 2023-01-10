import { NextPage } from 'next';
import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Input from '../components/form-elements/input';
import Button from '../components/form-elements/button';
import Header from '../components/form-components/Header';
import ProductDetail from '../components/product-detail';

const Updateproduct: NextPage = () => {
  const [data, setData] = useState({});

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Submission logics
  }

  return (
    <>
      <Head>
        <title>Update Product</title>
        <meta name="description" content="Chain - Update Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 my-8 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Update Product" />
          <div className="flex flex-col lg:flex-row text-center w-full">
            <div className="w-full md:w-1/2">
              <div className="w-full pl-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
                <div className="relative w-full h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="px-6 py-6 lg:px-8">
                      <form className="space-y-6">
                        <Input
                          id="productid"
                          name="productid"
                          label="Product ID"
                          type="text"
                          placeholder="Product ID"
                          onChange={handleData}
                        />
                        <Input
                          id="Location"
                          name="Location"
                          label="Location"
                          placeholder="Location"
                          onChange={handleData}
                        />
                        <Button
                          label="Update Product"
                          onClick={handleSubmit}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full pl-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
                <div className="relative w-full h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="px-6 py-6 lg:px-8">
                    <p className="text-xl font-medium title-font mb-4 text-[#D27D2D]">Product Details</p>
                    <div className="p-2 flex flex-col">
                      <ProductDetail label="Product Id" value="sdfh2516q5dvvvvvqxv3x35" />
                      <ProductDetail label='' value="/vector.png" type="image" />
                    </div>
                    </div>
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

export default Updateproduct