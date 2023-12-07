'use client'

import { useState, useRef, useEffect } from 'react'

export default function Features() {
  
  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section className="relative my-32 bg-white">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 pointer-events-none mb-16" aria-hidden="true">
      <div className=" blur-5xl absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">

      </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}

          {/* Section content */}
          <div className=" bg-gradient-to-t from-[#00726B] to-[#38B68D] rounded-3xl text-white" aria-hidden="true">

          <div className=" md:py-16 md:px-20 max-w-sm mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-2 items-start  md:max-w-2xl lg:max-w-none" >

            
            <div className="flex flex-col items-start  md:flex-row md:max-w-md px-3 py-5 " data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                <div className='bg-white p-3 rounded-lg mt-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <g clip-path="url(#clip0_165_472)">
                    <path d="M15 27.5C16.375 27.5 17.5 26.375 17.5 25H12.5C12.5 26.375 13.625 27.5 15 27.5ZM22.5 20V13.75C22.5 9.9125 20.4625 6.7 16.875 5.85V5C16.875 3.9625 16.0375 3.125 15 3.125C13.9625 3.125 13.125 3.9625 13.125 5V5.85C9.55 6.7 7.5 9.9 7.5 13.75V20L5 22.5V23.75H25V22.5L22.5 20ZM20 21.25H10V13.75C10 10.65 11.8875 8.125 15 8.125C18.1125 8.125 20 10.65 20 13.75V21.25Z" fill="#00726B"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_165_472">
                      <rect width="30" height="30" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight  ">R Compiler</h5>
                    <p className="mb-3 font-normal  ">Unlock limitless possibilities with our Multiple Interface I/O Sensor</p>
                </div>
            </div>

            <div className="flex flex-col items-start  md:flex-row md:max-w-md px-3 py-5 " data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                <div className='bg-white p-3 rounded-lg mt-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <g clip-path="url(#clip0_165_479)">
                    <path d="M19.5875 5H17.5V2.5H12.5V5H10.4125C9.5 5 8.75 5.75 8.75 6.6625V25.825C8.75 26.75 9.5 27.5 10.4125 27.5H19.575C20.5 27.5 21.25 26.75 21.25 25.8375V6.6625C21.25 5.75 20.5 5 19.5875 5ZM13.75 25V18.125H11.25L16.25 8.75V15.625H18.75L13.75 25Z" fill="#F87D2F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_165_479">
                      <rect width="30" height="30" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight ">Modul Pembelajaran Interkatif</h5>
                    <p className="mb-3 font-normal  ">Stay powered for hours with our reliable Backup Battery</p>
                </div>
            </div>
            </div>
          
          </div>


          

        </div>
      </div>
    </section>
  )
}