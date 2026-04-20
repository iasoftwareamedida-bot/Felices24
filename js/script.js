class StorageManager {
    constructor() {
        this.dbName = 'HeartGalleryDB';
        this.dbVersion = 3; // Keep version 3 to ensure the audio fix is active
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('photos')) {
                    db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
                }
                if (db.objectStoreNames.contains('audio')) {
                    db.deleteObjectStore('audio');
                }
                db.createObjectStore('audio', { keyPath: 'id', autoIncrement: true });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };

            request.onerror = (event) => reject('IndexedDB Error: ' + event.target.errorCode);
        });
    }

    async savePhoto(blob) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['photos'], 'readwrite');
            const store = transaction.objectStore('photos');
            const request = store.add({ blob, timestamp: Date.now() });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getPhotos() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['photos'], 'readonly');
            const store = transaction.objectStore('photos');
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deletePhoto(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['photos'], 'readwrite');
            const store = transaction.objectStore('photos');
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async saveAudio(blob, name) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['audio'], 'readwrite');
            const store = transaction.objectStore('audio');
            const request = store.add({ blob, name, timestamp: Date.now() });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getAudios() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['audio'], 'readonly');
            const store = transaction.objectStore('audio');
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteAudio(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['audio'], 'readwrite');
            const store = transaction.objectStore('audio');
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.symbols = ['❤️', '💖', '🌸', '🌹', '✨', '🌻', '💕', '🌷'];
        this.maxParticles = 50;
    }

    start() {
        setInterval(() => {
            if (this.container.children.length < this.maxParticles) {
                this.createParticle();
            }
        }, 500);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        particle.style.fontSize = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        this.container.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
}

// App Logic
const storage = new StorageManager();
const particleSystem = new ParticleSystem(document.getElementById('animation-container'));

// Elements
const photoUpload = document.getElementById('photo-upload');
const musicUpload = document.getElementById('music-upload');
const galleryGrid = document.getElementById('photo-gallery');
const emptyState = document.getElementById('empty-state');
const bgAudio = document.getElementById('bg-audio');
const playPauseBtn = document.getElementById('play-pause');
const stopMusicBtn = document.getElementById('stop-music');
const audioPanel = document.getElementById('audio-panel');
const songNameLabel = document.getElementById('song-name');

// Music Modal Elements
const musicModal = document.getElementById('music-modal');
const btnManageMusic = document.getElementById('btn-manage-music');
const musicListContainer = document.getElementById('music-list');
const closeMusicModal = document.getElementById('close-music-modal');
const musicCountLabel = document.getElementById('music-count');

// Rose & Poem Elements
const btnRevealRose = document.getElementById('btn-reveal-rose');
const roseDrawing = document.getElementById('rose-drawing');
const poemText = document.getElementById('poem-text');
const rosePath = document.getElementById('rose-path');
const leafPaths = document.querySelectorAll('.leaf');

const shortPoems = [
    "Eres la pausa que mi corazón necesitaba entre tanto ruido.",
    "En mi silencio siempre estás tú, siendo la palabra más hermosa que nunca me atrevo a decir.",
    "Quererte es mi única verdad, y perderme en tus ojos, mi forma favorita de encontrarme.",
    "No soy de muchas palabras, pero contigo sobran los silencios porque nuestras almas ya se entienden.",
    "Eres el verso que nunca supe escribir, pero que siempre supe sentir.",
    "Te amo no por lo que eres, sino por lo que soy cuando estoy contigo.",
    "Eres mi paz, mi caos y mi certeza más absoluta.",
    "Si el mundo se acaba hoy, que me encuentre sosteniendo tu mano.",
    "Eres el paraíso que no sabía que estaba buscando."
];

// Interactive Elements logic
const photoModal = document.getElementById('photo-modal');
const modalText = document.getElementById('modal-text');
const modalDrawing = document.getElementById('modal-drawing-container');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

const lovePhrases = [
    "Eres mi sueño hecho realidad ❤️",
    "Cada segundo a tu lado es un tesoro ✨",
    "Gracias por hacerme el hombre más feliz 🌸",
    "Tu sonrisa es mi parte favorita del día 😊",
    "Eres mi princesa de cuento de hadas 👑",
    "24 años iluminando el mundo con tu luz 🎉",
    "Te amo más de lo que las palabras pueden decir 💕",
    "A tu lado, la vida es un viaje mágico 🏰",
    "Eres el amor de mi vida, hoy y siempre 🌹",
    "Gracias por ser mi paz en la tormenta 🌊",
    "No hay lugar donde prefiera estar que a tu lado 🏠",
    "Eres la casualidad más bonita de mi vida 🍀",
    "Cada aventura es mejor si es contigo ⛰️",
    "Tu amor es mi mayor bendición 🙏",
    "Amo todo de ti, hasta el más pequeño detalle 💖",
    "Eres la reina de mi corazón 👑",
    "Nuestro amor es para siempre Infinity ♾️",
    "Eres mi sol en los días nublados ☀️",
    "No imagino un futuro sin ti 🌌",
    "Gracias por elegirme cada día 🤝"
];

