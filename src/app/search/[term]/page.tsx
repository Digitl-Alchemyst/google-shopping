import { redirect } from 'next/navigation';
import { SearchParams, PageResult } from '#/typings';
import { getFetchUrl } from '@/u/getFetchUrl';
import ResultsList from '@/c/ResultsList';

type Props = {
    searchParams: SearchParams;
    params:{
        term: string;
    };
};

async function Search( {searchParams, params: { term } }: Props) {
  // Check if the search term is missing; if so, redirect to the homepage ("/")
  if (!term) {
    redirect('/');
  }

  // Fetch searchResults from Oxylabs API with searchParams
  const response = await fetch(getFetchUrl('api/search'), {
    method: 'POST',
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  // Parse the JSON response from the API as an array of PageResult objects
  const results = (await response.json()) as PageResult[];

  return (
    <div>
      {/* Results List  */}
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default Search

//  This code defines a function for handling search functionality and renders the searchResults page. It uses the redirect function to navigate back to the homepage if the search term is missing. It then makes a POST request to an Oxylabs API using the fetch function, and it renders the ResultsList component with the fetched results and search term.