"use client";

import Image from "next/image";
import Link from "next/link";
import { scrollCollection } from "../lib/actions/scroll";

const Header = () => {
    return (
        <header>
            <div className="container justify-between items-center">
                <Link
                    href="/"
                >
                    <Image
                        src="/images/logo-nav.png"
                        alt="logo"
                        width={130}
                        height={30}
                        quality={100}
                        loading="eager"
                        className="h-auto"
                    />
                </Link>
                <nav>
                    <span
                        onClick={scrollCollection}
                    >
                        Collection
                    </span>
                </nav>
            </div>
        </header>
    )
}

export default Header
