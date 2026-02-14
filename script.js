// ТАЙМЕР ОБРАТНОГО ОТСЧЕТА
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем дату окончания чемпионата
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 222);
    countdownDate.setHours(countdownDate.getHours() + 6);
    countdownDate.setMinutes(countdownDate.getMinutes() + 24);
    
    const countdownElement = document.getElementById('countdown');
    let countdownInterval;
    
    // Функция форматирования чисел
    function formatNumber(num) {
        if (num < 0) return '00';
        return num < 10 ? '0' + num : num;
    }
    
    // Функция обновления таймера
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;
        
        // Если время истекло
        if (distance < 0) {
            clearInterval(countdownInterval);
            displayEndedCountdown();
            showChampionshipStartedMessage();
            return;
        }
        
        // Расчет дней, часов, минут
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Отображение таймера
        displayCountdown(days, hours, minutes);
    }
    
    // Функция отображения работающего таймера
    function displayCountdown(days, hours, minutes) {
        countdownElement.innerHTML = `
            <div class="timer-card">
                <div class="number-square">${formatNumber(days)}</div>
                <div class="unit-label">дни</div>
            </div>
            <div class="colon-separator">:</div>
            <div class="timer-card">
                <div class="number-square">${formatNumber(hours)}</div>
                <div class="unit-label">часы</div>
            </div>
            <div class="colon-separator">:</div>
            <div class="timer-card">
                <div class="number-square">${formatNumber(minutes)}</div>
                <div class="unit-label">минуты</div>
            </div>
        `;
    }
    
    // Функция отображения завершенного таймера
    function displayEndedCountdown() {
        countdownElement.innerHTML = `
            <div class="timer-card">
                <div class="number-square">00</div>
                <div class="unit-label">дни</div>
            </div>
            <div class="colon-separator">:</div>
            <div class="timer-card">
                <div class="number-square">00</div>
                <div class="unit-label">часы</div>
            </div>
            <div class="colon-separator">:</div>
            <div class="timer-card">
                <div class="number-square">00</div>
                <div class="unit-label">минуты</div>
            </div>
        `;
    }
    
    // Сообщение о начале чемпионата
    function showChampionshipStartedMessage() {
        const timerTitle = document.querySelector('.timer-title');
        if (timerTitle) {
            timerTitle.textContent = 'Чемпионат начался!';
            timerTitle.style.color = '#FFD700';
            timerTitle.style.fontWeight = '700';
        }
    }
    
    // НАВИГАЦИЯ С ЯКОРНЫМИ ССЫЛКАМИ
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('.header');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Добавляем активный класс
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // Отслеживание активного пункта при скролле
        function setActiveLink() {
            const scrollPos = window.scrollY + header.offsetHeight + 50;
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', setActiveLink);
        setActiveLink(); // Вызов при загрузке
    }
    
    // ЛОГИКА ДЛЯ ЛОГОТИПА
    function initLogo() {
        const logo = document.querySelector('.logo');
        
        if (logo) {
            logo.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
            });
            
            logo.style.cursor = 'pointer';
        }
    }
    
    // АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ
    function initFadeInAnimation() {
        const fadeElems = document.querySelectorAll(
            '.stages-section, .prizes-section, .mailing-section, .footer, .about-section'
        );
        
        fadeElems.forEach(el => el.classList.add('fade-in'));
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElems.forEach(el => observer.observe(el));
    }
    
    // ВЕСЕННЯЯ АНИМАЦИЯ - ЛЕТАЮЩИЕ ЛЕПЕСТКИ
    function initSpringAnimation() {
        const petals = ['🌸', '🌼', '🌷', '🌿', '🍃'];
        
        function createPetal() {
            const petal = document.createElement('div');
            const randomPetal = petals[Math.floor(Math.random() * petals.length)];
            
            petal.innerHTML = randomPetal;
            petal.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10%;
                font-size: ${20 + Math.random() * 30}px;
                opacity: ${0.15 + Math.random() * 0.2};
                pointer-events: none;
                z-index: 9999;
                animation: floatPetal ${15 + Math.random() * 20}s linear infinite;
                filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
            `;
            
            document.body.appendChild(petal);
            
            // Удаляем через время анимации
            setTimeout(() => {
                petal.remove();
            }, 35000);
        }
        
        // Создаем новые лепестки каждые 2 секунды
        setInterval(createPetal, 2000);
        
        // Сразу создаем несколько лепестков
        for (let i = 0; i < 5; i++) {
            setTimeout(createPetal, i * 300);
        }
    }
    
    // ОБРАБОТКА ФОРМЫ ПОДПИСКИ
    function initSubscribeForm() {
        const form = document.getElementById('subscribeForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nameInput = this.querySelector('input[type="text"]');
                const emailInput = this.querySelector('input[type="email"]');
                
                if (nameInput.value && emailInput.value) {
                    alert('Спасибо за подписку! Мы будем держать вас в курсе новостей чемпионата.');
                    nameInput.value = '';
                    emailInput.value = '';
                } else {
                    alert('Пожалуйста, заполните все поля');
                }
            });
        }
    }
    
    // ОБРАБОТКА ЯКОРНЫХ ССЫЛОК ПРИ ЗАГРУЗКЕ
    function handleAnchorLinks() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
    
    // ИНИЦИАЛИЗАЦИЯ
    function init() {
        console.log('Инициализация сайта чемпионата...');
        
        // Запуск таймера
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
        
        // Инициализация всех функций
        initNavigation();
        initLogo();
        initFadeInAnimation();
        initSpringAnimation();
        initSubscribeForm();
        handleAnchorLinks();
        
        console.log('Дата окончания таймера:', countdownDate.toLocaleString('ru-RU'));
    }
    
    // Запуск
    init();
    
    // Обработчик изменения хэша
    window.addEventListener('hashchange', handleAnchorLinks);
});

// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
let countdownDate = new Date();

function setCountdownDate(newDate) {
    if (newDate instanceof Date) {
        countdownDate = newDate;
        console.log('Дата таймера обновлена:', newDate.toLocaleString('ru-RU'));
    }
}

function getRemainingTime() {
    return countdownDate.getTime() - new Date().getTime();
}

function restartCountdown() {
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 222);
    countdownDate.setHours(countdownDate.getHours() + 6);
    countdownDate.setMinutes(countdownDate.getMinutes() + 24);
    window.countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;
        
        if (distance < 0) {
            clearInterval(window.countdownInterval);
            document.querySelector('.timer-title').textContent = 'Чемпионат начался!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="timer-card">
                    <div class="number-square">${days < 10 ? '0' + days : days}</div>
                    <div class="unit-label">дни</div>
                </div>
                <div class="colon-separator">:</div>
                <div class="timer-card">
                    <div class="number-square">${hours < 10 ? '0' + hours : hours}</div>
                    <div class="unit-label">часы</div>
                </div>
                <div class="colon-separator">:</div>
                <div class="timer-card">
                    <div class="number-square">${minutes < 10 ? '0' + minutes : minutes}</div>
                    <div class="unit-label">минуты</div>
                </div>
            `;
        }
    }, 1000);
    console.log('Таймер перезапущен');
}