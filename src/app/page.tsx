const SEARCHES = [
  {
    id: 1,
    term: 'iphone under $500',
    url: '/search/iphone?sort_by=r$min_price=500',
    color: 'bg-red-600',
  },
  {
    id: 2,
    term: 'rtx graphics card',
    url: '/search/rtx%20graphics%20card',
    color: 'bg-amber-700',
  },
  {
    id: 3,
    term: 'zenbook',
    url: '/search/zenbook',
    color: 'bg-green-600',
  },
  {
    id: 4,
    term: 'andriod tablet under $1000 above $500',
    url: '/search/andriod%20tablet?sort_by=r$min_price=500$min_price=1000',
    color: 'bg-yellow-600',
  },
  {
    id: 5,
    term: 'Samsung Galaxy S21',
    url: '/search/Samsung%20Galaxy%20S21',
    color: 'bg-pink-600',
  },
  {
    id: 6,
    term: 'Beats Headphones',
    url: '/search/Beats%20Headphones',
    color: 'bg-purple-600',
  },
  {
    id: 7,
    term: 'bluetooth speaker',
    url: '/search/bluetooth%20speaker',
    color: 'bg-indigo-700',
  },
  {
    id: 8,
    term: 'Pioneer Challenger Deck 2022 Izzet Phoenix',
    url: '/search/Pioneer%20Challenger%20Deck%202022%20Izzet%20Phoenix',
    color: 'bg-blue-600',
  },
  {
    id: 9,
    term: 'TMNT #132 Surprise Comics Exclusive Eric Henson Variant Set',
    url: '/search/TMNT%20%23132%20Surprise%20Comics%20Exclusive%20Eric%20Henson%20Variant%20Set',
    color: 'bg-cyan-700',
  },
  {
    id: 10,
    term: 'RICK AND MORTY PRESENTS KROMBOPULOS MICHAEL #1 SDCC EDITION CGC 9.8',
    url: '/search/RICK%20AND%20MORTY%20PRESENTS%20KROMBOPULOS%20MICHAEL%20%231%20SDCC%20EDITION%20CGC%209.8',
    color: 'bg-lime-700',
  },
];



export default function Home() {
  return (
    <div className="p-10 pt-10 text-center md:text-left">
      <h1 className="text-sky-500 animate-pulse">Google Shopping Clone with OxyLabs Webscraper & Tremor</h1>

      <h2>
        To try this app just search for any product in the search bar above or click on one of the pre-defined searches below
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center mt-5 gap-5">
        {
          SEARCHES.map((search) => (
            <a

              key={search.id}
              href={search.url}
              className={`${search.color} w-full h-36 hover:opacity-50 text-slate-300 text-lg font-bold py-2 px-4 rounded`}
            >
              {search.term}
            </a>
        ))}
      </div>
    </div>
  )
}
