import Image from "next/image";
import Accueil from "./accueil/page";
// import { Link } from "lucide-react";
import Link from "next/link"
export default function Home() {
  return (
    <>
      <Accueil/>
      <Link href="/admin">Page admin</Link>
    </>
    
  );
}
