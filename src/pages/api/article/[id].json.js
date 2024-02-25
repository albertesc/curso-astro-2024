// ------------------------------------------------------------------------------------------
// Este typo de archivo es un endpoint que se encarga de devolver un articulo en formato JSON
// ------------------------------------------------------------------------------------------

import data from '@data/articles.json';

export const GET = async ({ params, request }) => {
    const { id } = params; // 👈 Obtiene el id del articulo desde la url
    const articles = data.articles; // 👈 Obtiene todos los articulos del .json o de cualquier API
    const article = articles.find((article) => article.id === Number(id)); // 👈 Busca el articulo por su id

    const mappedArticle = { // 👈 Mapea el articulo para que sea consumido por el front-end
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: `/images/${article.image}`,
        category: article.category,
        created_at: article.created_at,
        author: article.author,
    }

    return new Response(JSON.stringify(mappedArticle)); // 👈 Devuelve el articulo mapeado
};

/* 👇 Cuando la configuración del proyecto es "hybrid"
  export const prerender = false;
*/

/* 👇 Cuando la configuracion del poryecto es "static". Obtiene las rutas de los artículos para el build del proyecto  
export function getStaticPaths() {
    return data.articles.map((article) => ({ params: { id: article.id.toString() } }));
}
*/