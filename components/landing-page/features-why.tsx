// import '@/app/css/additional-styles/svg-animation.css'


export default function FeaturesBlocks() {
  return (
    <section className="relative bg-white h-screen">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 h-screen  md:mt-24 lg:mt-0 bg-protectorange-200 pointer-events-none" aria-hidden="true">
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1512 775" fill="none">
        <path d="M-112 59.3717C59.8828 61.3647 465.166 59.3718 465.166 592.305C465.166 940.497 952.473 526.668 1165.37 230.373C1246.84 116.982 1456.35 -24.4945 1626 96.0433" stroke="url(#paint0_linear_170_7762)" stroke-width="100" className="svg-elem-1"></path>
        <defs>
          <linearGradient id="paint0_linear_170_7762" x1="757" y1="-253.55" x2="757" y2="815.366" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F87D2F"></stop>
            <stop offset="1" stop-color="#F87D2F" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg> */}
      </div>


      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-4xl font-extrabold mb-4 text-[#00726B]">Kenapa Belajar Melalui Rwikistat?</h2>
            <p className="text-xl text-gray-600">Our core is easy to use with an attractive user interface</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none" data-aos="zoom-y-out" data-aos-delay="350">

            {/* 1st */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
              <svg className="w-16 h-16 p-1 -mt-1 mb-2 items-center" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <rect className="fill-current text-[#00726B] block m-auto" x="0" y="0"  width="64" height="64" rx="32" />
                  <g strokeWidth="2">
                      <path transform="translate(5, 5)" d="M20.3683 29.055L10.6833 38.74C9.83829 39.585 9.83829 40.95 10.6833 41.795C11.5283 42.64 12.8933 42.64 13.7383 41.795L23.4016 32.1317L20.3683 29.055ZM11.0083 18.7417L13.5866 16.1633L39.24 41.8167C40.085 42.6617 41.45 42.6617 42.295 41.8167C43.14 40.9717 43.14 39.6067 42.295 38.7617L16.6633 13.0867L19.2416 10.5083C19.9133 9.83666 19.4366 8.66666 18.4616 8.66666L10.25 8.66666C9.64329 8.66666 9.16662 9.14333 9.16662 9.75L9.16662 17.9617C9.16662 18.9367 10.3366 19.4133 11.0083 18.7417ZM29.555 19.8683L32.61 22.9233L39.3916 16.1417L41.9916 18.7417C42.6633 19.4133 43.8333 18.9367 43.8333 17.9617L43.8333 9.74999C43.8333 9.14333 43.3566 8.66666 42.75 8.66666L34.5383 8.66666C33.5633 8.66666 33.0866 9.83666 33.78 10.5083L36.3583 13.0867L29.555 19.8683Z" fill="white"/>
                  </g>
                </g>
              </svg>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Adanya Library GetShinny</h4>
              <p className="text-gray-600 text-center text-sm">Customizable processes to suit your project needs.</p>
            </div>

            {/* 2nd */}
            <div className="relative flex flex-col items-center px-10 pb-16 pt-12 bg-white rounded shadow-lg border">
              <svg className="w-16 h-16 p-1 -mt-1 mb-2 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <rect className="fill-current text-[#00726B]" width="64" height="64" rx="32" />
                  <g strokeWidth="2">
                  <g clipPath="url(#clip0_27_608)">
                    <path transform="translate(5, 5)" d="M42.5984 28.1233C42.685 27.43 42.75 26.7367 42.75 26C42.75 25.2633 42.685 24.57 42.5984 23.8767L47.17 20.3017C47.5817 19.9767 47.69 19.3917 47.43 18.915L43.0967 11.4183C42.8367 10.9417 42.2517 10.7683 41.775 10.9417L36.38 13.1083C35.2534 12.2417 34.04 11.5267 32.7184 10.985L31.895 5.24334C31.83 4.72334 31.375 4.33334 30.8334 4.33334H22.1667C21.625 4.33334 21.17 4.72334 21.105 5.24334L20.2817 10.985C18.96 11.5267 17.7467 12.2633 16.62 13.1083L11.225 10.9417C10.7267 10.7467 10.1634 10.9417 9.90335 11.4183L5.57002 18.915C5.28835 19.3917 5.41835 19.9767 5.83002 20.3017L10.4017 23.8767C10.315 24.57 10.25 25.285 10.25 26C10.25 26.715 10.315 27.43 10.4017 28.1233L5.83002 31.6983C5.41835 32.0233 5.31002 32.6083 5.57002 33.085L9.90335 40.5817C10.1634 41.0583 10.7484 41.2317 11.225 41.0583L16.62 38.8917C17.7467 39.7583 18.96 40.4733 20.2817 41.015L21.105 46.7567C21.17 47.2767 21.625 47.6667 22.1667 47.6667H30.8334C31.375 47.6667 31.83 47.2767 31.895 46.7567L32.7184 41.015C34.04 40.4733 35.2534 39.7367 36.38 38.8917L41.775 41.0583C42.2734 41.2533 42.8367 41.0583 43.0967 40.5817L47.43 33.085C47.69 32.6083 47.5817 32.0233 47.17 31.6983L42.5984 28.1233ZM26.5 33.5833C22.3184 33.5833 18.9167 30.1817 18.9167 26C18.9167 21.8183 22.3184 18.4167 26.5 18.4167C30.6817 18.4167 34.0834 21.8183 34.0834 26C34.0834 30.1817 30.6817 33.5833 26.5 33.5833Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_27_608">
                    <rect width="52" height="52" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                    </g>
                </g>
              </svg>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Mudah Untuk Dicoba</h4>
              <p className="text-gray-600 text-center text-sm">Customizable processes to suit your project needs.</p>
            </div>

            {/* 3rd */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
            <svg className="w-16 h-16 p-1 -mt-1 mb-2 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <rect className="fill-current text-[#00726B]" width="64" height="64" rx="32" />
                  <g strokeWidth="2">
                    <g clip-path="url(#clip0_27_654)">
                    <path transform="translate(5, 5)" d="M15.6667 8.66668C15.6667 6.26168 13.7383 4.33334 11.3333 4.33334C8.92834 4.33334 7.00001 6.26168 7.00001 8.66668C7.00001 11.0717 8.92834 13 11.3333 13C13.7383 13 15.6667 11.0717 15.6667 8.66668ZM22.5783 9.75001C21.69 9.75001 20.9317 10.2917 20.585 11.115C19.6317 13.4983 17.3133 15.1667 14.5833 15.1667H8.08334C6.28501 15.1667 4.83334 16.6183 4.83334 18.4167V23.8333H17.8333V18.9367C20.9317 17.9617 23.4233 15.6217 24.5933 12.6317C25.1567 11.245 24.0733 9.75001 22.5783 9.75001ZM41.6667 36.8333C44.0717 36.8333 46 34.905 46 32.5C46 30.095 44.0717 28.1667 41.6667 28.1667C39.2617 28.1667 37.3333 30.095 37.3333 32.5C37.3333 34.905 39.2617 36.8333 41.6667 36.8333ZM44.9167 39H38.4167C35.6867 39 33.3683 37.3317 32.415 34.9483C32.09 34.125 31.31 33.5833 30.4217 33.5833C28.9267 33.5833 27.8433 35.0783 28.385 36.465C29.5767 39.455 32.0467 41.795 35.145 42.77V47.6667H48.145V42.25C48.1667 40.4517 46.715 39 44.9167 39ZM37.875 24.0283C37.875 24.0283 37.875 24.0067 37.8967 24.0283C35.6 24.6133 33.78 26.4333 33.195 28.73V28.7083C32.9567 29.64 32.09 30.3333 31.0717 30.3333C29.88 30.3333 28.905 29.3583 28.905 28.1667C28.905 28.0583 28.9483 27.8633 28.9483 27.8633C29.88 23.855 33.0433 20.6917 37.0733 19.7817C37.16 19.7817 37.2467 19.76 37.3333 19.76C38.525 19.76 39.5 20.735 39.5 21.9267C39.5 22.9233 38.8067 23.79 37.875 24.0283ZM39.5 13.13C39.5 14.235 38.6983 15.1233 37.6367 15.275C30.725 16.12 25.2867 21.58 24.4417 28.4917C24.29 29.5317 23.38 30.3333 22.2967 30.3333C21.105 30.3333 20.13 29.3583 20.13 28.1667C20.13 28.1233 20.13 28.08 20.13 28.0367C20.13 28.015 20.13 27.9933 20.13 27.9717C21.2133 19.045 28.3417 11.9817 37.29 10.9633H37.3117C38.525 10.9633 39.5 11.9383 39.5 13.13Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_27_654">
                    <rect width="52" height="52" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                    </g>
                </g>
              </svg>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Fitur Forum Tempat Diskusi</h4>
              <p className="text-gray-600 text-center text-sm">Customizable processes to suit your project needs.</p>
            </div>

            {/* 4th */}
            <div className="relative flex flex-col items-center px-10 pb-16  pt-12 bg-white rounded shadow-lg border">
              <svg className="w-16 h-16 p-1 -mt-1 mb-2 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-[#00726B]" width="64" height="64" rx="32" />
                  <path transform="translate(5, 5)" d="M28.6667 28.1667C27.4533 29.38 25.525 29.38 24.3333 28.1883V28.1667C23.1417 26.975 23.1417 25.0467 24.3333 23.855V23.8333C25.525 22.6417 27.4533 22.6417 28.645 23.8333H28.6667C29.8583 25.025 29.8583 26.975 28.6667 28.1667ZM26.5 13L31.0933 17.5933L36.51 12.1767L29.5767 5.24333C27.8867 3.55333 25.135 3.55333 23.445 5.24333L16.5117 12.1767L21.9283 17.5933L26.5 13ZM13.5 26L18.0933 21.4067L12.6767 15.99L5.74333 22.9233C4.05333 24.6133 4.05333 27.365 5.74333 29.055L12.6767 35.9883L18.0933 30.5717L13.5 26ZM39.5 26L34.9067 30.5933L40.3233 36.01L47.2567 29.0767C48.9467 27.3867 48.9467 24.635 47.2567 22.945L40.3233 16.0117L34.9067 21.4283L39.5 26ZM26.5 39L21.9067 34.4067L16.49 39.8233L23.4233 46.7567C25.1133 48.4467 27.865 48.4467 29.555 46.7567L36.4883 39.8233L31.0717 34.4067L26.5 39Z" fill="white"/>
              </svg>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Belajar dan Langsung Coba</h4>
              <p className="text-gray-600 text-center text-sm">Customizable processes to suit your project needs.</p>
            </div>
           

          </div>

        </div>
      </div>
    </section>
  )
}