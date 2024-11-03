import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type responseAPI = {
  message: string;
  data: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: {
      collectionId: string;
      collectionName: string;
      description: string;
      id: string;
      name: string;
      price: number;
      stock: number;
      images: string[];
    }[];
  };
};

async function fetchItems(product: string) {
  try {
    const localUrl = `http://localhost:3000/api/${product}`;
    const response = await axios(localUrl);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data: responseAPI = await response.data;
    return data.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const items = await fetchItems(product);

  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded shadow-md w-full max-w-md"
        >
          <Image
            src={item.images[0]}
            alt={item.name}
            width={100}
            height={100}
          />
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Stock: {item.stock}</p>
        </div>
      ))}
      <Link
        href="/keycaps"
        className="rounded-full border border-solid border-black transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Keycaps
      </Link>
      <Link
        href="/switches"
        className="rounded-full border border-solid border-black transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Switches
      </Link>
    </div>
  );
}
