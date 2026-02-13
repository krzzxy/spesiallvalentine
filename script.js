const CONFIG = {
    mainQuestion: "Will you be my Valentine?",
    subQuestion: "Please say yes ",
    yesButton: "YES",
    noButton: "NO",
    noEscapeTexts: ["Eits, ga bisa😝", "Hehe, coba lagi 😜", "Yaudah deh, aku anggap YES ya!"],
    confirmTitle: "Yeyy! Kamu Beneran Mau :>",
    confirmText: "Mulai dari sekarang kamu resmi jadi…",
    badgeText: "My Valentine",
    nextButton: "Lanjut ",
    repeatButton: "Ulangi pertanyaan",
    flowerTitle: "Ini kado spesial buat kamu ",
    takeBouquetButton: "Terima hadiahnya ",
    bouquetMessage: "Yeyy! Udah jadi milik kamu <3",
    nextFlowerButton: "Next ",
    collageTitle: "Our First Chat:3",
    nextCollageButton: "Satu halaman lagi… ",
    finalTitle: "Happy Valentine, SAYANGKUUU",
    finalMessage: ` Sebenernya aku setiap hari juga sayang kamu tanpa adanya hari valentine ko mwehehe:3
    terimakasi yaa suda dateng di kehidupanku, terimakasi untuk hal hal baik yg suda kamu usahakan,
    pokonyaa terimakasi for everything yaa sayanggkuu 
    LOVEE U MOREE🤍🤍🤍`,
    restartButton: "Restart ",
    copyButton: "Copy Message ",
    copySuccess: "Pesan berhasil dicopy! "
};

const state = { currentPage: 1, hasClickedYes: false, noClickCount: 0, bouquetTaken: false, musicPlaying: false, photos: [null, null, null, null] };

const elements = {
    pages: document.querySelectorAll('.page'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    noEscapeText: document.getElementById('noEscapeText'),
    nextToPage3: document.getElementById('nextToPage3'),
    backToPage1: document.getElementById('backToPage1'),
    bouquet: document.getElementById('bouquet'),
    takeBouquet: document.getElementById('takeBouquet'),
    nextToPage4: document.getElementById('nextToPage4'),
    bouquetMessage: document.getElementById('bouquetMessage'),
    petalsContainer: document.getElementById('petalsContainer'),

    nextToPage5: document.getElementById('nextToPage5'),
    restartBtn: document.getElementById('restartBtn'),
    copyBtn: document.getElementById('copyBtn'),
    copyNotif: document.getElementById('copyNotif'),
    confettiContainer: document.getElementById('confettiContainer'),
    musicBtn: document.getElementById('musicBtn'),
    bgMusic: document.getElementById('bgMusic'),
    heartCanvas: document.getElementById('heartCanvas'),
    sparkleContainer: document.getElementById('sparkleContainer'),
    envelopeWrapper: document.getElementById('envelopeWrapper'),
    envelope: document.getElementById('envelope'),
    finalMessage.textContent = 
`Sebenernya aku setiap hari juga sayang kamu tanpa adanya hari valentine ko mwehehe:3
terimakasi yaa suda dateng di kehidupanku, terimakasi untuk hal hal baik yg suda kamu usahakan,
pokoknya terimakasi for everything yaa sayangku
LOVEE U MOREE`;
    finalContent: document.getElementById('finalContent')
};

function createSparkles() {
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        elements.sparkleContainer.appendChild(sparkle);
    }
}

function navigateTo(pageNumber) {
    const currentPageEl = document.getElementById(`page${state.currentPage}`);
    const nextPageEl = document.getElementById(`page${pageNumber}`);
    if (!currentPageEl || !nextPageEl) return;

    currentPageEl.classList.add('fade-out');
    currentPageEl.classList.remove('active');

    setTimeout(() => {
        currentPageEl.classList.remove('fade-out');
        nextPageEl.classList.add('active');
        state.currentPage = pageNumber;
        if (pageNumber === 5) resetEnvelope();
        if (pageNumber === 3) startFallingPetals();
    }, 400);
}

