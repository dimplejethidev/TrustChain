import React from 'react';
import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Input from '../components/form-elements/input';
import Select from '../components/form-elements/select';
import Button from '../components/form-elements/button';
import Header from '../components/form-components/Header';

const Register: NextPage = () => {
  const [data, setData] = useState({});

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Submission logics
  }

  const roles = [
    { name: 'Retailer', value: 'retailer' },
    { name: 'Distributor', value: 'distributor' },
    { name: 'Manufacturer', value: 'manufacturer' },
  ]

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Chain - Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Register" />
          <div className="flex flex-col md:flex-row text-center w-full">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="px-6 py-6 lg:px-8">
                    <form className="space-y-6">
                      <Input
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        onChange={handleData}
                      />
                      <Input
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        type="email"
                        onChange={handleData}
                      />
                      <Select
                        id="roles"
                        name="roles"
                        label="Roles"
                        placeholder="Select role"
                        options={roles}
                        onChange={handleData}
                      />
                      <Button label="Connect Wallet" onClick={handleSubmit} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image src="/register.png" width="500" height="500" alt="Register" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Register