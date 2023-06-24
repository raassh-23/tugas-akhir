const id = {
    translation: {
        'menu': {
            'version': 'Versi {{version}}',
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
                'designer-programmer': 'Desainer & Programmer Game',
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
                'installed': 'Game Terinstall',
                'reset-confirm': {
                    'title': 'Apa kamu yakin?',
                    'subtitle': 'Semua progress kamu akan hilang.',
                    'yes': 'Reset',
                    'no': 'Batal',
                }
            },
            'update': {
                'title': 'Pembaruan Tersedia',
                'subtitle': 'Muat ulang game untuk memperbarui.',
                'yes': 'Muat Ulang',
                'no': 'Abaikan',
            },
        },
        'level-select': {
            'title': 'Pilih Level',
        },
        'game': {
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
            'repeat-pop-up': {
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
                'no-ammo': 'Robot kamu kehabisan peluru',
                'invalid-condition': 'Kondisi kamu tidak valid',
                'player-died': 'Robot kamu rusak',
            },
            'tutorial': {
                'level-1': {
                    '0': 'Bantu GigaBot masuk ke portal!',
                    '1': 'Drag blok kode dari sini...',
                    '2': '...ke area kode ini',
                    '3': 'Klik ini untuk menjalakan kodemu',
                    '4': 'Klik ini lagi untuk mereset',
                    '5': 'Bagus, sekarang ayo coba susun blok kodenya!',
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
            },
            'blocks': {
                'example-title': "Di JavaScript, blok ini bisa ditulis seperti:",
                'move': {
                    '0': {
                        'title': 'Perintah Maju',
                        'content': 'Blok ini membuat robotmu maju.',
                        'example': 'moveForward()',
                    }
                },
                'rotate': {
                    '0': {
                        'title': 'Perintah Berputar',
                        'content': 'Blok ini memutar robotmu 90 derajat searah jarum jam.',
                        'example': 'rotateClockwise()',
                    },
                    '1': {
                        'title': 'Perintah Berputar',
                        'content': 'Blok ini memutar robotmu 90 derajat melawan arah jarum jam.',
                        'example': 'rotateAntiClockwise()',
                    }
                },
                'takegem': {
                    '0': {
                        'title': 'Perintah Ambil Permata',
                        'content': 'Blok ini membuat robotmu mengambil permata yang ada di petak yang sama.',
                        'example': 'collectGem()',
                    },
                },
                'number': {
                    '0': {
                        'title': 'Ekspresi Angka',
                        'content': 'Blok ini akan memberikan angka 0. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar',
                        'example': '0',
                    },
                    '1': {
                        'title': 'Ekspresi Angka',
                        'content': 'Blok ini akan memberikan angka 1. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar',
                        'example': '1',
                    },
                    '2': {
                        'title': 'Ekspresi Angka',
                        'content': 'Blok ini akan memberikan angka 2. Blok ini dapat digabungkan dengan ekspresi angka lain untuk membuat angka yang lebih besar',
                        'example': '2',
                    },
                },
            },
        },
    }
};

export default id;
