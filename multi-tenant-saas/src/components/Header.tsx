
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

export default function Header() {
  return (
    <header className="border-b border-black/10 py-3 flex justify-center gap-x-10 items-center">
      <LoginLink>Sign In</LoginLink>
      <LogoutLink className="text-[14px]">Sign Out</LogoutLink>
    </header>

  )
}
