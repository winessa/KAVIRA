/* ==========================================================================
   KAVIRA SMK - AUTOMATIC WHATSAPP SENDER TO ADMIN 088210222618
   Author: winessa.online
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const inputNama = document.getElementById('inputNama');
    const inputKelas = document.getElementById('inputKelas');
    const inputJurusan = document.getElementById('inputJurusan');
    const inputNoWA = document.getElementById('inputNoWA');
    const waPreviewText = document.getElementById('waPreviewText');
    const kaviraWAForm = document.getElementById('kaviraWAForm');

    // Admin WhatsApp Number: 088210222618 -> 6288210222618
    const ADMIN_WA_NUMBER = '6288210222618';

    // Generate WhatsApp Formatted Message
    function buildWAMessage() {
        const nama = inputNama.value.trim();
        const kelas = inputKelas.value.trim();
        const jurusan = inputJurusan.value.trim();

        return `*DATA SISWA KAVIRA SMK*
----------------------------------------
👤 *Nama Lengkap*: ${nama || 'Assyifa Ramadhani'}
🎓 *Kelas*: ${kelas || 'XI RPL 2'}
🛠️ *Jurusan*: ${jurusan || 'Rekayasa Perangkat Lunak'}

⚠️ *PERATURAN & ATURAN PENTING KAVIRA*:
Kami *TIDAK BERTANGGUNG JAWAB UNTUK KEDUA KALINYA* jika kartu hilang atau rusak kembali. Akan dikenakan *DENDA SEBESAR Rp 30.000 (30K)*. Mohon untuk dijaga kartunya dengan cara *DILAMINATING* dan disimpan dengan baik!

----------------------------------------
🌐 _Powered by winessa.online_`;
    }

    // Update Live Preview on Input Change
    function updatePreview() {
        waPreviewText.textContent = buildWAMessage();
    }

    inputNama.addEventListener('input', updatePreview);
    inputKelas.addEventListener('input', updatePreview);
    inputJurusan.addEventListener('input', updatePreview);

    // Set Default Values (Assyifa Ramadhani Example)
    inputNama.value = 'Assyifa Ramadhani';
    inputKelas.value = 'XI RPL 2';
    inputJurusan.value = 'Rekayasa Perangkat Lunak';
    updatePreview();

    // Submit Handler - Send Directly to Admin 088210222618 via WhatsApp API
    kaviraWAForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = inputNama.value.trim();
        const kelas = inputKelas.value.trim();
        const jurusan = inputJurusan.value.trim();

        if (!nama || !kelas || !jurusan) {
            showToast('Harap lengkapi Nama, Kelas, dan Jurusan terlebih dahulu!', 'error');
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
