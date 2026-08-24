export const scrollCollection = () => {
    document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth" });
};