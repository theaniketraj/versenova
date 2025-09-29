import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-16 pb-8 sm:pt-20 sm:pb-12">
      <div className="block w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-conic from-gradient-3 to-gradient-4" />
      <p className="text-xl sm:text-2xl text-center dark:text-white">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          {name}
        </Link>
      </p>
    </header>
  );
}
