import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  height: number
  width: number
}

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center flex gap-2">
        <Image src="/logo-green.png" alt="Logo" height={height} width={width} />
      </div>
    </Link>
  )
}
