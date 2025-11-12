
'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FiAlertTriangle } from 'react-icons/fi'
import { FaArrowDown } from 'react-icons/fa'
import { Heart } from 'lucide-react'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrer ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Participant {
  name: string
  number: string
  tableNumber?: string
}

interface QRData {
  id: string
  participants: Participant[]
  timestamp: number
  isCouple: boolean
  signature: string
  secretCode: string
  validated: boolean
}

const DEFAULT_TABLE_NUMBER = ''

const formatFrenchDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayName} ${day} ${month} ${year}`
}

export const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
  const qrContent = {
    participants: qrData.participants,
    isCouple: qrData.isCouple,
    tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
    validated: qrData.validated,
    timestamp: qrData.timestamp
  }
  const [clickCount, setClickCount] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  // Réfs pour les animations
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const invitationRef = useRef<HTMLDivElement>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const securityRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  
  // Réfs pour les décorations florales
  const floralTopLeftRef = useRef<HTMLImageElement>(null)
  const floralTopRightRef = useRef<HTMLImageElement>(null)
  const floralWedDayRef = useRef<HTMLImageElement>(null)
  const floralBottomLeftRef = useRef<HTMLImageElement>(null)
  const floralBottomRight1Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight2Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight3Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight4Ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Animation de pulsation pour le QR code
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initialiser les animations GSAP
    const ctx = gsap.context(() => {
      // Animation des décorations florales
      const floralRefs = [
        floralTopLeftRef.current,
        floralTopRightRef.current,
        floralWedDayRef.current,
        floralBottomLeftRef.current,
        floralBottomRight1Ref.current,
        floralBottomRight2Ref.current,
        floralBottomRight3Ref.current,
        floralBottomRight4Ref.current
      ]

      floralRefs.forEach((deco) => {
        if (deco) {
          gsap.fromTo(deco,
            {
              opacity: 0,
              scale: 0.8,
              rotation: -10
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: deco,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      })

      // Animation du titre
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation de la photo
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          {
            scale: 0.5,
            opacity: 0,
            rotationY: 90
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du texte d'invitation
      if (invitationRef.current) {
        gsap.fromTo(invitationRef.current,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: invitationRef.current,
              start: "top 100%",
              end: "bottom 50%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du programme
      if (programRef.current) {
        gsap.fromTo(programRef.current,
          {
            x: -50,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: programRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du lieu
      if (locationRef.current) {
        gsap.fromTo(locationRef.current,
          {
            x: 50,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: locationRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation de l'alerte sécurité
      if (securityRef.current) {
        gsap.fromTo(securityRef.current,
          {
            scale: 0.8,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: securityRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du QR code
      if (qrRef.current) {
        gsap.fromTo(qrRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: qrRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation des éléments de date
      gsap.fromTo(".date-item",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: programRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animation en boucle pour les flèches
      gsap.to(".animate-bounce", {
        y: -10,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="relative max-w-lg w-full overflow-hidden text-center text-gray-800 bg-green-50">

        {/* Floral Decorations */}
      
        <img 
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[267px] md:w-[389px] bottom-[200px] left-0" 
        />
        {/* <img 
          src="/assets/h.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[157px]  bottom-[31.7%] z-50 right-[12px] translate-x-[-80%] "  
        /> */}
        <img 
          src="/assets/top.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[197px] md:w-[189px] block top-0 left-o ]" 
        />
        <img 
          src="/assets/set.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[70px] md:w-[69px] block top-[170px] left-o ]" 
        />
        <img 
            src="/assets/t.png" 
          alt="Top right Flower" 
          loading="lazy" 
          className="absolute w-[117px] rotate-[270deg] block top-[-27px] right-[20px]" 
        />
      
        <img 
          ref={floralWedDayRef}
          src="/assets/ring.webp" 
          alt="Wedding Day" 
          loading="lazy" 
          className="absolute top-[32%] w-[72px] left-[50%] -translate-x-[50%] -translate-y-[50%]" 
        />
        <p className="absolute ocean font-bold  text-2xl top-[29px] pt-[60px] w-[242px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        {/* Invitation <br></br> */}
        Mariage Coutumier  
        </p> 

     
   
        <img 
         
          src="/assets/t.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute bottom-0 right-0 w-[133px] " 
        />
       

        {/* Participant Name */}
        <div ref={titleRef} className="mt-20 pt-7">
          {qrData.isCouple && (
            <h1 className="text-lg font- text-gray-700">
              - Couple -
            </h1>
          )}
          {!qrData.isCouple && (
            <h1 className="text font- text-gray-700">
              -Singleton-
            </h1>
          )}
          <h1 className="text-3xl font-bold text-gray-800">
            {qrData.participants[0].name}
          </h1>
          {qrData.isCouple && qrData.participants[1].name && (
            <h1 className="text-3xl font-bold text-gray-800">
              & {qrData.participants[1].name}
            </h1>
          )}
          <p className="text-gray-600 mt-2">
            Vous êtes invités
          </p>
        </div>

       <div ref={photoRef} className="my-6 relative">
  <div className="relative w-[270px] h-[270px] mx-auto">
    <svg
      viewBox="0 0 260 260"
      className="absolute top-0 left-0 w-full h-full z-10"
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="130" cy="130" r="120" />
        </clipPath>
      </defs>
      <image
        href="/couple.jpg"
        width="260"
        height="260"
        clipPath="url(#circleClip)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>

    <svg
      viewBox="0 0 260 260"
      className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
    >
      <circle
        cx="130"
        cy="130"
        r="120"
        fill="none"
        stroke="#A4B9A4"
        strokeWidth="4"
      />
    </svg>
    <img src="/assets/lil.png" alt="Decoration" loading="lazy" className="absolute top-[54%] rotate-[5deg] z-50 translate-y-[-10%] right-[50%] translate-x-[50%] w-[275px]" />
  </div>
</div>



        {/* Invitation Message */}
        <div  className="mt-[70px] px-4 text-lg text-gray-700">
          <div  className="mb-5 font-semibo m flex ocean  mx-auto flex-col justify-center items-center w-max font-bold ">
            <h3 className="text-3xl  font-semibold text-gray-800">Romain Raha</h3>
      <p className='text-2xl  text-gray-800'>&</p>
            <h3 className="text-3xl  text-gray-800">Eugenie Nkulu</h3>
          </div>
          <p ref={invitationRef} className="mb-4">
La famille NZANA NAMAWANDA Hermès et BANZA KABILA Jeannine a le réel plaisir de vous convier à rehausser de votre présence aux cérémonies du mariage coutumier, de la fête d’au revoir et de la remise des cadeaux de leur fille Dr Eugénie NKULU Nabuholo, qui s’unit à son bien-aimé Ir Romain KARHUBAKA, fils de Papa Roger KARHUBAKA et de Maman Déodate.          </p>
        </div>

        <p  className="text-2xl px-4 font-bold ocan text-gray-600">
          Programme 
        </p>
        <p  className="mt-2 my-4 w-[34%] mx-auto h-[2px] rounded-full an z-50 bg-gray-400 ">
        
        </p>

        {/* Date and Venue */}
        <div className="text-center space-y-4 px-2">
          <div className="date-item">
            <p className="text-2xl text-green-800 font-bold ocea">Dimanche 23 Novembre 2025</p>
            <div className="flex items-center justify-center gap-2">
              {/* <img src="/certificate.png" className='size-7 rotate-2' loading="lazy" /> */}
              <p className="text-gray-600 serif text-xl my-2"> à 13h00'</p>
            </div>
            <FaArrowDown size={12} className='block c mx-auto animate-bounce text-blue-400' />
            <p className="text-gray-600 text-xl">Cérémonie de remise officielle de dot</p>

            <div className="flex items-center justify-center gap-2">
              {/* <img src="/certificate.png" className='size-7 rotate-2' loading="lazy" /> */}
              <p className="text-gray-600 serif text-xl my-2"> à 15h00'</p>
            </div>
            <FaArrowDown size={12} className='block c mx-auto animate-bounce text-blue-400' />
            <p className="text-gray-600 text-xl">Fête d'au revoir et remise des cadeaux</p>
          </div>


          <div className="date-item">
           
            <p className="text-gray-600 ocan text-xl">LIEU :</p>
            <p className="text-animated-color text-2xl my-2 font-bold">Salle Polyvalente Paroisse Saint ELOI</p>
            <p className="text-gray-500 text-lg">Réf. MAKOMENO/ Lubumbashi</p>
          </div>
        </div>

        {/* Contacts */}
        <div className="mt-6 mb-14 text-center px-2">
          <p className="text-xl text-green-800 font-bold mb-2">Pour la famille</p>
          <div className="space-y-1">
            {/* <p className="text-gray-600 text-lg">+243976022715</p> */}
            <p className="text-gray-600 text-lg">+243997742748</p>
            <p className="text-gray-600 text-lg">+243975681016</p>
          </div>
        </div>

        {/* Information de sécurité */}
       

     

        {/* Signature */}
              
      </div>
    </div>
  )
}