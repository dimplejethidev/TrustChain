import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { AspectRatio, Box } from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import Input from "../components/form-elements/input";
import Select from "../components/form-elements/select";
import Button from "../components/form-elements/button";
import Header from "../components/form-components/Header";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { log } from "console";

const Register: NextPage = () => {
  const [data, setData] = useState({});

  const router = useRouter();

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const roles = [
    { name: "Manufacturer", value: "manufacturer" },
    { name: "Distributor", value: "distributor" },
    { name: "Retailer", value: "retailer" },
   
  ];

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Chain - Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
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
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Select
                        id="roles"
                        name="roles"
                        label="Roles"
                        placeholder="Select role"
                        options={roles}
                        onChange={(event) => {
                          setRole(event.target.selectedIndex - 1);
                        }}
                      />
                      <Button label="Register" onClick={() => {
                        console.log("Role is ", role);
                        
                        if (role === 0) {
                        router.push("https://platform-test.polygonid.com/claim-link/0449bb5d-5d0d-42d5-bf9d-a759fa26675e")
                        } else {
                          router.push("https://platform-test.polygonid.com/claim-link/f0042f20-8d6a-49e6-950b-b59014c3067c")
                        }
                      }} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/registerVector.png"
                width="700"
                height="600"
                alt="Register"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
