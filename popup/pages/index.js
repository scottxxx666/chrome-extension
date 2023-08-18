import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <label>帳號：</label><input name="username"/>
      </div>
      <div>
        <label>密碼：</label><input type="password" name="password"/>
      </div>
    </main>
  )
}
