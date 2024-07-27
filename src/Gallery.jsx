import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useGlobalContext } from './context';

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}&query=`;

const Gallery = () => {
    const {searchTerm} = useGlobalContext();

    const response = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}${searchTerm}`)
            return result.data;
        },
    });

    if (response.isLoading) {
        return <section className='image-container'>
            <h4>Loading...</h4>
        </section>
    }

    if (response.isError) {
        return <section>
            <h4>There was an error, try again</h4>
        </section>
    }

    const results = response.data.results;
    if (results.length < 1) {
        <section>
            <h4>No results found</h4>
        </section>
    }

    return (
        <section className='image-container'>
            {results.map((result) => {
                const url = result?.urls.regular;
                return <img
                    src={url}
                    key={result.id}
                    alt={result.alt_description}
                    className='img' />
            })}
        </section>
    )
}

export default Gallery