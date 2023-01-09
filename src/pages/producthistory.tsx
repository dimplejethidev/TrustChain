import React from 'react';
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Input from '../components/form-elements/input';
import Button from '../components/form-elements/button';
import Header from '../components/form-components/Header';
import Timeline from '../components/timeline';
import ProductDetail from '../components/product-detail';

const Producthistory: NextPage = () => {
  const [data, setData] = useState({});

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Submission logics
  }

  /* Temp Product History Timeline */
  const productHistory = [
    { title: 'Sample Title1', subtitle:"2023", des:"This is a des" },
    { title: 'Sample Title2', subtitle:"2023", des:"This is a des" },
    { title: 'Sample Title3', subtitle:"2023", des:"This is a des" }
  ]

  return (
    <>
      <Head>
        <title>Product History</title>
        <meta name="description" content="Chain -Product History" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Product History" />
          <div className="flex flex-col text-center w-full">
            <div className="w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="flex flex-col md:flex-row space-x-5">
                      <div className="w-full md:w-1/2 space-y-6">
                        <form className="space-y-6">
                          <Input
                            id="productid"
                            name="productid"
                            label="Product ID"
                            type="text"
                            placeholder="Product ID"
                            onChange={handleData}
                          />
                          <Button
                            label="View History"
                            onClick={handleSubmit}
                          />
                        </form>
                        <div>
                          <p className="text-xl font-medium title-font mb-4 text-[#D27D2D]">Product Details</p>
                          <ProductDetail label="Product Id" value="sdfh2516q5dvvvvvqxv3x35" />
                          <ProductDetail label="Product Image" value="/banner.png" type="image" />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 space-y-6">
                        <Timeline points={productHistory} />
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

export default Producthistory