import CollectionCards from "@/components/CollectionCards";

const Collection = () => {
    return (
        <section id="collection" className="section">
            <div className="container flex-col">
                <h6>The collection</h6>
                <div className="title-box">
                    <h2>Shop by occasion</h2>
                    <span className="rule-gold"></span>
                </div>
               <CollectionCards />
            </div>
        </section>
    )
}

export default Collection