let isEditMode = false;

const fineLineDrawings = [
    // Butterfly
    '<svg viewBox="0 0 100 100" class="rose-svg"><path class="animate-draw" fill="none" stroke="#ff4d6d" stroke-width="0.5" d="M50,50 C20,10 10,40 50,50 C90,40 80,10 50,50 C20,90 10,60 50,50 C90,60 80,90 50,50" /></svg>',
    // Mickey (Disney style)
    '<svg viewBox="0 0 100 100" class="rose-svg"><circle class="animate-draw" cx="50" cy="50" r="20" fill="none" stroke="#ff4d6d" stroke-width="0.5"/><circle class="animate-draw" cx="30" cy="30" r="10" fill="none" stroke="#ff4d6d" stroke-width="0.5"/><circle class="animate-draw" cx="70" cy="30" r="10" fill="none" stroke="#ff4d6d" stroke-width="0.5"/></svg>',
    // Crown
    '<svg viewBox="0 0 100 100" class="rose-svg"><path class="animate-draw" fill="none" stroke="#ff4d6d" stroke-width="0.5" d="M20,70 L20,40 L35,55 L50,30 L65,55 L80,40 L80,70 Z" /></svg>',
    // Flower
    '<svg viewBox="0 0 100 100" class="rose-svg"><path class="animate-draw" fill="none" stroke="#ff4d6d" stroke-width="0.5" d="M50,50 Q60,30 50,10 Q40,30 50,50 Q70,60 90,50 Q70,40 50,50 Q40,70 50,90 Q60,70 50,50 Q30,40 10,50 Q30,60 50,50" /></svg>'
];

async function init() {
    try {
        console.log("Iniciando aplicación...");
        await storage.init();
        particleSystem.start();
        loadGallery();
        loadSavedMusic();
        initScrollAnimations();

        // Event Listeners
        if (photoUpload) photoUpload.addEventListener('change', handlePhotoUpload);
        if (musicUpload) musicUpload.addEventListener('change', handleMusicUpload);
        if (playPauseBtn) playPauseBtn.addEventListener('click', toggleMusic);
        if (stopMusicBtn) stopMusicBtn.addEventListener('click', stopMusic);
        if (btnRevealRose) btnRevealRose.addEventListener('click', revealRoseAndPoem);
        
        if (closeModal) closeModal.addEventListener('click', () => {
            photoModal.classList.add('hidden');
        });
        
        // Close modal when clicking overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                photoModal.classList.add('hidden');
                musicModal.classList.add('hidden');
            });
        });
        
        if (btnManageMusic) btnManageMusic.addEventListener('click', () => {
            musicModal.classList.remove('hidden');
            loadMusicList();
        });
        
        if (closeMusicModal) closeMusicModal.addEventListener('click', () => {
            musicModal.classList.add('hidden');
        });

        const toggleEditBtn = document.getElementById('toggle-edit');
        if (toggleEditBtn) {
            toggleEditBtn.addEventListener('click', () => {
                isEditMode = !isEditMode;
                document.body.classList.toggle('edit-active', isEditMode);
                toggleEditBtn.innerText = isEditMode ? "Modo Edición: ON" : "Modo Edición: OFF";
                toggleEditBtn.style.background = isEditMode ? "#ff4d6d" : "";
                toggleEditBtn.style.color = isEditMode ? "white" : "";
            });
        }
    } catch (err) {
        console.error("Error durante el inicio:", err);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe gallery cards and special sections
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    
    // We also need to observe dynamically added gallery cards
    const galleryObserver = new MutationObserver(() => {
        document.querySelectorAll('.photo-card').forEach(card => observer.observe(card));
    });
    galleryObserver.observe(galleryGrid, { childList: true });
}

function revealRoseAndPoem() {
    // Reset and trigger SVG animations again
    const paths = roseDrawing.querySelectorAll('path, circle');
    paths.forEach(path => {
        path.classList.remove('animate-draw');
        void path.offsetWidth; // Force reflow to restart animation
        path.classList.add('animate-draw');
    });

    roseDrawing.classList.remove('hidden');
    poemText.classList.remove('hidden');
    
    const content = poemText.querySelector('.poem-content');
    const randomPoem = shortPoems[Math.floor(Math.random() * shortPoems.length)];
    
    // Typing effect logic
    let i = 0;
    content.textContent = '';
    
    // Change button text
    btnRevealRose.innerText = "Siguiente sorpresa ✨";

    setTimeout(() => {
        const typingInterval = setInterval(() => {
            content.textContent += randomPoem[i];
            i++;
            if (i >= randomPoem.length) clearInterval(typingInterval);
        }, 50);
    }, 2000); 
}

