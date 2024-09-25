import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="my-10">
      <Link href="todos">Todos Page</Link>
    </MaxWidthWrapper>
  );
}

