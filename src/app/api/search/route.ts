import { NextResponse } from "next/server";
import { SearchParams, PageResult } from "#/typings";

export async function POST(request: Request) {

  // Extract the properties "searchTerm", "pages", and other parameters from the JSON body of the request
  const { searchTerm, pages, ...params } = await request.json();
  
  // Assign the extracted parameters to a variable
  const searchParams: SearchParams = params;

  // Check if the "searchTerm" is missing; if so, return a 400 Bad Request response
  if (!searchTerm) {
    return NextResponse.next(
      new Response('Missing search term', { status: 400 }),
    );
  }

  // An empty array for storing filters
  const filters: any = [];

  // Iterate through the entries of the searchParams object
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key == 'max_price') {
        if ((value = '1000+')) return;
      }

      // Push an object into the filters array with key and processed value
      filters.push({
        key,
        value: key === 'sort_by' ? value : Number(value),
      });
    }
  });

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
      source: 'google_shopping_search',
      domain: 'com',
      query: searchTerm,
      pages: Number(pages) || 1,
      parse: true,
      context: filters,
    }),
  });

  // Parse the JSON response from the Oxylabs API
  const data = await response.json();

  // Extract the results from the response data and assign it to the pageResults variable
  const pageResults: PageResult[] = data.results;

  // Return a JSON response containing the pageResults
  return NextResponse.json(pageResults);
}

// This code is a server-side function for handling a POST request to the Oxylabs API. It checks for filters then takes a JSON payload containing search parameters, sends a request to the Oxylabs API, processes the response, and returns a JSON response with the results.





