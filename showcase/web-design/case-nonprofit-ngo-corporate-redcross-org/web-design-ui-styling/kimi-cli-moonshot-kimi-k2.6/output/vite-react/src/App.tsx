import Header from './sections/Header'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import ImpactStats from './sections/ImpactStats'
import Programs from './sections/Programs'
import GetInvolved from './sections/GetInvolved'
import News from './sections/News'
import DonateCTA from './sections/DonateCTA'
import Footer from './sections/Footer'
import DonateModal from './components/DonateModal'
import { useState } from 'react'

function App() {
  const [donateOpen, setDonateOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onDonate={() => setDonateOpen(true)} />
      <main>
        <Hero onDonate={() => setDonateOpen(true)} />
        <Mission />
        <ImpactStats />
        <Programs />
        <GetInvolved />
        <News />
        <DonateCTA onDonate={() => setDonateOpen(true)} />
      </main>
      <Footer />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  )
}

export default App
