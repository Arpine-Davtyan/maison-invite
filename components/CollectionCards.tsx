import Link from "next/link";
import { getTemplates } from "@/lib/actions/templates";

const CollectionCards = async () => {
    const templates = await getTemplates();

    return (
        <div className="collection-content">
            {templates.map((item) => (
                <div className="collection-card" key={item.id}>
                    <div className="w-full p-3 border-b border-beige">
                        <div className="collection-preview">
                            <iframe
                                src={item.url ?? ""}
                                title={item.title ?? "Template"}
                                className="h-full w-full border-0"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between p-3 border-b border-beige">
                        <div>
                            <h3>{item.title}</h3>
                            <p className="card-description">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex justify-end py-3">
                            <span className="price">
                                {item.price} ֏
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between p-3">
                        <Link
                            href={item.url ?? "#"}
                            target="_blank"
                            className="btn-light"
                        >
                            View Demo
                        </Link>

                        <Link
                            href={`/order/${item.id}`}
                            className="btn-dark"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollectionCards;