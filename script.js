/* ==========================================================================
   KAVIRA SMK - AUTOMATIC WHATSAPP SENDER TO ADMIN 088210222618
   With Keterangan Kesalahan Data Siswa & Isi Data Baru
   Author: winessa.online
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const inputNama = document.getElementById('inputNama');
    const selectTingkatKelas = document.getElementById('selectTingkatKelas');
    const selectJurusan = document.getElementById('selectJurusan');
    const inputRombel = document.getElementById('inputRombel');
    const selectKategori = document.getElementById('selectKategori');
    const groupKesalahanData = document.getElementById('groupKesalahanData');
    const inputKeteranganKesalahan = document.getElementById('inputKeteranganKesalahan');
    const inputDataBaru = document.getElementById('inputDataBaru');
    const waPreviewText = document.getElementById('waPreviewText');
    const kaviraWAForm = document.getElementById('kaviraWAForm');

    // Pop-Up Modal Elements
    const modalDzuhur = document.getElementById('modalDzuhur');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnTriggerPopup = document.getElementById('btnTriggerPopup');

    // Admin WhatsApp Number: 088210222618 -> 6288210222618
    const ADMIN_WA_NUMBER = '6288210222618';

    // Full names mapping for SMK Majors
    const majorFullNames = {
        'MPLB': 'MPLB (Manajemen Perkantoran & Layanan Bisnis)',
        'AKL': 'AKL (Akuntansi & Keuangan Lembaga)',
        'TKR': 'TKR (Teknik Kendaraan Ringan)',
        'TPM': 'TPM (Teknik Pemesinan)',
        'TKJT': 'TKJT (Teknik Komputer Jaringan & Telekomunikasi)',
        'PPLG': 'PPLG (Pengembangan Perangkat Lunak & Gim)'
    };

    // Show Modal Utility
    function openModal() {
        modalDzuhur.classList.add('active');
    }

    function closeModal() {
        modalDzuhur.classList.remove('active');
    }

    // Automatically open pop-up modal on initial page load
    setTimeout(() => {
        openModal();
    }, 600);

    // Modal Events
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnTriggerPopup) btnTriggerPopup.addEventListener('click', openModal);

    modalDzuhur.addEventListener('click', (e) => {
        if (e.target === modalDzuhur) {
            closeModal();
        }
    });

    // Handle Kategori Change (Show/Hide Form Kesalahan & Data Baru)
    function handleKategoriChange() {
        const selectedVal = selectKategori.value;
        if (selectedVal === 'Kesalahan Data Siswa') {
            groupKesalahanData.style.display = 'block';
        } else {
            groupKesalahanData.style.display = 'none';
        }
        updatePreview();
    }

    // Generate WhatsApp Formatted Message
    function buildWAMessage() {
        const nama = inputNama.value.trim();
        const tingkat = selectTingkatKelas ? selectTingkatKelas.value : 'XI';
        const jurusanCode = selectJurusan ? selectJurusan.value : 'PPLG';
        const rombel = inputRombel ? inputRombel.value.trim() : '1';
        const kategori = selectKategori ? selectKategori.value : 'Kartu Hilang';
        const keteranganKesalahan = inputKeteranganKesalahan ? inputKeteranganKesalahan.value.trim() : '';
        const dataBaru = inputDataBaru ? inputDataBaru.value.trim() : '';

        const kelasFull = rombel ? `${tingkat} ${jurusanCode} ${rombel}` : `${tingkat} ${jurusanCode}`;
        const jurusanFull = majorFullNames[jurusanCode] || jurusanCode;

        let msg = `*DATA SISWA KAVIRA SMK*
----------------------------------------
👤 *Nama Lengkap*: ${nama || 'Assyifa Ramadhani'}
🎓 *Kelas*: ${kelasFull}
🛠️ *Jurusan*: ${jurusanFull}
📌 *Kategori Laporan*: ${kategori}`;

        if (kategori === 'Kesalahan Data Siswa') {
            if (keteranganKesalahan) {
                msg += `\n❓ *Keterangan Kesalahan*: ${keteranganKesalahan}`;
            }
            if (dataBaru) {
                msg += `\n✨ *Isi Data Baru (Data Benar)*: ${dataBaru}`;
            }
        }

        msg += `\n🕒 *Jadwal Pengambilan*: Sesudah Dzuhur

⚠️ *PERATURAN & ATURAN PENTING KAVIRA*:
Kami *TIDAK BERTANGGUNG JAWAB UNTUK KEDUA KALINYA* jika kartu hilang atau rusak kembali. Akan dikenakan *DENDA SEBESAR Rp 30.000 (30K)*. Mohon untuk dijaga kartunya dengan cara *DILAMINATING* dan disimpan dengan baik!

----------------------------------------
🌐 _Powered by winessa.online_`;

        return msg;
    }

    // Update Live Preview on Input Change
    function updatePreview() {
        waPreviewText.textContent = buildWAMessage();
    }

    inputNama.addEventListener('input', updatePreview);
    selectTingkatKelas.addEventListener('change', updatePreview);
    selectJurusan.addEventListener('change', updatePreview);
    inputRombel.addEventListener('input', updatePreview);
    selectKategori.addEventListener('change', handleKategoriChange);
    if (inputKeteranganKesalahan) inputKeteranganKesalahan.addEventListener('input', updatePreview);
    if (inputDataBaru) inputDataBaru.addEventListener('input', updatePreview);

    // Set Default Values (Assyifa Ramadhani Example)
    inputNama.value = 'Assyifa Ramadhani';
    selectTingkatKelas.value = 'XI';
    selectJurusan.value = 'PPLG';
    inputRombel.value = '1';
    handleKategoriChange();

    // Submit Handler - Send Directly to Admin 088210222618 via WhatsApp API
    kaviraWAForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = inputNama.value.trim();
        if (!nama) {
            showToast('Harap isi Nama Lengkap Siswa terlebih dahulu!', 'error');
            return;
        }

        const message = buildWAMessage();
        const encodedMessage = encodeURIComponent(message);

        // Direct WhatsApp URL to Admin 6288210222618
        const waUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WA_NUMBER}&text=${encodedMessage}`;

        showToast('Membuka WhatsApp Admin 088210222618...', 'success');
        
        // Open WhatsApp in new tab / app
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 500);
    });

    // Toast Notification Utility
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fa-brands fa-whatsapp"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
