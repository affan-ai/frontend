"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

function ModulList() {
  // Buat sebuah jenis yang mencerminkan struktur data dari API
interface ModulData {
  id: number;
  data: {
    namaModul: string;
    codeSampel: string;
  };
}
  

// Kemudian gunakan jenis ini untuk menentukan jenis state
const [testData, setTestData] = useState<ModulData[]>([]);

  useEffect(() => {
    // Mengambil data dari endpoint API dengan axios
    async function fetchData() {
      try {
        const response = await axios.get(`${API_HOST}:${API_PORT}/api/modul`);
        if (response.status === 200) {
          setTestData(response.data);
        } else {
          console.error('Gagal mengambil data:', response.statusText);
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data dari API</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pdf Name</th>
            <th>Sintax</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.data.namaModul}</td>
              <td>{item.data.codeSampel}</td>
              <td><Link href={`/modul/${item.id}`}>Detail</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModulList;
