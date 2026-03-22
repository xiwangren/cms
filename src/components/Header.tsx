"use client";

import Link from "next/link";
import { useState } from "react";
import headerNavLinks from "@/data/headerNavLinks";
import { HorizontalDivider } from "./HorizontalDivider";

const LeafIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2 1-3 4-4 4-4C12 3 9 7 9 7c0-1 .5-2 .5-2C4 8 3 14 3 14c0-1 1-3 1-3C2 17 4 21 4 21c1-4 3-7 5-9 2-2 5-3 8-4z" />
  </svg>
);

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-slate-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-4xl px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-widest text-slate-700 hover:text-green-600 transition-colors uppercase">
          <LeafIcon className="w-4 h-4 text-green-500" />
          Figure.chen
        </Link>

        <ul className="hidden sm:flex items-center gap-8">
          {headerNavLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="sm:hidden p-2 text-slate-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-6 py-4">
          <ul className="flex flex-col gap-4">
            {headerNavLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

const ProfileHero = ({ name, description }: { name: string; description: string }) => (
  <div className="bg-white py-16 px-6">
    <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-4">
      <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
        <LeafIcon className="w-8 h-8 text-green-500" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-800">{name}</h1>
      <p className="max-w-md text-sm leading-relaxed text-slate-400">{description}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {["Cilium", "Kubernetes", "eBPF", "云原生"].map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-3 py-0.5 text-xs text-slate-500">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Header = ({
  withDivider = true,
  withProfile = true,
  settings,
}: {
  withDivider?: boolean;
  withProfile?: boolean;
  settings: any;
}) => (
  <header>
    <NavBar />
    {withProfile && (
      <ProfileHero name={settings.data.name} description={settings.data.description} />
    )}
    {withDivider && <HorizontalDivider />}
  </header>
);
