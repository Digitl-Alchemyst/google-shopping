export const getFetchUrl = (route: string) => 
`${
    process.env.NODE_ENV === 'production' 
    ? `https://${process.env.VERCEL_URL!}` 
    : 'http://localhost:3000'
}/${route}`;

// This function dynamically generates the URL for production and development envrioments
// In this use case is uses localhost:3000 for development & the vercel URL envrioment variable which generates the appropriate