/* eslint-disable @next/next/no-img-element */
import { getFetchUrl } from "@/u/getFetchUrl"
import { ProductData } from "#/typings"
import { notFound } from "next/navigation"
import { StarIcon } from "@heroicons/react/24/solid"

export const revalidate = 720;

type Props = {
    params: {
        id: string;
    };
};

async function ProductPage({ params: { id } }: Props ) {
    // API Endpoint for Product Details
    const response = await fetch(getFetchUrl(`/api/shopping/product/${id}`));
    const productData = (await response.json()) as ProductData;

    if(!productData.content.pricing){
        notFound()
    }



  return (
    <div className="p-12 pt-0">
        <h1 className="text-2xl">{productData.content.title}</h1>

        {/* Rating Section */}
        {productData.content.reviews && (
         <div className="flex space-x-">
            <p className='mr-2'>Rating:{" "}</p>
            {[
                ...Array.from({
                    length: Math.round(productData.content.reviews.rating),
                }),
            ].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-amber-500" />
            ))}

            {/* Show remaining stars out of 5 as grey */}
            {[
                ...Array.from({
                    length: 5 - Math.round(productData.content.reviews.rating),
                }),
            ].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-stone-400" />
            ))}
         </div>   
        )}

        {/* Images Section  */}
        <section className="flex flex-col lg:flex-row mt-5 md:mt-0">
            <div className="md:p-10 md:pl-0 mx-auto">

                <div className="flex gap-4">
                    <img
                        className="h-80 w-80 p-5 border border-stone-200 rounded-md object-contain shadow-md"
                        src={productData.content.images?.full_size[0]}
                        alt=''
                    />
                    <div className="flex flex-col justify-between">
                        {productData.content.images?.full_size 
                        .slice(1, 3)
                        .map((image) => (
                            // eslint-disable-next-line react/jsx-key
                            <img
                            className="h-[9.75rem] w-[9.75rem] p-5 border border-stone-200 rounded-md object-contain shadow-md"
                            src={image}
                            alt=''
                        />
                        ))}
                    </div>
                </div>

                <div className="flex space-x-6 overflow-x-scroll py-2 md:w-[30rem] scrollbar-hide">
                    {productData.content.images?.full_size.slice(3).map((image) => (
                        // eslint-disable-next-line react/jsx-key
                        <img
                            className="h-20 w-20 border border-stone-200 rounded-md object-contain shadow-md "
                            src={image}
                            alt=''
                        />
                    ))}

                </div>

            </div>

            {/* Product  Pricing Details Section */}
            <div className="pt-10 flex-1">
                <div className="">
                        {productData.content.pricing.online[0].details&&(
                            <>
                                <h3 className="text-2xl font-bold">Pricing Details</h3>

                                <p>
                                    {productData.content.pricing.online[0].price_total}
                                    {' '}
                                    {productData.content.pricing.online[0].currency}
                                </p>

                                <div className="flex space-x-4">
                                    <p className="text-sm text-stone-400">
                                        (
                                            {productData.content.pricing.online[0].price}
                                            {' '}
                                            {productData.content.pricing.online[0].currency}
                                             +{' '}
                                            {productData.content.pricing.online[0].price_tax}
                                            {' '}
                                            {productData.content.pricing.online[0].currency}
                                             tax
                                        )
                                    </p>

                                    {productData.content.pricing.online.length > 1 && (
                                        <p className="text-sm text-sky-600">
                                            + {productData.content.pricing.online.length - 1} more
                                            prices
                                        </p>   
                                    )}
                                </div>

                                <p className="text-sm text-slate-600 mt-5">
                                    {productData.content.pricing.online[0].details}
                                </p>
                            </>    
                        )}

                        <hr className="my-5 shadow-sm" />

                        {/* Product Description Section */}
                        <p>{productData.content.description}</p>

                        {productData.content.highlights && (
                             <div className="mt-5 space-y-2">
                                <h3 className="text-2xl font-bold"> Product Highlights</h3>
                                <hr className="shadow-sm"/>
                                <ul className="space-y-2">
                                    {productData.content.highlights?.map((highlight) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <li className="list-disc">{highlight}</li>
                                    ))}
                                </ul>   
                            </div>
                        )}
                </div>                        
            </div>
        </section>

        <section>
            <hr className="my-10 shadow-md" />                                

            {/* Product Reviews Section */}
            {productData.content.reviews ? (
                <>
                    <h3 className="font-bold text-2xl">Reviews ({productData.content.reviews.rating})</h3>

                    <h4 className="text-lg italic">Top Review</h4>

                    {productData.content.reviews.top_review && (
                        <div className="border p-5 rounded-lg mt-2">
                            <div className="flex space-x-1">
                                <p className="font-bold capitalize">
                                    {productData.content.reviews.top_review.author} says:
                                </p>

                                <h5>{productData.content.reviews.top_review.title}</h5>
                            </div>
                            <div className="flex space-x-1 mb-2">
                                {[
                                    ...Array.from({
                                        length: Math.round(
                                            productData.content.reviews.top_review.rating
                                        ),
                                    }),
                                ].map((_, i) => (
                                    <StarIcon key={i} className="h-5 w-5 text-amber-500" />
                                ))}
                            </div>

                            <p>{productData.content.reviews.top_review.text}</p>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <h3 className="font-bold text-2xl">Reviews</h3>
                    <h4 className="text-lg italic">No Reviews yet.</h4>
                </div>
            )}

        </section>      
            
        {/* Product Specs Section */}
        {productData.content.specifications && (
            <section>
                <hr className="my-10 shadow-md" />
                <h3 className="font-bold text-2xl">Specifications</h3>

                <div className="flex space-x-5 flex-wrap">
                    {productData.content.specifications?.map((specifications) => (
                        <div key={specifications.section_title}>
                            <h4 className="font-bold my-2 text-xl">
                                {specifications.section_title}
                            </h4>

                            {specifications.items.map((items) => (
                                <div key={items.title} className="text-sm">
                                    <h5 className="font-bold">{items.title}</h5>
                                    <p>{items.value}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>

            </section>
        )}

        
        <section></section>
    </div>
  );
}

export default ProductPage;