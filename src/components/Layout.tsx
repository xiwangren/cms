import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  navigation?: any;
  settings?: any;
  withHeaderDivider?: boolean;
  withProfile?: boolean;
  withSignUpForm?: boolean;
  children: React.ReactNode;
}

export function Layout({
  navigation,
  settings,
  withHeaderDivider = true,
  withProfile = true,
  withSignUpForm = true,
  children,
}: LayoutProps) {
  return (
    <div className="text-slate-700">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        settings={settings}
      />
      <main>{children}</main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
}
