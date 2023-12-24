import { MdVerified } from "react-icons/md";
import Image from 'next/image';

interface VeriviedData {
    profileImage: any;
    name: string;
    email: string;
    verified: boolean;
}

const VeriviedCard = ({
    profileImage,
    name,   
    email,
    verified,
}:VeriviedData) => {
    return (
        <div className='p-4 flex shadow-md bg-white rounded-lg border items-center'>
            <div className=" mr-2 ">
                <Image src={profileImage} className="rounded-full" alt="profile" width={52} height={52}  />
            </div>
            <div className="items-center justify-between">
                <div className='flex items-center'>
                <p className="text-lg font-semibold text-gray-900 -mt-1">{name}</p>
                {verified ? (<MdVerified size={18} className="mb-1 ml-1 text-[#00726B]" />) : ("")  }
                </div>
                <p className="text-gray-700 text-sm">{email}</p>
            </div>
        </div>
    )
}
export default VeriviedCard;