function handleYesClick() {
    state.hasClickedYes = true;
    navigateTo(2);
}

function handleNoClick() {
    state.noClickCount++;
    const noBtn = elements.noBtn;

    noBtn.classList.add('shake');
    setTimeout(() => noBtn.classList.remove('shake'), 500);

    if (state.noClickCount <= 2) {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[state.noClickCount - 1];
        elements.noEscapeText.classList.remove('hidden');
    } else {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[2];
        elements.noEscapeText.classList.remove('hidden');
        setTimeout(() => { state.hasClickedYes = true; navigateTo(2); }, 1500);
    }
}

function handleTakeBouquet() {
    if (state.bouquetTaken) return;
    state.bouquetTaken = true;
    elements.bouquet.classList.add('bounce');
    setTimeout(() => {
        elements.bouquet.classList.remove('bounce');
        elements.bouquetMessage.classList.remove('hidden');
        elements.takeBouquet.classList.add('hidden');
        elements.nextToPage4.classList.remove('hidden');
    }, 800);
}

let petalInterval;
function startFallingPetals() {
    elements.petalsContainer.innerHTML = '';
    for (let i = 0; i < 15; i++) setTimeout(() => createPetal(), i * 200);
    if (petalInterval) clearInterval(petalInterval);
    petalInterval = setInterval(() => { if (state.currentPage === 3) createPetal(); }, 600);
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#fbcfe8'];
    petal.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 4 + 5) + 's';
    petal.style.width = (Math.random() * 18 + 12) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = Math.random() * 0.4 + 0.4;
    elements.petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
}

function handlePhotoUpload(index, event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        state.photos[index] = e.target.result;
        elements.photoPreviews[index].src = e.target.result;
        elements.photoPreviews[index].classList.remove('hidden');
        elements.photoLabels[index].style.opacity = '0';
    };
    reader.readAsDataURL(file);
}

function resetEnvelope() {
    elements.envelopeWrapper.classList.remove('hidden', 'fade-out');
    elements.envelope.classList.remove('opened', 'letter-exit');
    elements.finalContent.classList.add('hidden');
    elements.finalContent.classList.remove('reveal');
    const hint = document.getElementById('envelopeHint');
    if (hint) hint.classList.remove('fade');
}

function handleEnvelopeClick() {
    if (elements.envelope.classList.contains('opened')) return;

    const hint = document.getElementById('envelopeHint');

    elements.envelope.classList.add('opened');
    if (hint) hint.classList.add('fade');

    setTimeout(() => {
        elements.envelope.classList.add('letter-exit');
    }, 600);

    setTimeout(() => {
        elements.envelopeWrapper.classList.add('fade-out');
    }, 1200);

    setTimeout(() => {
        elements.envelopeWrapper.classList.add('hidden');
        elements.finalContent.classList.remove('hidden');
        elements.finalContent.classList.add('reveal');
        triggerConfetti();
    }, 1700);
}

function handleCopyMessage() {
    navigator.clipboard.writeText(CONFIG.finalMessage).then(() => {
        elements.copyNotif.classList.remove('hidden');
        setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = CONFIG.finalMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        elements.copyNotif.classList.remove('hidden');
        setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
    });
}

function handleRestart() {
    state.hasClickedYes = false;
    state.noClickCount = 0;
    state.bouquetTaken = false;
    elements.noBtn.classList.remove('escaping');
    elements.noBtn.style.left = '';
    elements.noBtn.style.top = '';
    elements.noEscapeText.classList.add('hidden');
    elements.bouquetMessage.classList.add('hidden');
    elements.takeBouquet.classList.remove('hidden');
    elements.nextToPage4.classList.add('hidden');
    elements.confettiContainer.innerHTML = '';
    navigateTo(1);
}

class HeartParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + 50;
        this.size = Math.random() * 18 + 10;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        const colors = ['rgba(244,114,182,', 'rgba(236,72,153,', 'rgba(251,113,133,', 'rgba(249,168,212,', 'rgba(232,121,249,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
        this.rotation += this.rotationSpeed;
        if (this.y < -50) this.reset();
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.fillStyle = this.color + this.opacity + ')';
        const s = this.size;
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(s / 2, -s / 2, s, s / 4, 0, s);
        ctx.bezierCurveTo(-s, s / 4, -s / 2, -s / 2, 0, s / 4);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = elements.heartCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 35;
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const p = new HeartParticle(this.canvas);
            p.y = Math.random() * this.canvas.height;
            this.particles.push(p);
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => { p.update(); p.draw(this.ctx); });
        requestAnimationFrame(() => this.animate());
    }
}

function applyConfig() {
    document.getElementById('mainQuestion').textContent = CONFIG.mainQuestion;
    document.getElementById('subQuestion').textContent = CONFIG.subQuestion;
    elements.yesBtn.querySelector('.btn-text').textContent = CONFIG.yesButton;
    elements.noBtn.querySelector('.btn-text').textContent = CONFIG.noButton;
    document.getElementById('confirmTitle').textContent = CONFIG.confirmTitle;
    document.getElementById('confirmText').textContent = CONFIG.confirmText;
    document.querySelector('.badge-text').textContent = CONFIG.badgeText;
    elements.nextToPage3.querySelector('.btn-text').textContent = CONFIG.nextButton;
    elements.backToPage1.textContent = CONFIG.repeatButton;
    document.getElementById('flowerTitle').textContent = CONFIG.flowerTitle;
    elements.takeBouquet.querySelector('.btn-text').textContent = CONFIG.takeBouquetButton;
    elements.bouquetMessage.textContent = CONFIG.bouquetMessage;
    elements.nextToPage4.querySelector('.btn-text').textContent = CONFIG.nextFlowerButton;
    document.getElementById('collageTitle').textContent = CONFIG.collageTitle;
    elements.nextToPage5.querySelector('.btn-text').textContent = CONFIG.nextCollageButton;
    document.getElementById('finalTitle').textContent = CONFIG.finalTitle;
    document.getElementById('finalMessage').textContent = CONFIG.finalMessage;
    elements.restartBtn.querySelector('.btn-text').textContent = CONFIG.restartButton;
    elements.copyBtn.querySelector('.btn-text').textContent = CONFIG.copyButton;
    elements.copyNotif.textContent = CONFIG.copySuccess;
}

function initEventListeners() {
    elements.yesBtn.addEventListener('click', handleYesClick);
    elements.noBtn.addEventListener('click', handleNoClick);
    elements.nextToPage3.addEventListener('click', () => navigateTo(3));
    elements.backToPage1.addEventListener('click', () => navigateTo(1));
    elements.takeBouquet.addEventListener('click', handleTakeBouquet);
    elements.nextToPage4.addEventListener('click', () => navigateTo(4));

    elements.nextToPage5.addEventListener('click', () => navigateTo(5));
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.copyBtn.addEventListener('click', handleCopyMessage);
    if (elements.musicBtn) elements.musicBtn.addEventListener('click', toggleMusic);
    if (elements.envelopeWrapper) elements.envelopeWrapper.addEventListener('click', handleEnvelopeClick);
}

function initMouseTrail() {
    const hearts = ['💕', '💗', '💖', '💓', '🩷', '✨'];
    let lastTime = 0;
    const throttleMs = 50;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleMs) return;
        lastTime = now;

        const heart = document.createElement('span');
        heart.className = 'cursor-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        heart.style.fontSize = (Math.random() * 12 + 10) + 'px';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    });
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    console.log("CLICK");
    if (!music) return;
       
    music.muted = true;
    music.play().catch(()=>{});

    const startAudio =() => {
        music.muted = false;
        music.play().catch(()=>{});
        window.removeEventListener("click, startAudio")
        window.removeEventListener("touchstart, startAudio");
    };

    window.removeEventListener("click, startAudio")
    window.removeEventListener("touchstart, startAudio");
    
}
document.addEventListener("DOMContentLoaded", () =>{
    setupMusic();
});
    applyConfig();
    initEventListeners();
    createSparkles();
    new ParticleSystem();
    initMouseTrail();
    setupMusic(); //

    console.log("CLICK DETECTED");
