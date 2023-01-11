import { NextPage } from "next";
import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Input from "../components/form-elements/input";
import Button from "../components/form-elements/button";
import Header from "../components/form-components/Header";
import ProductDetail from "../components/product-detail";
import ABI from "../contracts/polygonID_ABI.json";
import logchainABI from "../contracts/logchain.json";
import { useToast } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";

interface ProductDetails {
  name: string;
  description: string;
  imageURL: string;
  locationStatuses: string[];
  timestamp: number;
  locationURL: string;
}

const Updateproduct: NextPage = () => {
  const [productData, setProductData] = useState({});

  const handleData = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const [productID, setProductID] = useState(0);
  const [productLocation, setProuctLocation] = useState("");
  const [locationURL, setLocationURL] = useState("");

  const toast = useToast();

  const { data, isError, isLoading } = useContractRead({
    address: "0x8E1AE3afaD1487F2dE2998aF6FfedA668D673CED",
    abi: logchainABI,
    functionName: "getProduct",
    args: [productID],
  });

  const { config } = usePrepareContractWrite({
    address: "0x8E1AE3afaD1487F2dE2998aF6FfedA668D673CED",
    abi: logchainABI,
    functionName: "addLocationStatus",
    args: [productID, productLocation, locationURL],
  });

  const { data: updateData, write } = useContractWrite(config);

  const { isLoading: isLoadingUpdate, isSuccess } = useWaitForTransaction({
    hash: updateData?.hash,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocationURL(`https://www.google.com/maps?q=${latitude},${longitude}`);
      });
    }
  }, []);

  useEffect(() => {
    if ((data as ProductDetails) && !isLoading) {
      console.log(data);

      const {
        name,
        description,
        imageURL,
        locationStatuses,
        timestamp,
        locationURL,
      } = data as ProductDetails;
      setProductData({
        ...productData,
        name,
        description,
        imageURL,
        locationStatuses,
        timestamp,
        locationURL,
      });
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Location Updated",
        description: "Product location updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

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
                          onChange={(e) => setProductID(parseInt(e.target.value))}
                        />
                        <Input
                          id="Location"
                          name="Location"
                          label="Location"
                          placeholder="Location"
                          onChange={(e) => setProuctLocation(e.target.value)}
                        />
                        <Button
                          label="Update Product"
                          onClick={() => {
                            write?.();
                          }}
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
                  <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-700/60">
                    <div className="px-6 py-6 lg:px-8">
                    <p className="text-xl font-medium title-font mb-4 text-[#D27D2D]">{(productData as any).name}</p>
                    <div className="p-2 flex flex-col">
                      <ProductDetail label="" value={(productData as any).imageURL} type="image" />
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
  );
};

export default Updateproduct;
