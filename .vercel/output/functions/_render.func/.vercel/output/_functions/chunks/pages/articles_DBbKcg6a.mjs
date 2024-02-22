import { d as data } from './_id__ov6ZP3IS.mjs';

// --------------------------------------------------------------------------------------------------
// Este typo de archivo es un endpoint que se encarga de devolver todos los articulos en formato JSON
// --------------------------------------------------------------------------------------------------


const GET = ({ params, request }) => {
    const allArticles = data.articles; // 👈 Obtiene todos los articulos del .json o de cualquier API

    const mappedArticles = allArticles.map((article) => { // 👈 Mapea los articulos para que sean consumidos por el front-end
        return {
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            image: `/images/${article.image}`,
            category: article.category,
            created_at: article.created_at,
            author: article.author,
            url: `/articles/${article.id}`,
            slug: article.title.toLowerCase().replaceAll(" ", '-'),
        };
    });

    return new Response(JSON.stringify(mappedArticles)); // 👈 Devuelve los articulos mapeados
};

export { GET };
