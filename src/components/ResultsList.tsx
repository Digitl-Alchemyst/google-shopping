import { PageResult } from "#/typings";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 360; // 6 minutes

type Props = {
  results: PageResult[];
  term: string;
};

function ResultsList({ results, term }: Props) {
  return (
    <div className="flex md:p-x-5">
      {/* Sidebar */}
      <div className="w-36 md:w-64">
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2 md:ml-1">
            {pageResult.content.results.filters?.map((filter, i) => (
              <div key={i} className=" border rounded-r-lg md:rounded-lg p-5">
                <p className="font-bold">{filter.name}</p>
                <div className="flex flex-col">
                  {filter.values.map((value, i) => (
                    <Link
                      key={i}
                      prefetch={false}
                      href={`https://www.google.com${value.url}`}
                    >
                      {value.value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Body */}
      <div className="mx-2 px-5 md:p-10 md:pt-0 flex-1 space-y-5">
        {results.map((pageResult, i) => (
          <div
            key={pageResult.job_id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {i !== 0 && <hr className="w-full col-span-full" />}

            <div className="md:col-span-2 lg:col-span-3 xl:col=span-4 py-5">
              <div className="flex space-x-2 items-center divide-x-2">
                <h1>Shop on Google</h1>
                <h2 className="text-xl font-semibold pl-2">
                  Search Results for Page {i + 1}
                </h2>
              </div>

              <h3 className="font-extralight">
                Showing results for &ldquo;{decodeURIComponent(term)}&ldquo;
              </h3>
            </div>

            {pageResult?.content?.results?.organic?.map((item) => {
              // console.log(item); // Print all parameters of the organic object

              return (
                <Link
                  className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out 
                    ${item.url.includes("url?url=") && "italic"}
                  `}
                  key={item.pos}
                  prefetch={false}
                  href={
                    // If the product does not have a google shopping products page, link directly to the item page on its website.
                    item.url.includes("url?url=")
                      ? // Route to External URL
                        item.url.split("url?url=")?.[1]
                      : // Route to Google Shopping Page & remove any query params
                        item.url.split("?")?.[0]
                  }
                >
                  <div className="border-b p-5 flex-1">
                    <Image
                      src={item.images?.thumbnail?.[0]}
                      alt="Product Image"
                      width={200}
                      height={200}
                    />
                    <p className="text-sky-400 text-lg font-bold ">
                      {item.title}
                    </p>
                  </div>
                  <div className="px-5 py-2 not-italic">
                    <p className="text-lime-700 font-medium">
                      {item.price_str} {item.currency}
                    </p>
                    <p className="text-sky-500 font-semibold">
                      {item.merchant.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
