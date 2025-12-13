import Link from 'next/link';
import Image from 'next/image';

export default function Header({ name }) {
  return (
    <header className="pt-16 pb-8 sm:pt-20 sm:pb-12">
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <p className="text-xl sm:text-2xl text-center dark:text-white">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          {name}
        </Link>
      </p>
    </header>
  );
}
