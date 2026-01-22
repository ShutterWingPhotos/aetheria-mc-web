// Simple script for DragonSea MC website

// Translations
const translations = {
    en: {
        "page-title": "DragonSea Minecraft Server",
        "title": "DragonSea Minecraft Server",
        "subtitle": "Build  / Explore / Create",
        "join-title": "Join the Server",
        "join-desc": "Connect to our Minecraft server and start building!",
        "join-btn": "Join Now",
        "copy-hint": "Click to copy server address",
        "nav-home": "Home",
        "nav-about": "About",
        "dynmap-title": "Dynmap",
        "dynmap-desc": "Explore the world map in real-time.",
        "dynmap-btn": "View Map",
        "transit-title": "Transit System",
        "transit-desc": "Navigate our extensive rail and transport network.",
        "transit-btn": "Transit Guide",
        "status-title": "Server Status",
        "status-desc": "Check the current server status and player count.",
        "status-online": "Online:",
        "status-players": "Players:",
        "status-latency": "Latency:",
        "online-players": "Online Players",
        "about-title": "About DragonSea MC",
        "about-subtitle": "Learn more about our community and features",
        "about-desc": "DragonSea MC is a vibrant Minecraft server community dedicated to providing an immersive and creative gaming experience. Our server features custom plugins, active moderation, and a welcoming community of players from around the world.",
        "feature-creative": "Creative Building",
        "feature-creative-desc": "Unleash your creativity with unlimited building opportunities.",
        "feature-community": "Active Community",
        "feature-community-desc": "Join a friendly and supportive player community.",
        "feature-events": "Regular Events",
        "feature-events-desc": "Participate in exciting server events and competitions.",
        "roadmap-title": "Development Roadmap",
        "team-title": "Our Team",
        "footer": "© 2026 LeoD.Aviation All rights reserved."
    },
    zh: {
        "page-title": "龙海 Minecraft 服务器",
        "title": "龙海 Minecraft 服务器",
        "subtitle": "建造 / 探索 / 创造",
        "join-title": "加入服务器",
        "join-desc": "连接我们的 Minecraft 服务器，开始建造！",
        "join-btn": "立即加入",
        "copy-hint": "点击复制服务器地址",
        "nav-home": "首页",
        "nav-about": "关于",
        "dynmap-title": "服务动态地图",
        "dynmap-desc": "实时查看我们的世界地图与玩家。",
        "dynmap-btn": "查看地图",
        "transit-title": "交通系统地图",
        "transit-desc": "查看我们铁路和运输网络，以及提前规划您的行程！",
        "transit-btn": "交通指南地图",
        "status-title": "服务器状态",
        "status-desc": "检查当前服务器状态和玩家数量。",
        "status-online": "在线:",
        "status-players": "玩家:",
        "status-latency": "延迟:",
        "online-players": "在线玩家",
        "about-title": "关于 DragonSea MC",
        "about-subtitle": "了解更多关于我们的社区和功能",
        "about-desc": "DragonSea Minecraft 服务器是一个城市模组（Forge）服务器，目前状态还在建设中，我们的目标是在Minecraft（也就是我的世界）这款游戏中创建一个完整的虚构城市与国家，并致力于提供沉浸式和创造性的游戏体验。",
        "feature-creative": "创造性建筑",
        "feature-creative-desc": "释放您的创造力，无限建筑机会。",
        "feature-community": "活跃社区",
        "feature-community-desc": "加入友好和支持性的玩家社区。",
        "feature-events": "定期活动",
        "feature-events-desc": "参与激动人心的服务器活动和竞赛。",
        "roadmap-title": "发展路线图",
        "team-title": "我们的团队",
        "footer": "© 2026 LeoD.Aviation 版权所有。"
    }
};

// Detect language
let currentLang = localStorage.getItem('language') || (navigator.language.startsWith('zh') ? 'zh' : 'en');

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Update title
    document.title = translations[lang]["page-title"];
    // Update button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = lang === 'en' ? 'EN' : '中文';
    }
    // Save to localStorage
    localStorage.setItem('language', lang);
}

// Copy server address to clipboard
function copyServerAddress() {
    const address = 'mc.shutterwingphotos.cn';
    navigator.clipboard.writeText(address).then(() => {
        const copyLink = document.querySelector('.copy-link');
        if (copyLink) {
            const originalText = copyLink.textContent;
            copyLink.textContent = currentLang === 'zh' ? '已复制！' : 'Copied!';
            setTimeout(() => {
                copyLink.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Keyboard shortcuts for language switching
document.addEventListener('keydown', function(e) {
    if (e.key === 'e' || e.key === 'E') {
        setLanguage('en');
    } else if (e.key === 'c' || e.key === 'C') {
        setLanguage('zh');
    }
});

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLang);

    // Language switcher button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            setLanguage(newLang);
        });
    }

    // Add subtle parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Mock server status update (only on index page)
    if (document.getElementById('server-status')) {
        updateServerStatus();
    }

    // Console log for fun
    console.log('Welcome to DragonSea MC! 🚀 Press E for English, C for Chinese.');
});

// Mock server status update
function updateServerStatus() {
    const statusEl = document.getElementById('server-status');
    const playersEl = document.getElementById('player-count');
    const latencyEl = document.getElementById('latency');
    const onlineUsersEl = document.getElementById('online-users');
    const userListEl = document.getElementById('user-list');
    
    // Fetch from API
    fetch('https://shutterwingphotos.cn/api/mcstatus')
        .then(response => response.json())
        .then(data => {
            statusEl.textContent = data.online ? 'Online' : 'Offline';
            statusEl.className = data.online ? 'status-online' : 'status-offline';
            playersEl.textContent = `${data.user_count}/128`;
            const latency = Number(data.latency);
            latencyEl.textContent = `${latency}ms`;
            
            // Set latency color based on value
            if (latency < 110) {
                latencyEl.className = 'latency-green';
            } else if (latency < 250) {
                latencyEl.className = 'latency-yellow';
            } else {
                latencyEl.className = 'latency-red';
            }            
            // Show online users if there are any
            if (data.users && data.users.length > 0) {
                onlineUsersEl.style.display = 'block';
                userListEl.innerHTML = data.users.map(user => 
                    `<span class="user-tag">${user}</span>`
                ).join('');
            } else {
                onlineUsersEl.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching server status:', error);
            statusEl.textContent = 'Error';
            statusEl.className = 'status-offline';
            playersEl.textContent = '--/100';
            latencyEl.textContent = '--';
            onlineUsersEl.style.display = 'none';
        });
}