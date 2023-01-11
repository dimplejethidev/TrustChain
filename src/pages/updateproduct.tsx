import { NextPage } from 'next';
import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Input from '../components/form-elements/input';
import Button from '../components/form-elements/button';
import Header from '../components/form-components/Header';
import ProductDetail from '../components/product-detail';
import distributorQR from '../contracts/distributor/distributor.json';
import { useDisclosure, useToast } from "@chakra-ui/react";
import { QRCode } from "react-qr-svg";
import logchainABI from "../contracts/logchain.json";
import ABI from "../contracts/polygonID_ABI.json";
import {
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead
} from "wagmi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
} from "@chakra-ui/react";

interface ProductDetails {
  name: string;
  description: string;
  imageURL: string;
  locationStatuses: string[];
  timestamp: number[];
  locationURL: string[];
}

const Updateproduct: NextPage = () => {
  const [productData, setProductData] = useState({});
  const [productID, setProductID] = useState(0);
  const [productLocation, setProuctLocation] = useState('');
  const [locationURL, setLocationURL] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  const toast = useToast();

  const { data, isError, isLoading } = useContractRead({
    address: "0x3f4210Da2916100118DE851C5ff72B5B9A707E21",
    abi: logchainABI,
    functionName: "getProduct",
    args: [productID],
  });

  const { config } = usePrepareContractWrite({
    address: "0x3f4210Da2916100118DE851C5ff72B5B9A707E21",
    abi: logchainABI,
    functionName: "addLocationStatus",
    args: [productID, productLocation, locationURL],
  });
  const { data: updateData, write } = useContractWrite(config);

  const { isLoading: isLoadingUpdate, isSuccess } = useWaitForTransaction({
    hash: updateData?.hash,
  })

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocationURL(`https://www.google.com/maps?q=${latitude},${longitude}`);
      });
    }
  }, []);

  useContractEvent({
    address: "0xe857e34e6d6915e1A497a3f516336F8f31292563",
    abi: ABI,
    eventName: "ProofSubmitted",
    listener: (eventHappened, userAddress, error) => {
      if (eventHappened) {
        setUserAddress(userAddress as string);
      }
    },
  });
 
  useEffect(() => {
    if ((data as ProductDetails) && !isLoading) {
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
  }, [data, isLoading, productData]);

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

  useEffect(() => {
    if (userAddress == address) {
      toast({
        title: "Distributor Role Verified",
        description: "Distributor Role has been verified successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      write?.();
    }
  }, [userAddress, address, toast, onClose, write]);

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
                          onClick={onOpen}
                        />
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              {" "}
                              Verify your Distributor Role{" "}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Box className="flex flex-col items-center justify-center">
                                <QRCode
                                  level="Q"
                                  style={{ width: 350 }}
                                  value={JSON.stringify(distributorQR)}
                                />
                              </Box>
                            </ModalBody>
                            <ModalFooter>
                              <Button label="Close" onClick={onClose} />
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
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
                       
                        <ProductDetail label="" value={(productData as any).imageURL} type="image" />                      </div>
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
