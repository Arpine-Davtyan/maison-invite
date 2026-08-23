import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div className="container justify-between items-center">
                <Link
                    href="/"
                >
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={130}
                        height={50}
                        quality={100}
                        loading="eager"
                    />
                </Link>
                <nav>
                    <Link
                        href="/#collection"
                    >
                        Collection
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
