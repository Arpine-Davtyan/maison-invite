import type { Template } from "@/lib/actions/templates";

interface CollectionCardProps {
    item: Template;
}

const CollectionCard = ({ item }: CollectionCardProps) => {
    return (
        <div className="collection-card">
            <div className="w-full p-3 border-b border-beige">
                <div className="collection-preview">
                    <iframe
                        src={item.url ?? ""}
                        title={item.title ?? "Template"}
                        className="h-full w-full border-0"
                    />
                </div>
            </div>

            <div className="flex flex-col p-3 border-b border-beige">
                {/* <h3>{item.title}</h3> */}

                <p className="card-description">
                    {item.collection}-{item.code}
                    {/* {item.description} */}
                </p>
            </div>

            <div className="flex justify-end items-center p-3">
                <span className="price">
                    {Number(item.price).toLocaleString("hy-AM")} ֏
                </span>
            </div>
        </div>
    );
};

export default CollectionCard;