async function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    for (const file of files) {
        const optimizedBlob = await optimizeImage(file);
        await storage.savePhoto(optimizedBlob);
    }
    loadGallery();
}

async function optimizeImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 1200;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function loadGallery() {
    const photos = await storage.getPhotos();
    galleryGrid.innerHTML = '';
    
    if (photos.length === 0) {
        galleryGrid.appendChild(emptyState);
        return;
    }

    photos.reverse().forEach((photo, index) => {
        const url = URL.createObjectURL(photo.blob);
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <img src="${url}" alt="Gallery Photo">
            <div class="photo-overlay">
                <button class="btn-delete" onclick="event.stopPropagation(); deletePhoto(${photo.id})">×</button>
            </div>
        `;
        card.addEventListener('click', () => {
            if (!isEditMode) {
                openInteractivePhoto(url, index);
            }
        });
        galleryGrid.appendChild(card);
    });
}

function openInteractivePhoto(imgUrl, photoIndex) {
    // Reset modal content
    modalImg.src = imgUrl;
    modalText.innerText = '';
    modalDrawing.innerHTML = '';
    
    photoModal.classList.remove('hidden');

    // Start Drawing logic
    const randomDrawing = fineLineDrawings[Math.floor(Math.random() * fineLineDrawings.length)];
    modalDrawing.innerHTML = randomDrawing;
    
    // Reveal message with typing effect
    setTimeout(() => {
        const phrase = lovePhrases[photoIndex % lovePhrases.length];
        typeModalText(phrase);
    }, 2500); // Reduced delay for better feel
}

function typeModalText(text) {
    let i = 0;
    modalText.textContent = '';
    const interval = setInterval(() => {
        modalText.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 40);
}

window.deletePhoto = async (id) => {
    if (confirm('¿Quieres eliminar esta foto de tu rincón mágico?')) {
        await storage.deletePhoto(id);
        loadGallery();
    }
};

async function handleMusicUpload(e) {
    const files = Array.from(e.target.files);
    console.log(`Intentando subir ${files.length} archivos de audio...`);
    for (const file of files) {
        try {
            await storage.saveAudio(file, file.name);
            console.log(`Subido: ${file.name}`);
        } catch (err) {
            console.error(`Error al subir ${file.name}:`, err);
        }
    }
    loadSavedMusic();
    loadMusicList();
}

async function loadSavedMusic() {
    try {
        const audios = await storage.getAudios();
        musicCountLabel.innerText = `Gestionar Música (${audios.length})`;
    } catch (err) {
        console.error("Error al cargar contador de música:", err);
    }
}

async function loadMusicList() {
    try {
        const audios = await storage.getAudios();
        musicListContainer.innerHTML = '';
        
        if (audios.length === 0) {
            musicListContainer.innerHTML = '<p style="text-align:center; opacity:0.5;">No hay canciones.</p>';
            return;
        }

        audios.forEach(track => {
            const item = document.createElement('div');
            item.className = 'music-item';
            item.innerHTML = `
                <div class="music-info">
                    <span class="music-name">${track.name}</span>
                </div>
                <div class="music-actions">
                    <button class="btn-sm btn-primary" onclick="playTrack(${track.id})">▶️</button>
                    <button class="btn-sm" onclick="removeTrack(${track.id})">🗑️</button>
                </div>
            `;
            musicListContainer.appendChild(item);
        });
    } catch (err) {
        console.error("Error al cargar lista de música:", err);
    }
}

window.playTrack = async (id) => {
    try {
        const audios = await storage.getAudios();
        const track = audios.find(t => t.id === id);
        if (track) {
            console.log(`Reproduciendo: ${track.name}`);
            const url = URL.createObjectURL(track.blob);
            bgAudio.src = url;
            bgAudio.load();
            bgAudio.play().then(() => {
                playPauseBtn.innerText = '⏸️';
                audioPanel.classList.remove('hidden');
                songNameLabel.innerText = track.name;
                musicModal.classList.add('hidden');
            }).catch(e => console.error("Error al reproducir audio:", e));
        }
    } catch (err) {
        console.error("Error en playTrack:", err);
    }
};

window.removeTrack = async (id) => {
    if (confirm('¿Eliminar esta canción?')) {
        await storage.deleteAudio(id);
        loadSavedMusic();
        loadMusicList();
    }
};

function toggleMusic() {
    if (bgAudio.paused) {
        bgAudio.play();
        playPauseBtn.innerText = '⏸️';
    } else {
        bgAudio.pause();
        playPauseBtn.innerText = '▶️';
    }
}

function stopMusic() {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    playPauseBtn.innerText = '▶️';
}

init();
