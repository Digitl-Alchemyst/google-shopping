import { NextResponse } from "next/server";
import { ProductData } from "#/typings";


type Params = { params: { id: string } }; 

export async function GET(
    request: Request,
    { params: { id } }: Params) {

      // Check if the id parameter is missing; if so, return a 400 response
      if (!id) {
        return NextResponse.next(new Response('Missing id', { status: 400 }));
      }

      // Make a POST request to the Oxylabs API
      const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            process.env.OXYLABS_USERNAME + ':' + process.env.OXYLABS_PASSWORD,
          ).toString('base64')}`,
        },
        cache: 'no-store',
        // Convert the payload to JSON and send it in the request body
        body: JSON.stringify({
          source: 'google_shopping_product',
          domain: 'com',
          query: id,
          parse: true,
          geo_location: 'United States',
        }),
      });

      // Parse the JSON response from the Oxylabs API
      const productDetails = await response.json();

      //   If there is no product data response from Oxylabs return 404
      if (productDetails.results.length === 0) {
        return NextResponse.next(
          new Response('No product with that ID found.', { status: 404 }),
        );
      }
      // Extract the results from the response data and assign it to the productData variable
      const productData: ProductData = productDetails.results[0];

      // Return a JSON response containing the productData
      return NextResponse.json(productData);
    }


    // This is a server-side function for handling a GET request, specifically retrieving product details by sending a POST request to the Oxylabs API with a product ID. The function checks for missing parameters, processes the API response, and returns a JSON response with the product data or error messages for any errors that may occur.






