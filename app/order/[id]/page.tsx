import CollectionCard from "@/components/CollectionCard";
import OrderForm from "@/components/OrderForm";
import { getTemplateById } from "@/lib/actions/templates";
import Link from "next/link";

interface OrderPageProps {
    params: Promise<{
        id: string;
    }>;
}

const Order = async ({ params }: OrderPageProps) => {
    const { id } = await params;

    let item;

    try {
        item = await getTemplateById(id);
    } catch {
        item = null;
    }

    if (!item) {
        return (
            <div className="section min-h-screen">
                <div className="container text-center">
                    <h1 className="text-3xl mb-4">
                        Invitation not found
                    </h1>

                    <Link href="/#collection" className="btn-dark">
                        Back to collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <div className="w-full max-w-5xl m-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                        <div>
                            <CollectionCard item={item} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h6>Place your order</h6>

                        <h2>Tell us whose day it is</h2>

                        <p className="simple-text text-left">
                            We personalise the design with your details and
                            send back a private link you can share with your
                            guests.
                        </p>

                        <OrderForm templateId={item.id} />

                        <p className="simple-text text-left">
                            No payment is taken here yet — we confirm details
                            by email first.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;