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
    if (!term) {
        redirect("/");
    }

    // Fetch from Oxylabs API with searchParams
    const response = await fetch(getFetchUrl('api/search'), {
        method: 'POST',
        body: JSON.stringify({ searchTerm: term, ...searchParams }),
    });

    const results = await response.json() as PageResult[];

    console.log('OxyLabs Response =>', results);

  return (
    <div>
        {/* Results List  */}
        <ResultsList results={results} term={term} />
    </div>
  )
}

export default Search