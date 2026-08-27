"use client";

import { FormEvent, useState, useTransition } from "react";
import { createOrder } from "@/lib/actions/orders";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


interface OrderFormProps {
    templateId: string;
}

const OrderForm = ({ templateId }: OrderFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [invitationNames, setInvitationNames] = useState("");
    const [eventDate, setEventDate] = useState<Date | undefined>();
    const [location, setLocation] = useState("");
    const [note, setNote] = useState("");

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const formattedEventDate = eventDate
        ? format(eventDate, "yyyy-MM-dd")
        : "";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        startTransition(async () => {
            try {
                await createOrder({
                    template_id: templateId,
                    full_name: name,
                    email,
                    phone,
                    date: formattedEventDate,
                    location,
                    invitationNames,
                    note
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
                    Պատվերը հաստատված է
                </h3>

                <p className="simple-text max-w-md">
                    Շնորհակալություն, {name}. Շուտով կապ կհաստատատենք Ձեզ հետ մանրամասների հաստատման համար.
                </p>
            </div>
        );
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="my-5 flex flex-col gap-2"
            >
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="form-label"
                        >
                            Անուն Ազգանուն
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
                            htmlFor="eventDate"
                            className="form-label"
                        >
                            Ամսաթիվ
                        </label>

                        <Popover>
                            <PopoverTrigger
                                render={
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        className="form-input text-left"
                                    >
                                        {eventDate
                                            ? format(eventDate, "dd.MM.yyyy")
                                            : ""}

                                        <CalendarIcon className="size-4 text-wenge float-end" />
                                    </button>
                                }
                            />

                            <PopoverContent
                                align="end"
                                className="w-auto border-wenge bg-ivory p-0"
                            >
                                <Calendar
                                    mode="single"
                                    selected={eventDate}
                                    onSelect={setEventDate}
                                    disabled={(date) =>
                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                    locale={enUS}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <label
                            htmlFor="phone"
                            className="form-label"
                        >
                            Հեռախոս
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            Էլ․ հասցե
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

                <div className="flex flex-col">
                    <label
                        htmlFor="invitationNames"
                        className="form-label"
                    >
                        Հրավիրատոմսի Անուններ
                    </label>

                    <input
                        id="invitationNames"
                        type="text"
                        value={invitationNames}
                        onChange={(e) =>
                            setInvitationNames(e.target.value)
                        }
                        className="form-input"
                        required
                        disabled={isPending}
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="location"
                        className="form-label"
                    >
                        Վայրը
                    </label>

                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                        Այլ մանրամասներ
                    </label>

                    <textarea
                        id="note"
                        rows={4}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
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
                    Պատվիրել
                </button>
            </form>

            <p className="simple-text">
                Այս պահին վճարում չի պահանջվում։ Մենք նախ կհաստատենք պատվերի մանրամասները։
            </p>
        </div>
    );
};

export default OrderForm;