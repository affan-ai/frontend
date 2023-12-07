import Hero from "@/components/landing-page/hero"
import FeatureWhy from "@/components/landing-page/features-why"
import Header from '@/components/landing-page/header';
import Features from "@/components/landing-page/features";
import DownloadNow from '@/components/landing-page/download-now'
import Footer from "@/components/landing-page/footer";

export const metadata = {
    title: 'Protect Cube',
    description: 'Page description',
}


export default function home() {
    return (
        <>
        <Header />
        <Hero/>
        <FeatureWhy/>
        <Features/>
        <DownloadNow/>
        <DownloadNow/>
        <Footer/>


        </>
    
        // <div className='p-4 h-screen bg-[#00726B]'>
        //     Landing Page
        // </div>
    
    )
}