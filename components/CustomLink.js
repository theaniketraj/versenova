import Link from 'next/link';

export default function CustomLink({ as, href, children, ...otherProps }) {
  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:'));

  return (
    <Link 
      as={as} 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-primary no-underline border-b border-primary/30 hover:border-primary hover:text-primary/80 transition-all duration-300 font-medium"
      {...otherProps}
    >
      {children}
    </Link>
  );
}
