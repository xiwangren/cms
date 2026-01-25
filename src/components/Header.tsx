import Link from "next/link";
import Image from "next/image";
import headerNavLinks from "@/data/headerNavLinks";
import Bounded  from "@/components/Bounded";
// import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";


const Profile = ({ name, description, profilePicture }:{name:string, description:string, profilePicture:string}) => {
  return (
    <div className="px-4">
      <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
        
        <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
          <Image src="/globe.svg" alt="globe" fill={true} />
        </div>
        <div className="grid grid-cols-1 gap-2 text-center"> 
          <Link href="/">{ name}</Link>
            <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
              {description}
            </p>
        </div>
  
      </div>
    </div>
  );
};

// const NavItem = ({ children }) => {
//   return (
//     <li className="font-semibold tracking-tight text-slate-800">{children}</li>
//   );
// };

export const Header = ({
  withDivider = true,
  withProfile = true,
  settings,
}: {
  withDivider?: boolean;
  withProfile?: boolean;
  settings: any;
}) => {
  return (
    <Bounded as="header" className="">
      <div className="grid grid-cols-1 justify-items-center gap-20">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            {headerNavLinks
            //.filter((link: { href: string; title: string }) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </nav>
        {withProfile && (
          <Profile
            name={settings.data.name}
            description={settings.data.description}
            profilePicture={settings.data.profilePicture}
          />
        )}
        {withDivider && <HorizontalDivider />}
      </div>
    </Bounded>
  );
};
