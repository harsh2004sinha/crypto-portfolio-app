'use client'
import { Carousel, Card } from "./ui/apple-cards-carousel";

const data = [
  {
    category: "",
    title: "Bitcoin",
    src: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Started in the year 2009 , Bitcoin is a decentralized digital currency that operates on a peer-to-peer network without the need for intermediaries like banks or governments.Bitcoin transactions are verified by network nodes through cryptography and recorded on a public ledger called the blockchain.",
  },
  {
    category: "",
    title: "Ethereum",
    src: "https://images.unsplash.com/photo-1645516484419-35a747c99474?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Ethereum started in the year 2015. Ethereum is a decentralized, open-source blockchain platform that enables developers to build and deploy smart contracts and decentralized applications (dApps).Ethereum also features its native cryptocurrency, Ether (ETH), which is used to power operations on the network, including transaction fees and computational services.",
  },
  {
    category: "",
    title: "Litecoin",
    src: "https://images.unsplash.com/photo-1641959928811-9ebfd8f214c0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Litecoin Litecoin is a peer-to-peer cryptocurrency created in 2011 by former Google engineer Charlie Lee as a 'lite' version of Bitcoin. It offers faster transaction times and a different hashing algorithm called Scrypt, making it accessible to a broader range of miners.",
  },

  {
    category: "",
    title: "Monero",
    src: "https://images.unsplash.com/photo-1643685493318-a9b1cd6d27ac?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Monero is a privacy-focused cryptocurrency launched in 2014 that prioritizes user anonymity and untraceability. It uses advanced cryptographic techniques like ring signatures, stealth addresses, and RingCT to obscure transaction details and protect user identities.",
  },
  {
    category: "",
    title: "Ripple",
    src: "https://images.unsplash.com/photo-1640314838306-5e793a81d152?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Ripple is a digital payment protocol and cryptocurrency created by Ripple Labs in 2012. It is designed to facilitate fast, low-cost international money transfers and settlements between banks and financial institutions.",
  },
];

function Reviews() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div className=" w-full -mt-2 relative flex flex-col items-center justify-center overflow-hidden pb-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639969600391-37bfcb6c79d3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <h2 className="text-7xl font-bold mt-8 z-10 text-red-100">Articles</h2>
      <div className="flex justify-center w-full h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
        <Carousel items={cards} />
      </div>
    </div>
  )
}

export default Reviews