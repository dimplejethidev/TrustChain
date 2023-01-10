import { NextPage } from "next";
import { useState, useEffect } from "react";
import React from "react";
import Head from "next/head";
import Input from "../components/form-elements/input";
import Button from "../components/form-elements/button";
import FileUpload from "../components/form-elements/file-upload";
import Header from "../components/form-components/Header";
import {
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../contracts/polygonID_ABI.json";
import { useToast } from "@chakra-ui/react";
import { Web3Storage } from "web3.storage";
import logchainABI from "../contracts/logchain.json";
import manufacturerQR from "../contracts/manufacturer/manufacturer.json";
import { useDisclosure } from "@chakra-ui/react";
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
import { QRCode } from "react-qr-svg";

const Addproduct: NextPage = () => {
  const [productData, setProductData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");

  const [eventHappened, setEventHappened] = useState(false);

  const handleData = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    // Submission logics
  };

  useContractEvent({
    address: "0x4d213FaeCab2722Ca377811507a5Dc2c4E139AFF",
    abi: ABI,
    eventName: "ProofSubmitted",
    listener: (result, error) => {
      setEventHappened(result as boolean);
    },
  });

  const toast = useToast();

  const { config } = usePrepareContractWrite({
    address: "0xCd54a529618f5bDa042A8cAEFbAB802C6A796E64",
    abi: logchainABI,
    functionName: "addProduct",
    args: [
      (productData as any).productid,
      (productData as any).productname,
      (productData as any).description,
      (productData as any).Location,
      (productData as any).productimage,
    ],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Product Added",
        description: "Product has been added successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (eventHappened) {
      toast({
        title: "Manufacturer Role Verified",
        description: "Manufacturer Role has been verified successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      write?.();
    }
  }, [eventHappened]);

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
                              onChange={(e: any) => {
                                const image = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                setImage(image);
                                const files = (e.target as HTMLInputElement)
                                  .files!;
                                const client = new Web3Storage({
                                  token:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
                                });
                                client.put(files).then((cid) => {
                                  console.log(cid);

                                  handleData(e);
                                });
                              }}
                            />
                            <Image
                              src={image !== "" ? image : "/previewIcon.png"}
                              alt="preview"
                              width={200}
                              height={200}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px]">
                        <Button label="Add Product" onClick={onOpen} />
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              {" "}
                              Verify your Manufacturer Role{" "}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Box className="flex flex-col items-center justify-center">
                                <QRCode
                                  level="Q"
                                  style={{ width: 256 }}
                                  value={JSON.stringify(manufacturerQR)}
                                />
                              </Box>
                            </ModalBody>
                            <ModalFooter>
                              <Button label="Close" onClick={onClose} />
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
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
  );
};

export default Addproduct;
