import os
import sys
import subprocess

def get_ffmpeg_exe():
    """Mendapatkan path executable FFmpeg."""
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        return "ffmpeg"
    except Exception:
        pass

    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        print("[+] Menginstall modul imageio-ffmpeg...")
        subprocess.run([sys.executable, "-m", "pip", "install", "imageio-ffmpeg"], check=True)
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()

def compress_video(ffmpeg_exe, input_path, output_path):
    """Kompresi video pakai H.265 (HEVC) - ukuran lebih kecil, kualitas visual setara."""
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", input_path,
        "-vf", "scale='min(720,iw)':-2",
        "-c:v", "libx265",
        "-crf", "28",
        "-preset", "medium",
        "-tag:v", "hvc1",   # penting agar kompatibel diputar di Safari/iOS
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        output_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir = os.path.join(base_dir, "public", "video")
    out_dir = os.path.join(base_dir, "public", "video_compressed")

    if not os.path.exists(raw_dir):
        print(f"[-] Folder {raw_dir} tidak ditemukan.")
        return

    os.makedirs(out_dir, exist_ok=True)
    ffmpeg_exe = get_ffmpeg_exe()
    print(f"[*] Memulai kompresi video menggunakan: {ffmpeg_exe}\n")

    files = [f for f in os.listdir(raw_dir) if f.lower().endswith(('.mp4', '.mov', '.mkv', '.avi'))]
    if not files:
        print("[-] Tidak ada file video ditemukan di public/video.")
        return

    print(f"[*] Ditemukan {len(files)} file video di public/video...\n")

    total_old = 0
    total_new = 0

    for idx, f in enumerate(files, 1):
        input_path = os.path.join(raw_dir, f)
        output_path = os.path.join(out_dir, f)

        old_size = os.path.getsize(input_path) / (1024 * 1024)
        total_old += old_size

        print(f"[{idx}/{len(files)}] Memproses {f} ({old_size:.2f} MB)... ", end="", flush=True)

        try:
            compress_video(ffmpeg_exe, input_path, output_path)
            new_size = os.path.getsize(output_path) / (1024 * 1024)
            total_new += new_size
            hemat_pct = ((old_size - new_size) / old_size) * 100
            print(f"[OK] Selesai! -> {new_size:.2f} MB (Hemat {hemat_pct:.1f}%)")
        except Exception as e:
            print(f"[FAIL] Gagal: {e}")

    print("\n" + "="*50)
    print("HASIL KOMPRESI TOTAL:")
    print(f"Ukuran Sebelum : {total_old:.2f} MB")
    print(f"Ukuran Sesudah : {total_new:.2f} MB")
    if total_old > 0:
        print(f"Total Penghematan : {total_old - total_new:.2f} MB ({((total_old - total_new) / total_old) * 100:.1f}%)")
    print(f"File kompresi tersimpan di: public/video_compressed/")
    print("="*50)

if __name__ == "__main__":
    main()
