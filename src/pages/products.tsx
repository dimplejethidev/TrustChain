import { SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import contractABI from "../contracts/logchain.json";

export default function Products() {
  const cardInfo = [
    {
      productId: 1,
      name: "React v18.0",
      description: "React v18.0 is the latest version of React",
      imageURL:
        "https://bafkreie5zeuhbimhjfnapiqpf5n3gqx2q7b6ndfjaryupbkgcmgjaxjsua.ipfs.nftstorage.link",
    },
    {
      productId: 2,
      name: "React v17.0",
      description: "React v17.0 is the latest version of React",
      imageURL:
        "https://bafkreie5zeuhbimhjfnapiqpf5n3gqx2q7b6ndfjaryupbkgcmgjaxjsua.ipfs.nftstorage.link",
    },
    {
      productId: 3,
      name: "React v16.0",
      description: "React v16.0 is the latest version of React",
      imageURL:
        "https://bafkreie5zeuhbimhjfnapiqpf5n3gqx2q7b6ndfjaryupbkgcmgjaxjsua.ipfs.nftstorage.link",
    },
  ];

  interface ProductDetails {
    productId: number;
    name: string;
    description: string;
    imageURL: string;
    locationStatuses: string[];
    timestamp: number[];
    locationURL: string[];
  }

  const [productData, setProductData] = useState([{}]);
  const [productHistory, setProductHistory] = useState([
    { title: "Created Location" },
  ]);
  const handleData = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const { data, isError, isLoading } = useContractRead({
    address: "0x3f4210Da2916100118DE851C5ff72B5B9A707E21",
    abi: contractABI,
    functionName: "getAllProducts",
  });

  useEffect(() => {
    if ((data as ProductDetails[]) && !isLoading) {
      let products = [];
      for (let product of data as ProductDetails[]) {
        products.push({
          productId: Number((product.productId as any)._hex),
          title: product.name,
          description: product.description,
          imageURL: product.imageURL,
        });
      }
      setProductData(products);
      
      // const productDetails = data as ProductDetails[];
      // setProductHistory(
      //   locationStatuses.map((location: string, index: number) => {
      //     const convertedTime = timestamp[index];
      //     const date = new Date(convertedTime * 1000).toLocaleString();
      //     return {
      //       title: location,
      //       time: date,
      //       Location: locationURL[index],
      //     };
      //   })
      // );
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, xl: 3 }}
      spacing={"20"}
      maxW={"container.xl"}
      my={16}
      mx={"auto"}
    >
      {productData.map((products: any, index: number) => (
        <ProductCard {...products} index={index} key={index} />
      ))}
    </SimpleGrid>
  );
}
