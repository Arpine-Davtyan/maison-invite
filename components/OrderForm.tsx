"use client";

import { FormEvent, useState, useTransition } from "react";
import { createOrder } from "@/lib/actions/orders";

interface OrderFormProps {
    templateId: string;
}

const OrderForm = ({ templateId }: OrderFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [invitationNames, setInvitationNames] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [notes, setNotes] = useState("");

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        startTransition(async () => {
            try {
                await createOrder({
                    template_id: templateId,
                    full_name: name,
                    email,
                    date: eventDate,
                });

                setSuccess(true);
            } catch (error) {
                console.error(error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again."
                );
            }
        });
    };

    if (success) {
        return (
            <div className="mt-5 flex flex-col items-center text-center py-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold">
                    <span className="text-xl text-gold">✓</span>
                </div>

                <h3 className="mb-3">
                    Your order has been received
                </h3>

                <p className="simple-text max-w-md">
                    Thank you, {name}. We'll review your details and contact you shortly to confirm everything.
                </p>
            </div>
        );
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="my-5 flex flex-col gap-3"
            >
                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="form-label"
                        >
                            Your name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                            disabled={isPending}
                        />
                    </div>
                </div>

                {/* Names on invitation */}
                <div className="flex flex-col">
                    <label
                        htmlFor="invitationNames"
                        className="form-label"
                    >
                        Names on the invitation
                    </label>

                    <input
                        id="invitationNames"
                        type="text"
                        placeholder="Studio Open House"
                        value={invitationNames}
                        onChange={(e) =>
                            setInvitationNames(e.target.value)
                        }
                        className="form-input"
                        required
                        disabled={isPending}
                    />
                </div>

                {/* Event date + venue */}
                <div className="flex flex-col">
                    <label
                        htmlFor="eventDate"
                        className="form-label"
                    >
                        Event date & venue
                    </label>

                    <input
                        id="eventDate"
                        type="text"
                        placeholder="All week · 4 Abbeyway Street"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="form-input"
                        required
                        disabled={isPending}
                    />
                </div>

                {/* Venue */}
                <div className="flex flex-col">
                    <label
                        htmlFor="venue"
                        className="form-label"
                    >
                        Venue
                    </label>

                    <input
                        id="venue"
                        type="text"
                        placeholder="Wedding venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="form-input"
                        disabled={isPending}
                    />
                </div>

                {/* Anything else */}
                <div className="flex flex-col">
                    <label
                        htmlFor="notes"
                        className="form-label"
                    >
                        Anything else (optional)
                    </label>

                    <textarea
                        id="notes"
                        rows={4}
                        placeholder="Colour tweaks, dress code, RSVP deadline..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="form-textarea"
                        disabled={isPending}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isPending}
                >
                    {isPending ? "Placing order..." : "Place order"}
                </button>
            </form>

            <p className="simple-text">
                No payment is taken here yet — we confirm details first.
            </p>
        </div>
    );
};

export default OrderForm;