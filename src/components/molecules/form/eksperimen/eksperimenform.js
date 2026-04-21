'use client';

import { useState } from 'react';

const STEPS = [
  { id: 1, label: 'Identitas' },
  { id: 2, label: 'Kontak' },
  { id: 3, label: 'Detail' },
  { id: 4, label: 'Jadwal' },
];

const bidangUsaha = [
  'SaaS / Platform Digital',
  'Manufaktur & Industri',
  'Kesehatan & Medis',
  'Pendidikan & EdTech',
  'Keuangan & Fintech',
  'Logistik & Supply Chain',
  'Retail & E-Commerce',
  'Pemerintahan & Publik',
  'Lainnya',
];

const sosmedOptions = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Facebook'];

// ── Reusable field components ──────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
      <label className="sm:w-48 sm:shrink-0 sm:text-right sm:pt-2.5 text-sm text-neutral-300">
        {label}{required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const inputCls = "w-full bg-transparent border border-neutral-600 rounded-md px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

// ── Step 1: Identitas Usaha ────────────────────────────────────────────────
function StepIdentitas({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Nama Pemimpin" required>
        <input type="text" name="namaPemimpin" value={data.namaPemimpin} onChange={onChange}
          className={inputCls} placeholder="Masukkan nama lengkap pemimpin" />
      </Field>
      <Field label="Nama Usaha" required>
        <input type="text" name="namaUsaha" value={data.namaUsaha} onChange={onChange}
          className={inputCls} placeholder="Masukkan nama usaha" />
      </Field>
      <Field label="Bidang Usaha" required>
        <div className="relative">
          <select name="bidang" value={data.bidang} onChange={onChange}
            className={`${inputCls} appearance-none pr-10 ${!data.bidang ? 'text-neutral-500' : 'text-white'}`}>
            <option value="" disabled className="bg-neutral-900 text-neutral-400">Pilih bidang usaha</option>
            {bidangUsaha.map(b => <option key={b} value={b} className="bg-neutral-900 text-white">{b}</option>)}
          </select>
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
            <div className="w-px h-5 bg-neutral-600 mr-3" />
            <svg className="w-4 h-4 text-neutral-400 mr-3" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Field>
    </div>
  );
}

// ── Step 2: Kontak ─────────────────────────────────────────────────────────
function StepKontak({ data, onChange, toggleSosmed }) {
  return (
    <div className="space-y-5">
      <Field label="No. WhatsApp" required>
        <div className="flex gap-2">
          <input type="tel" name="whatsapp" value={data.whatsapp} onChange={onChange}
            className={`${inputCls} flex-1`} placeholder="0812 3456 7890" />
        </div>
      </Field>
      <Field label="Email" required>
        <input type="email" name="email" value={data.email} onChange={onChange}
          className={inputCls} placeholder="nama@perusahaan.com" />
      </Field>
      <Field label="Media Sosial">
        <div className="flex flex-wrap gap-2 mb-3">
          {sosmedOptions.map(s => {
            const active = data.sosmed.includes(s);
            return (
              <button key={s} type="button" onClick={() => toggleSosmed(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                  ${active
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                    : 'bg-transparent border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-300'
                  }`}>
                {s}
              </button>
            );
          })}
        </div>
        {data.sosmed.length > 0 && (
          <input type="text" name="sosmedHandle" value={data.sosmedHandle} onChange={onChange}
            className={inputCls} placeholder={`@username (${data.sosmed.join(', ')})`} />
        )}
      </Field>
    </div>
  );
}

// ── Step 3: Detail Kebutuhan ───────────────────────────────────────────────
function StepDetail({ data, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Alasan Pengajuan" required>
        <div className="relative">
          <textarea name="alasan" value={data.alasan} onChange={onChange} rows={3}
            maxLength={300}
            className={`${inputCls} resize-none leading-relaxed`}
            placeholder="Jelaskan mengapa bisnis Anda ingin berkonsultasi dengan kami..." />
          <span className={`absolute bottom-2.5 right-3 text-[10px] ${data.alasan.length > 270 ? 'text-red-400' : 'text-neutral-600'}`}>
            {data.alasan.length}/300
          </span>
        </div>
      </Field>
      <Field label="Kebutuhan Teknis">
        <div className="relative">
          <textarea name="kebutuhan" value={data.kebutuhan} onChange={onChange} rows={4}
            maxLength={500}
            className={`${inputCls} resize-none leading-relaxed`}
            placeholder="Deskripsikan stack teknologi, volume pengguna, ekspektasi integrasi, dan tantangan yang dihadapi..." />
          <span className={`absolute bottom-2.5 right-3 text-[10px] ${data.kebutuhan.length > 460 ? 'text-red-400' : 'text-neutral-600'}`}>
            {data.kebutuhan.length}/500
          </span>
        </div>
      </Field>
      <Field label="Target Capaian">
        <input type="text" name="target" value={data.target} onChange={onChange}
          className={inputCls} placeholder="Apa yang ingin Anda capai setelah sesi diskusi ini?" />
      </Field>
    </div>
  );
}

// ── Step 4: Jadwal Diskusi ─────────────────────────────────────────────────
function StepJadwal({ data, onChange, setData }) {
  return (
    <div className="space-y-5">
      <Field label="Mode Diskusi" required>
        <div className="flex gap-3">
          {['Online', 'Offline'].map(mode => {
            const active = data.mode === mode;
            return (
              <button key={mode} type="button"
                onClick={() => setData(d => ({ ...d, mode }))}
                className={`flex-1 py-3 rounded-md border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200
                  ${active
                    ? 'bg-blue-500/15 border-blue-500 text-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-transparent border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-300'
                  }`}>
                {mode === 'Online'
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 12L5 14M10 12L11 14M4 14H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                }
                {mode}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Tanggal Diskusi" required>
        <input type="date" name="tanggal" value={data.tanggal} onChange={onChange}
          className={`${inputCls} [color-scheme:dark]`} />
      </Field>
      <Field label="Waktu Preferensi">
        <div className="flex gap-2 flex-wrap">
          {['08.00–10.00', '10.00–12.00', '13.00–15.00', '15.00–17.00'].map(slot => {
            const active = data.waktu === slot;
            return (
              <button key={slot} type="button"
                onClick={() => setData(d => ({ ...d, waktu: slot }))}
                className={`px-3.5 py-2 rounded-md border text-xs font-medium transition-all duration-200
                  ${active
                    ? 'bg-blue-500/15 border-blue-500 text-blue-300'
                    : 'bg-transparent border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-300'
                  }`}>
                {slot}
              </button>
            );
          })}
        </div>
      </Field>
      {data.mode === 'Offline' && (
        <Field label="Lokasi Pertemuan">
          <input type="text" name="lokasi" value={data.lokasi} onChange={onChange}
            className={inputCls} placeholder="Masukkan alamat atau nama tempat pertemuan" />
        </Field>
      )}
      {data.mode === 'Online' && (
        <Field label="Platform">
          <div className="flex gap-2 flex-wrap">
            {['Google Meet', 'Zoom', 'Teams', 'Lainnya'].map(p => {
              const active = data.platform === p;
              return (
                <button key={p} type="button"
                  onClick={() => setData(d => ({ ...d, platform: p }))}
                  className={`px-3.5 py-2 rounded-md border text-xs font-medium transition-all duration-200
                    ${active
                      ? 'bg-blue-500/15 border-blue-500 text-blue-300'
                      : 'bg-transparent border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-300'
                    }`}>
                  {p}
                </button>
              );
            })}
          </div>
        </Field>
      )}
    </div>
  );
}

// ── Success ────────────────────────────────────────────────────────────────
function SuccessScreen({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full border border-blue-500/40 flex items-center justify-center mb-6
        shadow-[0_0_24px_rgba(59,130,246,0.2)]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 14.5L11 21L23 8" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 50, strokeDashoffset: 50, animation: 'drawCheck 0.6s 0.2s ease forwards' }}/>
        </svg>
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-blue-400 font-medium mb-3">Pengajuan Berhasil</p>
      <h2 className="text-white text-2xl font-bold mb-3">Jadwal Diterima</h2>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-8">
        Tim kami akan mengonfirmasi jadwal diskusi Anda dalam <strong className="text-white">1×24 jam</strong> kerja.
      </p>
      <button onClick={onReset}
        className="text-xs tracking-widest uppercase text-neutral-500 hover:text-blue-400 border-b border-neutral-700 hover:border-blue-500 pb-0.5 transition-all duration-200">
        Ajukan Kembali
      </button>
      <style>{`@keyframes drawCheck { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function FormEksperimen() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [identitas, setIdentitas] = useState({ namaPemimpin: '', namaUsaha: '', bidang: '' });
  const [kontak, setKontak]       = useState({ whatsapp: '', email: '', sosmed: [], sosmedHandle: '' });
  const [detail, setDetail]       = useState({ alasan: '', kebutuhan: '', target: '' });
  const [jadwal, setJadwal]       = useState({ mode: 'Online', tanggal: '', waktu: '', lokasi: '', platform: '' });

  const handleIdentitas = (e) => setIdentitas(d => ({ ...d, [e.target.name]: e.target.value }));
  const handleKontak    = (e) => setKontak(d => ({ ...d, [e.target.name]: e.target.value }));
  const handleDetail    = (e) => setDetail(d => ({ ...d, [e.target.name]: e.target.value }));
  const handleJadwal    = (e) => setJadwal(d => ({ ...d, [e.target.name]: e.target.value }));

  const toggleSosmed = (s) => setKontak(d => ({
    ...d,
    sosmed: d.sosmed.includes(s) ? d.sosmed.filter(x => x !== s) : [...d.sosmed, s]
  }));

const handleNext = async () => {
  // Validasi step 1
  if (step === 1 && (!identitas.namaPemimpin || !identitas.namaUsaha || !identitas.bidang)) {
    alert('Mohon lengkapi data Identitas Usaha');
    return;
  }
  
  // Validasi step 2
  if (step === 2 && (!kontak.whatsapp || !kontak.email)) {
    alert('Mohon lengkapi data Kontak');
    return;
  }
  
  // Validasi step 3
  if (step === 3 && !detail.alasan) {
    alert('Mohon isi Alasan Pengajuan');
    return;
  }
  
  // Validasi step 4
  if (step === 4 && !jadwal.tanggal) {
    alert('Mohon pilih Tanggal Diskusi');
    return;
  }
  
  // Kalo belum step terakhir, lanjut ke step berikutnya
  if (step < 4) {
    setStep(s => s + 1);
    return;
  }
  
  // Step 4: Kirim data ke backend
  setLoading(true);
  
  try {
    const formData = {
      namaPemimpin: identitas.namaPemimpin,
      namaUsaha: identitas.namaUsaha,
      bidang: identitas.bidang,
      whatsapp: kontak.whatsapp,
      email: kontak.email,
      sosmed: kontak.sosmed,
      sosmedHandle: kontak.sosmedHandle,
      alasan: detail.alasan,
      kebutuhan: detail.kebutuhan,
      target: detail.target,
      mode: jadwal.mode,
      tanggal: jadwal.tanggal,
      waktu: jadwal.waktu,
      lokasi: jadwal.lokasi,
      platform: jadwal.platform,
    };
    
    const response = await fetch('/api/kerjasama', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      setDone(true);
    } else {
      alert('Gagal mengirim: ' + (result.error || 'Terjadi kesalahan'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setDone(false); setStep(1);
    setIdentitas({ namaPemimpin: '', namaUsaha: '', bidang: '' });
    setKontak({ whatsapp: '', email: '', sosmed: [], sosmedHandle: '' });
    setDetail({ alasan: '', kebutuhan: '', target: '' });
    setJadwal({ mode: 'Online', tanggal: '', waktu: '', lokasi: '', platform: '' });
  };

  if (done) return (
    <div className="min-h-screen bg-transparent flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-white text-xl font-semibold mb-7 tracking-wide">Create Your Profile</h1>
        <SuccessScreen onReset={handleReset} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Title */}
        <h1 className="text-center text-white text-xl font-semibold mb-7 tracking-wide">
          Create Your Profile
        </h1>

        {/* Stepper */}
        <div className="flex items-start mb-10">
          {STEPS.map((s, idx) => {
            const completed = s.id < step;
            const active    = s.id === step;
            const pending   = s.id > step;
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center relative">
                {/* Connector */}
                {idx > 0 && (
                  <div className="absolute top-[18px] right-1/2 w-full h-[2px]"
                    style={{ left: '-50%', width: '100%' }}>
                    <div className={`h-full w-full transition-colors duration-500 ${completed || active ? 'bg-blue-500' : 'bg-neutral-700'}`} />
                  </div>
                )}
                {/* Circle */}
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${completed ? 'bg-blue-500 text-white' : ''}
                  ${active    ? 'bg-blue-500 text-white ring-4 ring-blue-500/25' : ''}
                  ${pending   ? 'bg-transparent border-2 border-neutral-600 text-neutral-500' : ''}`}>
                  {completed
                    ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span>{s.id}</span>
                  }
                </div>
                {/* Label */}
                <span className={`mt-2 text-[11px] text-center leading-tight
                  ${active || completed ? 'text-blue-400 font-semibold' : 'text-neutral-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-white text-base font-bold tracking-widest uppercase mb-1">
            {step === 1 && 'Identitas Usaha'}
            {step === 2 && 'Informasi Kontak'}
            {step === 3 && 'Detail Kebutuhan'}
            {step === 4 && 'Jadwal Diskusi'}
          </h2>
          <p className="text-neutral-400 text-sm">
            {step === 1 && 'Informasi dasar tentang usaha dan pemimpin yang mengajukan konsultasi.'}
            {step === 2 && 'Cara terbaik untuk menghubungi Anda terkait jadwal dan konfirmasi.'}
            {step === 3 && 'Ceritakan alasan dan kebutuhan yang ingin Anda diskusikan.'}
            {step === 4 && 'Tentukan waktu dan format diskusi yang paling sesuai untuk Anda.'}
          </p>
          <div className="mt-4 border-t border-neutral-700/60" />
        </div>

        {/* Step Content */}
        <div className="mt-6">
          {step === 1 && <StepIdentitas data={identitas} onChange={handleIdentitas} />}
          {step === 2 && <StepKontak data={kontak} onChange={handleKontak} toggleSosmed={toggleSosmed} />}
          {step === 3 && <StepDetail data={detail} onChange={handleDetail} />}
          {step === 4 && <StepJadwal data={jadwal} onChange={handleJadwal} setData={setJadwal} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 disabled:text-neutral-600 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={loading}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-all duration-200">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                  <path d="M8 2C4.686 2 2 4.686 2 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Memproses...
              </>
            ) : (
              <>
                {step === 4 ? 'Kirim' : 'Next'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}