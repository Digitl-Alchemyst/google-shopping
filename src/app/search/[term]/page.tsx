import { redirect } from 'next/navigation';
import { SearchParams } from '#/typings';

type Props = {
    searchParams: SearchParams;
    params:{
        term: string;
    };
};

function Search( {searchParams, params: { term } }: Props) {
    if (!term) {
        redirect("/");
    }

    // Fetch from Oxylabs API with searchParams
    // const { data, error } = useSWR(
    //     `https://data.oxylabs.io/v1/queries/${term}`,
    //     fetcher
    // );

  return (
    <div>
        {/* Results List  */}

    </div>
  )
}

export default Search