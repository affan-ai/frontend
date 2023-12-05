"use client"

import DisplayProduct from '@/public/images/display.png'
import Image from 'next/image'
// import ModalVideo from '@/components/modal-video'
import Typed from 'typed.js';
import React from 'react';
import mipa from '@/public/mipa.jpeg'

export default function Hero() {

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Lebih Mudah', 'Lebih Seru'],
      typeSpeed: 100,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <section className="relative scroll-smooth bg-white">

      {/* Illustration behind hero content */}
      <div className="  absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
      <div className='flex flex-col h-screen w-screen opacity-25'>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1512 775" fill="none">
        <path d="M-112 59.3717C59.8828 61.3647 465.166 59.3718 465.166 592.305C465.166 940.497 952.473 526.668 1165.37 230.373C1246.84 116.982 1456.35 -24.4945 1626 96.0433" stroke="url(#paint0_linear_170_7762)" stroke-width="100" className="svg-elem-1"></path>
        <defs>
          <linearGradient id="paint0_linear_170_7762" x1="757" y1="-253.55" x2="757" y2="815.366" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00726B"></stop>
            <stop offset="1" stop-color="#00726B" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg> */}
        <Image className='' src={mipa} alt={''} />
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 h-screen">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="bg-gradient-to-t from-[#00726B] to-[#38B68D] text-transparent bg-clip-text p-2  text-5xl md:text-7xl lg:text-8xl font-semibold leading-tighter tracking-tighter mb-4 md:mt-16" data-aos="zoom-y-out">Belajar <span className='font-extrabold'>Statistika </span><span ref={el} ></span> <br /> Menggunakan <span className='font-extrabold'> Rwikistat</span></h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Dilengkapi Modul Menarik dan Praktik Langsung</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
              <a className="py-3 px-5 rounded-xl text-white hover:bg-[#38B68D] shadow-md font-s bg-[#00726B] w-full mb-4 sm:w-auto sm:mb-0" href="/signin">Belajar Sekarang</a>
              </div>
            </div>
          </div>
          {/* <div className=" flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24   w-full pb-32">
            <div className="flex flex-wrap lg:ml-20 lg:items-center items-center justify-center md:justify-start max-w-xl md:max-w-lg mt-28 md:my-48" data-aos="zoom-y-out">
              <h1 className="text-qifessblack-100 text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter text-center md:text-left">Security Solution That <span className='text-protectorange-100' ref={el}></span></h1>
              <p className="text-xl text-gray-600 text-center md:text-left mt-4">Perfect security solution with IOT-based system, Enhance your security effortlessly today!</p>
                <div className="mt-5 mb-32">
                  <a className="btn rounded-full text-white bg-protectorange-100 hover:bg-qifessorange-100 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Secure now</a>
                  </div>

            </div>
          </div> */}

          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080} /> */}

        </div>

      </div>
    </section>
  )
}