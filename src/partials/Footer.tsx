import { AppConfig } from '@/utils/AppConfig';

const links = [
  { label: 'Resume', href: '/resume' },
  { label: 'GitHub', href: 'https://github.com/dmhalejr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dmhalejr' },
  { label: 'RSS', href: '/rss.xml' },
];

const Footer = () => (
  <footer className="mt-24 border-t border-storm-800 print:hidden">
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>
        © {new Date().getFullYear()} {AppConfig.author}
      </p>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="transition-colors hover:text-bolt">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export { Footer };
