// import { getFetchUrl } from "@/u/getFetchUrl"
// import { notFound } from "next/navigation"
// import { StarIcon } from "@heroicons/react/24/solid"

export const revalidate = 720;

type Props = {
    params: {
        id: string;
    };
};

function ProductPage({ params: { id } }: Props ) {
    // API Endpoint for Product Details
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage