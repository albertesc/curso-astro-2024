// Esta función recibe un objeto con la propiedad pathname y devuelve la ruta de la página actual.

function getRouteFromPathname({ pathname }) {
    const route = pathname
        .split("/")
        .filter((el) => el !== "" && el !== "en" && el !== "es")
        .join("/");

    return route;
}

export { getRouteFromPathname };