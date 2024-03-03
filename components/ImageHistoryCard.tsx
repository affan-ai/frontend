import { MdVerified } from "react-icons/md";
import Image from 'next/image';
import Link from "next/link";
import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import axios from 'axios';
import testImage from "@/public/mipa.jpeg"
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface VeriviedData {
    id: any;
    imageName: string;
}

const VeriviedCard = ({
    id,
    imageName
}:VeriviedData) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const imageUrl = 'http://localhost:8080/uploads/image.png';

    return (
        <div className='p-3 shadow-sm flex justify-between bg-white rounded-md border items-center hover:bg-gray-50  cursor-pointer' onClick={() => setOpen(true)}>
            <p className='text-base text-[#00726B]'>{imageName}</p>
            <div>
                <React.Fragment>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999999, p: 2}}
                    >
                    <Sheet
                        variant="plain"
                        sx={{
                        width: 700,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} onClick={() => setOpen(false)} />
                        <div className="px-4 py-2 mt-10  mx-auto">
                            <div className="mb-5">
                            <p className='text-base text-[#00726B]'>{imageName}</p>
                                <Image
                                    src={imageUrl}
                                    alt={"plot image"}
                                    width={500}
                                    height={500}
                                    />
                            </div>
                            <div className="flex flex-row gap-3 items-end">
                                <button type="submit" className=" bg-[#00726B] py-2 px-10 rounded-lg hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"><FaDownload size={16}/></button>
                                <button type="submit" className=" bg-red-600 py-2 px-10 rounded-lg hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"><MdDeleteForever size={16} /></button>
                            </div>
                        </div>
                    </Sheet>
                    </Modal>
                </React.Fragment>
            </div>
        </div>
    )
}
export default VeriviedCard;