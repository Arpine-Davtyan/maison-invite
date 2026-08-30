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

                    <div className="flex justify-between items-center p-3 border-b border-beige">
                        <div>
                            {/* <h3>{item.title}</h3> */}
                            <p className="card-description">
                                {item.collection}-{item.code}
                                {/* {item.description} */}
                            </p>
                        </div>

                        <div className="flex justify-end items-center">
                            <span className="price">
                                {Number(item.price).toLocaleString("hy-AM")} ֏
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between p-3">
                        <Link
                            href={item.url ?? "#"}
                            target="_blank"
                            className="btn-light"
                        >
                            Դիտել
                        </Link>

                        <Link
                            href={`/order/${item.id}`}
                            className="btn-dark"
                        >
                            Պատվիրել
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollectionCards;