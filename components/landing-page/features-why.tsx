import { IoLibrarySharp } from "react-icons/io5";
import { FaPeopleGroup, FaLightbulb, FaBoltLightning  } from "react-icons/fa6";


export default function FeaturesBlocks() {
  return (
    <section className="relative bg-white">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 h-screen  md:mt-24 lg:mt-0 bg-protectorange-200 pointer-events-none" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1512 775" fill="none">
        <path d="M-112 59.3717C59.8828 61.3647 465.166 59.3718 465.166 592.305C465.166 940.497 952.473 526.668 1165.37 230.373C1246.84 116.982 1456.35 -24.4945 1626 96.0433" stroke="url(#paint0_linear_170_7762)" stroke-width="100" className="svg-elem-1"></path>
        <defs>
          <linearGradient id="paint0_linear_170_7762" x1="757" y1="-253.55" x2="757" y2="815.366" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00726B"></stop>
            <stop offset="1" stop-color="#00726B" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
      </div>


      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-4xl font-extrabold mb-4 text-[#00726B]">Kenapa Belajar Melalui Rwikistat?</h2>
            <p className="text-xl text-gray-600">Pada dasarnya Rwikistat mengedepankan kemudahan bagi penggunanya</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none" data-aos="zoom-y-out" data-aos-delay="350">

            {/* 1st */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
              <div className="w-16 h-16 p-1 -mt-1 mb-2 bg-[#00726B] rounded-full">
                <IoLibrarySharp color="white" size="30px" className="items-center justify-center ml-3 mt-3"/>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Adanya Library GetShinny</h4>
              <p className="text-gray-600 text-center text-sm">Lebih mudah dalam percobaan dan eksplorasi.</p>
            </div>

            {/* 2nd */}
            <div className="relative flex flex-col items-center px-10 pb-16 pt-12 bg-white rounded shadow-lg border">
              <div className="w-16 h-16 p-1 -mt-1 mb-2 bg-[#00726B] rounded-full">
                <FaBoltLightning  color="white" size="30px" className="items-center justify-center ml-3 mt-3"/>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Mudah Untuk Dicoba</h4>
              <p className="text-gray-600 text-center text-sm">Masuk dengan akun anda dan coba fiturnya</p>
            </div>

            {/* 3rd */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
              <div className="w-16 h-16 p-1 -mt-1 mb-2 bg-[#00726B] rounded-full">
                <FaPeopleGroup color="white" size="30px" className="items-center justify-center ml-3 mt-3"/>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Forum Tempat Diskusi</h4>
              <p className="text-gray-600 text-center text-sm">Berinteraksi dengan pengguna lainnya.</p>
            </div>

            {/* 4th */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
              <div className="w-16 h-16 p-1 -mt-1 mb-2 bg-[#00726B] rounded-full">
                <FaLightbulb color="white" size="30px" className="items-center justify-center ml-3 mt-3"/>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Belajar dan Langsung Coba</h4>
              <p className="text-gray-600 text-center text-sm">Tiap modul memiliki latihan untuk di pelajari.</p>
            </div>
           

          </div>

        </div>
      </div>
    </section>
  )
}