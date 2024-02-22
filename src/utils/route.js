function getRouteFromPathname({ pathname }) {
    const route = pathname
        .split("/")
        .filter((el) => el !== "" && el !== "en" && el !== "es")
        .join("/");

    return route;
}

export { getRouteFromPathname };