import { NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:3001/api';
const API_KEY = process.env.API_GATEWAY_AGENCY;
const FONNTE_TOKEN = process.env.FONNTE_TOKEN; // Simpan token di .env

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 1. Kirim data ke Express API (Simpan ke DB)
    const response = await fetch(`${EXPRESS_API_URL}/kerjasama`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(body),
    });
    
    const result = await response.json();

    // 2. Jika Berhasil masuk DB, jalankan fungsi kirim WA ke User
    if (response.ok && (result.success || result.id)) {
      // Kita panggil fungsi kirim WA tanpa 'await' agar user tidak kelamaan nunggu loading
      sendAutoReply(body);
    }

    return NextResponse.json(result, { status: response.status });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// --- Fungsi Helper Fonnte ---
async function sendAutoReply(payload) {
  // 1. Bersihkan nomor WA user agar formatnya 628xxx
  let targetNumber = payload.whatsapp.replace(/\D/g, ''); // Ambil angka saja
  if (targetNumber.startsWith('0')) {
    targetNumber = '62' + targetNumber.substring(1);
  }

  // 2. Susun template pesan profesional
  const message = `
Halo *${payload.namaPemimpin}*,

Terima kasih telah menghubungi *Zestify Technology*. Pesan Anda mengenai kerjasama untuk *${payload.namaUsaha}* telah kami terima.

*Ringkasan Pengajuan:*
- Bidang: ${payload.bidang}
- Jadwal Diskusi: ${payload.tanggal} (${payload.waktu})
- Mode: ${payload.mode}

Tim kami akan meninjau detail kebutuhan Anda dan segera menghubungi kembali melalui nomor ini untuk konfirmasi lebih lanjut.

Salam,
*Admin Zestify*
  `.trim();

  // 3. Eksekusi ke API Fonnte
  try {
    await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': FONNTE_TOKEN,
      },
      body: new URLSearchParams({
        target: targetNumber,
        message: message,
        countryCode: '62', // Opsional untuk memastikan target Indonesia
      }),
    });
  } catch (err) {
    console.error('Fonnte API Error:', err);
  }
}