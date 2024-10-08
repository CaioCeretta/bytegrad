'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside mt-10 list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2"><Link href={`StateUpdatesImmediately`}>State Update</Link></li>
          <li className="mb-2"><Link href={`ConditionalRendering`}>Conditional Rendering</Link></li>
          <li className="mb-2"><Link href={`UpdatingObjectState`}>Updating Object State</Link></li>
          <li className="mb-2"><Link href={`ObjectStateInsteadMultiple`}>Object State Instead Multiple</Link></li>
          <li className="mb-2"><Link href={`InformationDerivedFromStateProp`}>Information Derived From State / Prop</Link></li>
          <li className="mb-2"><Link href={`Primitives`}>Primites vs Non Primitives</Link></li>
          <li className="mb-2"><Link href={`StateInitializing`}>State Initializing W/ Object</Link></li>
          <li className="mb-2"><Link href={`TypescriptMistake`}>Typescript &quot;Mistake&quot;</Link></li>
          <li className="mb-2"><Link href={`CustomHooks`}>Custom Hooks</Link></li>
          <li className="mb-2"><Link href={`ServerAndClientComp`}>Server And Client Components</Link></li>
          <li className="mb-2"><Link href={`StaleClosure`}>Stale Closures</Link></li>
          <li className="mb-2"><Link href={`FetchingInUseState`}>Fetching in useState</Link></li>

        </ol>

      </main>

    </MaxWidthWrapper>
  );
}
