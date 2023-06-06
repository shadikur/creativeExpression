import { Helmet, HelmetProvider } from 'react-helmet-async';

const useTitle = (title, subtitle) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title ? title : import.meta.env.VITE_SITE_TILE} - {subtitle ? subtitle : import.meta.env.VITE_SITE_SUBTITLE}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default useTitle;