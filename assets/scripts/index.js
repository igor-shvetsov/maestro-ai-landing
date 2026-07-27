document.addEventListener('DOMContentLoaded', function () {
    // Настройки наблюдателя
    const options = {
        root: null, // viewport браузера
        rootMargin: '50px 0px', // отступ в 50px до того, как элемент появится
        threshold: 0.01 // сработает, когда появится хотя бы 1% элемента
    };

    // Создаем наблюдатель
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            // Проверяем, пересекается ли элемент с viewport
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                // Если есть data-src, загружаем изображение
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src'); // Удаляем атрибут, чтобы не загружать повторно

                    // Опционально: добавляем класс для анимации появления
                    img.classList.add('loaded');
                }

                // Прекращаем наблюдение за этим элементом
                observer.unobserve(img);
            }
        });
    }, options);

    // Находим все изображения с data-src и начинаем за ними следить
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function (img) {
        observer.observe(img);
    });

    // Инициализация Fancybox для всех изображений
    Fancybox.bind('[data-fancybox]', {
        // Основные настройки
        closeButton: false,
        arrows: true,
        loop: true,
        keyboard: true,
        dragToClose: true,

        // Настройки отображения
        Toolbar: {
            display: {
                left: [],
                right: ['close']
            }
        },

        // Кнопки управления
        Carousel: {
            infinite: true
        },

        // Подписи
        caption: function (fancybox, slide) {
            return slide.caption || slide.$trigger?.getAttribute('data-caption') || '';
        }
    });
});

// тень шапки
const header = document.getElementById('stickyHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky-shadow', window.scrollY > 20);
});

// плавный скролл к секции видео
const videoBtn = document.getElementById('videoBtn');
const videoSection = document.getElementById('videoSection');
if (videoBtn && videoSection) {
    videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
}

// обсервер анимаций
const animatedItems = document.querySelectorAll('.fade-up-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.2, rootMargin: "0px 0px 500px 0px"});
animatedItems.forEach(item => observer.observe(item));

// ---- ГЕНЕРАЦИЯ 8 ПЕРСОНАЖЕЙ (4 женских + 4 мужских) с picture вместо текста ----
const charactersData = [
    {gender: "female", voice: "Нежный", color: "#ff9eb5"},
    {gender: "female", voice: "Энергичный", color: "#ffb77c"},
    {gender: "female", voice: "Мягкий", color: "#b8a9ff"},
    {gender: "female", voice: "Вдохновляющий", color: "#7dd3fc"},
    {gender: "male", voice: "Уверенный", color: "#6b8cff"},
    {gender: "male", voice: "Дружелюбный", color: "#5ee0a0"},
    {gender: "male", voice: "Спокойный", color: "#9ca3af"},
    {gender: "male", voice: "Харизматичный", color: "#f472b6"}
];

const charactersGrid = document.getElementById('charactersGrid');
if (charactersGrid) {
    charactersData.forEach((char, idx) => {
        const card = document.createElement('div');
        card.className = 'character-card fade-up-item';
        card.style.transitionDelay = `${idx * 0.03}s`;

        const index = idx + 1;
        const subFolder = char.gender === 'female' ? 'female' : 'male';
        const avatarSrc = `./images/ai-agents/${subFolder}/${index}.jpg`;

        card.innerHTML = `
                <div class="character-avatar">
                    <div class="avatar-placeholder">
                        <picture>
                            <img data-src="${avatarSrc}" alt="AI персонаж" loading="lazy" decoding="async">
                        </picture>
                    </div>
                </div>
                <button class="btn-small create-char-btn" data-gender="${char.gender}" data-voice="${char.voice}">Выбрать персонажа</button>
            `;
        charactersGrid.appendChild(card);
        observer.observe(card);
    });

    // document.querySelectorAll('.create-char-btn').forEach(btn => {
    //     btn.addEventListener('click', (e) => {
    //         e.stopPropagation();
    //         const gender = btn.getAttribute('data-gender');
    //         const voiceType = btn.getAttribute('data-voice');
    //         const name = prompt(`Создай своего AI-персонажа!\nВыбран ${gender === 'female' ? 'женский' : 'мужской'} голос (${voiceType}).\nПридумай имя для персонажа:`, 'Мой ассистент');
    //         if (name && name.trim()) {
    //             alert(`✨ Поздравляем! Персонаж "${name.trim()}" с ${voiceType} голосом создан! Теперь он ждёт тебя в MaestroAI.`);
    //         } else if (name === "") {
    //             alert('Имя не может быть пустым. Попробуй ещё раз.');
    //         }
    //     });
    // });
}

// ---- ВИДЕО ДАННЫЕ И ГЕНЕРАЦИЯ ----
const videoData = [
    {
        title: "Video Shorts / Игры - часть 1",
        desc: "Просмотр игровых Video shorts.",
        badge: "Новинка",
        youtubeId: "dQw4w9WgXcQ",
        vk: {
            url: "https://vkvideo.ru/video_ext.php?oid=-235183125&id=456239040&hash=7ee29d83de4c0116&hd=3",
        },
        background: '/images/videos/1-mini.jpg',
    },
    {
        title: "Управление мониторами",
        desc: "Как включить или выключить мониторы",
        badge: "Популярное",
        youtubeId: "dQw4w9WgXcQ",
        vk: {
            url: "https://vkvideo.ru/video_ext.php?oid=-235183125&id=456239029&hash=47674539034a071b&hd=3",
        },
        background: '/images/videos/2-mini.jpg',
    },
    {
        title: "Установка на Linux",
        desc: "Как установить на примере Linux Mint",
        badge: "Популярное",
        youtubeId: "dQw4w9WgXcQ",
        vk: {
            url: "https://vkvideo.ru/video_ext.php?oid=-235183125&id=456239034&hash=94e4c83748937352&hd=4",
        },
        background: '/images/videos/3-mini.jpg',
    },
    {
        title: "Работа с документами и Google Disk",
        desc: "Открывайте таблицы и тексты без лишних кликов.",
        badge: "",
        youtubeId: "dQw4w9WgXcQ"
    },
    {
        title: "Видеошорты и рекомендации",
        desc: "Смотрите короткие видео и ставьте лайки голосом.",
        badge: "🔥 Тренд",
        youtubeId: "dQw4w9WgXcQ"
    },
    {
        title: "Настройка браузерных ссылок",
        desc: "Быстрый доступ к соцсетям, почте и сайтам одной фразой.",
        badge: "",
        youtubeId: "dQw4w9WgXcQ"
    },
    // {
    //     title: "AI-обои и персонализация",
    //     desc: "Создайте атмосферу рабочего стола с помощью голоса.",
    //     badge: "",
    //     youtubeId: "dQw4w9WgXcQ"
    // },
    // {
    //     title: "Озвучка электронных книг",
    //     desc: "Слушайте любимые книги в исполнении AI.",
    //     badge: "Новинка",
    //     youtubeId: "dQw4w9WgXcQ"
    // },
    // {
    //     title: "Как создать своего AI-персонажа",
    //     desc: "Выберите голос, дайте имя и настройте ассистента под себя.",
    //     badge: "",
    //     youtubeId: "dQw4w9WgXcQ"
    // },
    // {
    //     title: "Секретные команды MaestroAI",
    //     desc: "Неочевидные, но очень полезные голосовые трюки.",
    //     badge: "Совет",
    //     youtubeId: "dQw4w9WgXcQ"
    // }
];

const videoGrid = document.getElementById('videoGrid');
const videoModal = document.getElementById('videoModal');
const youtubeIframe = document.getElementById('youtubeIframe');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const closeVideoBtn = document.getElementById('closeVideoModalBtn');

function openVideoModal(video) {
    modalVideoTitle.innerText = video.title;

    if (video.vk) {
        youtubeIframe.src = video.vk.url;
    } else {
        youtubeIframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
    }

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    youtubeIframe.src = "";
    document.body.style.overflow = '';
}

closeVideoBtn.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
});

