import HeaderMenu from "./headerMenu";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

const Header = ({ session }: { session: Session | null }) => {
  return (
    <>
      <HeaderMenu session={session} />
    </>
  );
};

export default Header;
