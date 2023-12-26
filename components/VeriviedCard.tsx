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
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import axios from 'axios';

interface VeriviedData {
    profileImage: any;
    name: string;
    email: string;
    verified: boolean;
    link: string;
    id: number;
}

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 8080;

const VeriviedCard = ({
    profileImage,
    name,   
    email,
    verified,
    link,
    id,
}:VeriviedData) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleVerified = (id: number) => {
        // Panggil endpoint dengan menggunakan ID modul
        axios.post(`${API_HOST}:${API_PORT}/api/user/${id}`)
          .then(response => {
            console.log(id)
            setOpen(false);
          })
          .catch(error => {
            console.error('Gagal menghapus data:', error);
            // Handle error secara sesuai kebutuhan Anda
          });
      };
    return (
        <div className='p-4 shadow-md flex justify-between bg-white rounded-lg border items-center'>
            <Link href={link} className=" flex">
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
            </Link>
                <div>
                <React.Fragment>
                <Button
                    size="sm"
                    variant="plain"
                    color="success"
                    onClick={() => setOpen(true)}
                >
                    Verified
                </Button>
                <Modal open={open} onClose={() => setOpen(false)} sx={{zIndex: 999999,}}>
                    <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Apakah anda yakin ingin memverifikasi user ini?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="soft" color="success" onClick={() => handleVerified(id)}>
                        Verivikasi
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Batal
                        </Button>
                    </DialogActions>
                    </ModalDialog>
                </Modal>
                </React.Fragment>
                </div>
        </div>
    )
}
export default VeriviedCard;