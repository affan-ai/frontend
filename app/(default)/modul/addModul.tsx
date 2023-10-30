"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

Modal.setAppElement('#root'); // Atur elemen yang akan diakses oleh modal

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

function AddModul() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [namaModul, setNamaModul] = useState('');
  const [codeSampel, setCodeSampel] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!namaModul || !codeSampel || !pdfFile) {
      alert('Harap lengkapi semua field.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('namaModul', namaModul);
    formData.append('codeSampel', codeSampel);

    try {
      // Menggunakan fetch untuk mengirim data ke endpoint
      const response = await fetch(`${API_HOST}:${API_PORT}/api/modul`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File PDF berhasil diunggah dan data modul berhasil ditambahkan.');
        closeModal();
      } else {
        alert('Gagal menambahkan modul.');
      }
    } catch (error) {
      alert('Gagal menambahkan modul.');
      console.error(error);
    }
  }

  return (
    <div id="root">
      <Button variant="contained" color="primary" onClick={openModal}>
        Tambah Modul
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Tambah Modul"
      >
        <h2>Tambah Modul</h2>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nama Modul"
            fullWidth
            value={namaModul}
            onChange={(e) => setNamaModul(e.target.value)}
          />
          <TextField
            label="Kode Sampel"
            fullWidth
            value={codeSampel}
            onChange={(e) => setCodeSampel(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Tambah
          </Button>
        </form>
        <Button variant="contained" color="secondary" onClick={closeModal}>
          Tutup Modal
        </Button>
      </Modal>
    </div>
  );
}

export default AddModul;
