function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-4xl font-bold">Whoops....</h1>
        <h2 className="font-light animate-pulse text-sky-500"> It seems the product you are looking for does not exist!</h2>
    </div>
  )
}

export default NotFound