if (videoGrid) {
    videoData.forEach((video, idx) => {
        const card = document.createElement('div');
        card.className = 'video-card fade-up-item';
        card.style.transitionDelay = `${idx * 0.03}s`;

        let styles = '';

        if (video.background) {
            styles = `background-image: url(${video.background})`;
        }

        card.innerHTML = `<div class="video-thumbnail" style="${styles}"><i class="fab fa-youtube"></i><span>Смотреть видео</span></div><div class="video-info"><h4>${video.title}</h4><p>${video.desc}</p>${video.badge ? `<div class="badge-new">${video.badge}</div>` : ''}</div>`;
        card.addEventListener('click', () => openVideoModal(video));
        videoGrid.appendChild(card);
        observer.observe(card);
    });
}

// if (videoGrid) {
//     videoData.forEach((video, idx) => {
//         const card = document.createElement('div');
//         card.className = 'video-card fade-up-item';
//         card.style.transitionDelay = `${idx * 0.03}s`;
//         card.innerHTML = `<div class="video-thumbnail"><i class="fab fa-youtube"></i><span>Смотреть видео</span></div><div class="video-info"><h4>${video.title}</h4><p>${video.desc}</p>${video.badge ? `<div class="badge-new">${video.badge}</div>` : ''}</div>`;
//         card.addEventListener('click', () => openVideoModal(video.title, video.youtubeId));
//         videoGrid.appendChild(card);
//         observer.observe(card);
//     });
//     // Принудительно показываем видео-карточки сразу
//     setTimeout(() => {
//         document.querySelectorAll('#videoGrid .video-card').forEach(card => {
//             card.classList.add('visible');
//         });
//     }, 50);
// }

// модалка соцсетей
const socialModal = document.getElementById('socialModal');
const closeModalBtn = document.getElementById('closeModalBtn');

function openSocialModal() {
    socialModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSocialModal() {
    socialModal.classList.remove('active');
    document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeSocialModal);
socialModal.addEventListener('click', (e) => {
    if (e.target === socialModal) closeSocialModal();
});

const createCharBtn = document.querySelectorAll('.create-char-btn');


const ctaTop = document.getElementById('ctaTopBtn');
const socialsBtn = document.getElementById('socialsBtn');
const heroCta = document.getElementById('heroCta');
const bottomCta = document.getElementById('bottomCta');
[ctaTop, socialsBtn, heroCta, bottomCta, ...createCharBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSocialModal();
    });
});

// document.querySelectorAll('.modal-social-link').forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         alert(`Переход в ${link.getAttribute('data-platform')} сообщество MaestroAI. Добавьте реальную ссылку.`);
//     });
// });

window.addEventListener('load', () => {
    document.querySelectorAll('.fade-up-item').forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight - 80) item.classList.add('visible');
    });
});