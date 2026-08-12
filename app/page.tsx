import Topbar from "./components/Topbar"
import Hero from "./components/Hero"

export default function Home() {
  return <>
    <main className="min-h-screen relative overflow-hidden">

        <Topbar />
        <Hero />

    </main>
  </>
}