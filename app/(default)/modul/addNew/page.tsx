"use client"

import { ChangeEvent, FormEvent, useState } from "react";

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 8080;


export default function page() {
  const [codeSampel, setCodeSampel] = useState('');
  const [namaModul, setNamaModul] = useState('');
  const [judulModul, setJudulModul] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

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
    formData.append('judulModul', judulModul);

    try {
      // Menggunakan fetch untuk mengirim data ke endpoint
      const response = await fetch(`${API_HOST}:${API_PORT}/api/modul`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = '/modul';
      } else {
        alert('Gagal menambahkan modul.');
      }
    } catch (error) {
      alert('Gagal menambahkan modul.');
      console.error(error);
    }
  }
  return (
        <div className="flex items-center justify-center py-12 md:px-12">
          <div className="mx-auto w-full max-w-[750px] bg-white">
            <p className="py-2 px-9 text-2xl md:text-3xl font-extrabold text-[#00726B] ">
              Tambah Modul Pembelajaran
            </p>
            <form
              className="py-6 px-9"
              onSubmit={handleFormSubmit}
              action=""
              method=""
            >
            <div className="mb-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Masukan Nama Modul
                </label>
                <input
                  type="namaModul"
                  name="namaModul"
                  id="namaModul"
                  value={namaModul}
                  onChange={(e) => setNamaModul(e.target.value)}
                  placeholder="contoh : Modul 1, Modul 2 dll.."
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#00726B] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Masukan Judul Modul
                </label>
                <input
                  type="judulModul"
                  name="judulModul"
                  id="judulModul"
                  value={judulModul}
                  onChange={(e) => setJudulModul(e.target.value)}
                  placeholder="contoh : Belajar Dasar Statistik"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#00726B] focus:shadow-md"
                />
              </div>


              <div className="mb-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Masukan Contoh Kode R
                </label>
                <textarea
                  value={codeSampel}
                  onChange={(e) => setCodeSampel(e.target.value)}
                  autoCorrect="false"
                  placeholder="contoh : 1 + 1"
                  className="font-mono w-full h-72 rounded-md border border-[#e0e0e0] bg-white p-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#00726B] focus:shadow-md"
                />
              </div>

              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload File Modul
                </label>

                <div className="mb-8 px-5 py-10 rounded-md border border-dashed border-[#e0e0e0]">
                <input
                name="file"
                id="file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900  rounded-md cursor-pointer bg-gray-50  focus:outline-none " />
                  {/* <input
                  name="file"
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="sr-only" />
                  <label
                    htmlFor="file"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span
                        className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                      >
                        Browse
                      </span>
                    </div>
                  </label> */}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-[#00726B] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Tambah Modul Baru
                </button>
              </div>
            </form>
          </div>




        





          
        </div>
  )
}