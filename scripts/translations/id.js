const id = {
    translation: {
        'menu': {
            'version': 'Versi {{version}}',
            'landscape': 'Ubah tampilan ke mode landscape untuk pengalaman yang lebih baik!',
            'leaderboard': {
                'title': 'Papan Peringkat',
                'level': 'Level',
                'sort': 'Urutkan',
                'name': 'Nama',
                'time': 'Waktu',
                'steps': 'Langkah',
                'code-blocks': 'Blok',
                'date': 'Tanggal',
                'error': 'Error memuat papan peringkat, coba lagi nanti',
                'empty': 'Papan peringkat kosong, jadilah yang pertama menambahkan skormu!',
            },
            'credits': {
                'title': 'Kredit',
                'designer-programmer': 'Desainer & Programmer Gim',
                'advisors': 'Pembimbing',
                'graphics': 'Grafis',
                'music-sfx': 'Musik & Efek Suara',
            },
            'setting': {
                'title': 'Pengaturan',
                'volume': 'Volume Suara',
                'fullscreen': 'Layar Penuh',
                'language': 'Bahasa',
                'reset': 'Reset Data',
                'install': 'Install',
                'installed': 'Gim Terinstall',
                'reset-confirm': {
                    'title': 'Apa kamu yakin?',
                    'subtitle': 'Semua progress kamu akan hilang.',
                    'yes': 'Reset',
                    'no': 'Batal',
                }
            },
            'update': {
                'title': 'Pembaruan Tersedia',
                'subtitle': 'Muat ulang gim untuk memperbarui.',
                'yes': 'Muat Ulang',
                'no': 'Abaikan',
            },
        },
        'level-select': {
            'title': 'Pilih Level',
        },
        'game': {
            'level': 'Level {{level}}',
            'game-over': {
                'title': 'Hebat!',
                'add-leaderboard': 'Tambahkan ke papan peringkat?',
                'add-leaderboard-success': 'Berhasil ditambahkan',
                'add-leaderboard-no-name': 'Kamu harus memasukkan nama kamu',
                'add-leaderboard-error': 'Gagal menambahkan ke papan peringkat, coba lagi nanti',
                'username-placeholder': 'Nama kamu',
                'target': 'Target: {{value}}',
                'best': 'Terbaik: {{value}}',
            },
            'pause': {
                'title': 'Dijeda',
                'restart': 'Mulai Ulang',
                'select-level': 'Pilih Level',
            },
            'for-pop-up': {
                'title': 'Ulangi sebanyak',
                'subtitle': 'kali',
            },
            'if-pop-up': {
                'title': 'Jika',
            },
            'else-if-pop-up': {
                'title': 'Lain jika',
            },
            'while-pop-up': {
                'title': 'Ulangi selama',
            },
            'error': {
                'else-placement': 'Kamu tidak bisa menaruh Else atau Else If disana',
                'no-ammo': 'GigaBot kehabisan peluru',
                'invalid-condition': 'Kondisi kamu tidak valid',
                'player-died': 'GigaBot rusak',
            },
            'tutorial': {
                'level-1': {
                    '0': 'Bantu GigaBot masuk ke portal!',
                    '1': 'Drag blok kode dari sini...',
                    '2': '...ke area kode ini',
                    '3': 'Klik ini untuk menjalakan kodemu',
                    '4': 'Klik ini lagi untuk mereset',
                    '5': 'Bagus, sekarang ayo coba selesaikan level ini!',
                },
                'level-2': {
                    '0': 'Lihat, ada blok baru!',
                    '1': 'Seret bloknya ke sini untuk melihat gunanya',
                    '2': 'Tanda tanya ini juga bisa diseret ke blok yang ingin kamu lihat gunanya',
                },
                'level-3': {
                    '0': 'Ada batu di depanmu!',
                    '1': 'Kamu tidak bisa melewati petak yang ada batunya',
                },
                'level-4': {
                    '0': 'Portalnya masih belum terbuka!',
                    '1': 'Kamu perlu mengumpulkan permata dengan Blok Ambil Permata untuk membukanya',
                    '2': 'Jumlah permata yang perlu dikumpulkan disimpan di sebuah variabel',
                    '3': 'Kumpulkan permata hingga variabel ini bernilai 0',
                },
                'level-6': {
                    '0': 'Ada semakin banyak GigaBot yang perlu bantuanmu!',
                    '1': 'Kamu harus menyusun kode yang bisa membantu semua GigaBot ini',
                    '2': 'GigaBot akan menjalankan kode secara bergantian',
                    '3': 'Kamu bisa mengklik GigaBot untuk melihat urutan eksekusi, portal tujuannya, dan variabelnya',
                },
                'level-8': {
                    '0': 'Kadang GigaBot perlu melakukan hal yang berbeda tergantung kondisinya',
                    '1': 'Kamu bisa mengecek suatu kondisi dengan Blok If!',
                    '2': 'Cari Blok If dan letakkan di area kode',
                    '3': 'Seret Blok Ekspresi Permata ini...',
                    '4': '...ke area kode ini',
                    '5': 'Klik tombol ini untuk menutup pop up kondisi',
                    '6': 'Kamu bisa membuka kembali pop up kondisi Blok If dengan mengklik ini',
                    '7': 'Sekarang kamu bisa menyusun kode di dalam Blok If yang hanya akan dijalankan jika GigaBot perlu mengumpulkan permata!',
                    '8': 'Kamu bisa mempelajari lagi Blok If dan Ekspresi Permata menggunakan tanda tanya',
                },
                'level-9': {
                    '0': 'Hati-hati! Ada duri yang bisa merusak armor GigaBot',
                    '1': 'Kalau nilai armor Gigabot sampai 0, GigaBot akan rusak',
                    '2': 'Nilai armor GigaBot disimpan ke variabel dan nilainya bisa kamu gunakan untuk blok yang memerlukan kondisi',
                },
                'level-10': {
                    '0': 'Sebuah petak bisa berisikan angka',
                    '1': 'Angka di petak bisa kamu gunakan di kondisi dengan menggunakan Blok Baca',
                    '2': 'Ingat! Kamu bisa mendapat penjelasan blok kode dengan menggunakan tanda tanya',
                },
                'level-11': {
                    '0': 'Selain menggunakan angka dari petak yang sama, kamu juga bisa menggunakan angka di sekeliling GigaBot',
                    '1': 'Gunakan tanda tanya untuk melihat penjelasan Blok Baca yang baru!',
                },
                'level-12': {
                    '0': 'Terkadang GigaBot perlu melakukan aksi lain jika Blok If tidak berjalan',
                    '1': 'Coba gunakan Blok Else untuk melakukan hal itu!',
                },
                'level-14': {
                    '0': 'Gunakan Blok Sama Dengan untuk membandingkan nilai dalam kondisi!',
                },
                'level-15': {
                    '0': 'Selain Blok Sama Dengan, ada banyak blok perbandingan lainnya',
                    '1': 'Pelajari semuanya dengan menggunakan tanda tanya!',
                },
                'level-17': {
                    '0': 'Kamu bisa menyeret layar untuk menggeser kameramu',
                    '1': 'Gunakan Blok Else If jika kamu ingin memeriksa lebih dari 1 kondisi',
                },
                'level-19': {
                    '0': 'Blok For dapat digunakan untuk menjalankan kode yang sama berulang kali',
                    '1': 'Kamu dapat mengatur berapa kali kode dijalankan dengan cara yang sama dengan mengatur kondisi Blok If',
                },
                'level-21': {
                    '0': 'Ada batu lagi didepanmu, tapi warnanya sedikit berbeda',
                    '1': 'Kamu bisa menghancurkan batu itu dengan Blok Tembak!',
                    '2': 'Tapi hati-hati, jumlah peluru GigaBot terbatas',
                    '3': 'Jumlah peluru disimpan di variabel dan bisa kamu gunakan di kondisi', 
                },
                'level-22': {
                    '0': 'Kamu bisa melakukan penjumlahan dan pengurangan di dalam kondisi',
                    '1': 'Perhatikan angka di petak sekeliling GigaBot dan cari tahu bagaimana kamu bisa menggunakannya',
                },
                'level-23': {
                    '0': 'Selain penjumlahan dan pengurangan, kamu juga bisa melakukan perkalian, pembagian, dan modulus',
                    '1': 'Gunakan tanda tanya untuk melihat penjelasan Blok Operator yang ada!',
                },
                'level-24': {
                    '0': 'Kamu bisa mengulangi kode selama kondisi terpenuhi dengan Blok While',
                    '1': 'Kamu bisa mengatur kondisi Blok While dengan cara yang sama dengan mengatur kondisi Blok If',
                },
                'level-25': {
                    '0': 'Ada slime di depanmu!',
                    '1': 'Slime bisa merusak armor GigaBot sama seperti duri',
                    '2': 'Kamu bisa mengalahkan slime dengan menembaknya',
                },
                'level-27': {
                    '0': 'Kamu bisa menggunakan operator logika untuk menggabungkan beberapa kondisi menjadi satu',
                    '1': 'Salah satu operator logika adalah Blok Dan',
                    '2': 'Gunakan Blok Dan untuk memeriksa apakah 2 atau lebih kondisi bernilai benar',
                },
                'level-28': {
                    '0': 'Selain Blok Dan, ada juga Blok Atau dan Blok Tidak',
                    '1': 'Coba pelajari kedua blok itu dengan menggunakan tanda tanya!',
                },
                'level-29': {
                    '0': 'Kali ini ada kelelawar raksasa terbang menghalangi jalanmu!',
                    '1': 'Sama seperti slime, kelelawar raksasa juga bisa merusak armor GigaBot',
                    '2': 'Mereka juga bisa dikalahkan dengan ditembak',
                },
            },
            'blocks': {
                'example-title': "Di JavaScript, blok ini bisa ditulis seperti:",
                'move': {
                    '0': {
                        'title': 'Perintah Maju',
                        'content': 'Blok ini membuat GigaBot berjalan maju.',
                        'example': '',
                    }
                },
                'rotate': {
                    '0': {
                        'title': 'Perintah Berputar Kanan',
                        'content': 'Blok ini memutar GigaBot 90 derajat ke kanan/searah jarum jam.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Perintah Berputar Kiri',
                        'content': 'Blok ini memutar GigaBot 90 derajat ke kiri/melawan arah jarum jam.',
                        'example': '',
                    }
                },
                'takegem': {
                    '0': {
                        'title': 'Perintah Ambil Permata',
                        'content': 'Blok ini membuat GigaBot mengambil permata yang ada di petak yang sama.',
                        'example': '',
                    },
                },
                'shoot': {
                    '0': {
                        'title': 'Perintah Tembak',
                        'content': 'Blok ini membuat GigaBot menembak ke depan, Peluru memiliki jangkauan 5 petak.',
                        'example': '',
                    },
                },
                'if': {
                    '0': {
                        'title': 'Perintah If',
                        'content': 'Blok ini akan menjalankan kode di dalamnya jika kondisi yang diberikan bernilai benar (true). Dalam gim ini, nilai benar adalah nilai selain nol (0).',
                        'example': 'if (kondisi) {\n    kode yang dijalankan\n}',
                    },
                },
                'elseif': {
                    '0': {
                        'title': 'Perintah Else If',
                        'content': 'Blok ini harus diletakkan tepat setelah Blok If atau Else If lain. Blok ini akan menjalankan kode di dalamnya jika kondisi yang diberikan bernilai benar (true) dan Blok If atau Else If yang ada sebelum blok ini tidak dijalankan. Dalam gim ini, nilai benar adalah nilai selain nol (0). Blok ini akan dilewati jika Blok If atau Else If yang ada sebelum blok ini dijalankan.',
                        'example': 'if (kondisi1) {\n    kode yang dijalankan jika kondisi1 benar\n} else if (kondisi2) {\n    kode yang dijalankan jika kondisi2 benar\n} else if (kondisi3) {\n    kode yang dijalankan jika kondisi3 benar\n}',
                    },
                },
                'else': {
                    '0': {
                        'title': 'Perintah Else',
                        'content': 'Blok ini harus diletakkan tepat setelah Blok If atau Else If. Blok ini akan menjalankan kode di dalamnya jika Blok If atau Else If yang ada sebelum blok ini tidak dijalankan. Blok ini akan dilewati jika Blok If atau Else If yang ada sebelum blok ini dijalankan.',
                        'example': 'if (kondisi1) {\n    kode yang dijalankan jika kondisi1 benar\n} else if (kondisi2) {\n    kode yang dijalankan jika kondisi2 benar\n} else {\n    kode yang dijalankan jika kondisi1 dan kondisi2 salah\n}',
                    },
                },
                'for': {
                    '0': {
                        'title': 'Perintah For',
                        'content': 'Blok ini akan menjalankan kode di dalamnya sebanyak nilai yang diberikan. nilai yang diberikan harus lebih besar dari 0.',
                        'example': 'for (let i = 0; i < nilai; i++) {\n    kode yang dijalankan\n}',
                    },
                },
                'while': {
                    '0': {
                        'title': 'Perintah While',
                        'content': 'Blok ini akan menjalankan kode di dalamnya selama kondisi yang diberikan bernilai benar (true). Dalam gim ini, nilai benar adalah nilai selain nol (0).',
                        'example': 'while (kondisi) {\n    kode yang dijalankan\n}',
                    },
                },
                'number': {
                    '0': {
                        'title': 'Ekspresi Angka 0',
                        'content': 'Blok ini akan memberikan angka 0. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Ekspresi Angka 1',
                        'content': 'Blok ini akan memberikan angka 1. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Ekspresi Angka 2',
                        'content': 'Blok ini akan memberikan angka 2. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '3': {
                        'title': 'Ekspresi Angka 3',
                        'content': 'Blok ini akan memberikan angka 3. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '4': {
                        'title': 'Ekspresi Angka 4',
                        'content': 'Blok ini akan memberikan angka 4. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '5': {
                        'title': 'Ekspresi Angka 5',
                        'content': 'Blok ini akan memberikan angka 5. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '6': {
                        'title': 'Ekspresi Angka 6',
                        'content': 'Blok ini akan memberikan angka 6. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '7': {
                        'title': 'Ekspresi Angka 7',
                        'content': 'Blok ini akan memberikan angka 7. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '8': {
                        'title': 'Ekspresi Angka 8',
                        'content': 'Blok ini akan memberikan angka 8. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                    '9': {
                        'title': 'Ekspresi Angka 9',
                        'content': 'Blok ini akan memberikan angka 9. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar.',
                        'example': '',
                    },
                },
                'variable': {
                    '0': {
                        'title': 'Ekspresi Variabel Armor',
                        'content': 'Blok ini akan memberikan nilai armor GigaBot.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Ekspresi Variabel Peluru',
                        'content': 'Blok ini akan memberikan nilai jumlah peluru GigaBot.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Ekspresi Variabel Permata',
                        'content': 'Blok ini akan memberikan nilai jumlah permata yang perlu dikumpulkan GigaBot.',
                        'example': '',
                    },
                },
                'read': {
                    '0': {
                        'title': 'Ekspresi Baca Kiri',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kiri GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Ekspresi Baca Atas',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah atas GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Ekspresi Baca Kanan',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kanan GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '3': {
                        'title': 'Ekspresi Baca Bawah',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah bawah GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '4': {
                        'title': 'Ekspresi Baca Kiri Atas',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kiri atas GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '5': {
                        'title': 'Ekspresi Baca Kanan Atas',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kanan atas GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '6': {
                        'title': 'Ekspresi Baca Kanan Bawah',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kanan bawah GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '7': {
                        'title': 'Ekspresi Baca Kiri Bawah',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak di sebelah kiri bawah GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                    '8': {
                        'title': 'Ekspresi Baca',
                        'content': 'Blok ini akan memberikan nilai yang ada di petak yang ditempati GigaBot. Jika petak itu tidak memiliki angka, blok ini akan memberikan nilai 0.',
                        'example': '',
                    },
                },
                'operator': {
                    '0': {
                        'title': 'Ekspresi Tambah',
                        'content': 'Blok ini akan memberikan hasil dari ekspresi yang ada di sebelah kiri ditambah ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 + ekspresi2',
                    },
                    '1': {
                        'title': 'Ekspresi Kurang',
                        'content': 'Blok ini akan memberikan hasil dari ekspresi yang ada di sebelah kiri dikurangi ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 - ekspresi2',
                    },
                    '2': {
                        'title': 'Ekspresi Kali',
                        'content': 'Blok ini akan memberikan hasil dari ekspresi yang ada di sebelah kiri dikali ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 * ekspresi2',
                    },
                    '3': {
                        'title': 'Ekspresi Bagi',
                        'content': 'Blok ini akan memberikan hasil dari ekspresi yang ada di sebelah kiri dibagi ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 / ekspresi2',
                    },
                    '4': {
                        'title': 'Ekspresi Modulus',
                        'content': 'Blok ini akan memberikan sisa dari ekspresi yang ada di sebelah kiri dibagi ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 % ekspresi2',
                    },
                    '5': {
                        'title': 'Ekspresi Kurung Buka',
                        'content': 'Blok ini akan mengelompokkan ekspresi yang ada di antara ekspresi ini and Ekspresi Kurung Tutup dan mengevaluasi ekspresi tersebut terlebih dahulu.',
                        'example': '(ekspresi)',
                    },
                    '6': {
                        'title': 'Ekspresi Kurung Tutup',
                        'content': 'Blok ini akan mengelompokkan ekspresi yang ada di antara Ekspresi Kurung Buka dan ekspresi ini dan mengevaluasi ekspresi tersebut terlebih dahulu.',
                        'example': '(ekspresi)',
                    },
                    '7': {
                        'title': 'Ekspresi Sama Dengan',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri sama dengan ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 == ekspresi2',
                    },
                    '8': {
                        'title': 'Ekspresi Tidak Sama Dengan',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri tidak sama dengan ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 != ekspresi2',
                    },
                    '9': {
                        'title': 'Ekspresi Lebih Besar',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri lebih besar dari ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 > ekspresi2',
                    },
                    '10': {
                        'title': 'Ekspresi Lebih Besar Sama Dengan',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri lebih besar atau sama dengan ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 >= ekspresi2',
                    },
                    '11': {
                        'title': 'Ekspresi Lebih Kecil',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri lebih kecil dari ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 < ekspresi2',
                    },
                    '12': {
                        'title': 'Ekspresi Lebih Kecil Sama Dengan',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri lebih kecil atau sama dengan ekspresi yang ada di sebelah kanan blok.',
                        'example': 'ekspresi1 <= ekspresi2',
                    },
                    '13': {
                        'title': 'Ekspresi Dan',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri dan ekspresi yang ada di sebelah kanan blok bernilai benar (keduanya bernilai benar).',
                        'example': 'ekspresi1 && ekspresi2',
                    },
                    '14': {
                        'title': 'Ekspresi Atau',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kiri atau ekspresi yang ada di sebelah kanan blok bernilai benar (salah satu bernilai benar).',
                        'example': 'ekspresi1 || ekspresi2',
                    },
                    '15': {
                        'title': 'Ekspresi Tidak',
                        'content': 'Blok ini akan memberikan nilai benar jika ekspresi yang ada di sebelah kanan blok bernilai salah (tidak bernilai benar) dan memberikan nilai salah jika ekspresi yang ada di sebelah kanan blok bernilai benar (tidak bernilai salah).',
                        'example': '!ekspresi',
                    },
                },
            },
        },
    }
};

export default id;
