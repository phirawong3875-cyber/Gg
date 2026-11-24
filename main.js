
// ==============================
// FURINAS(433) PROFILE
// Main JavaScript
// ==============================

// GAME DATA

const games = [
    {
        name: "Arknights: Endfield",
        image: "assets/games/endfield.png",
        description: "ดูข้อมูลเกม",
        link: "#"
    },
    {
        name: "Zenless Zone Zero",
        image: "assets/games/zzz.png",
        description: "ดูข้อมูลเกม",
        link: "#"
    },
    {
        name: "Minecraft",
        image: "assets/games/minecraft.png",
        description: "ดูข้อมูลเกม",
        link: "#"
    }
];


// PLATFORM DATA

const platforms = [
    {
        name: "Discord",
        image: "https://cdn.simpleicons.org/discord/ffffff",
        description: "ดูข้อมูลแพลตฟอร์ม",
        link: "#"
    },
    {
        name: "Instagram",
        image: "https://cdn.simpleicons.org/instagram/E4405F",
        description: "ดูข้อมูลแพลตฟอร์ม",
        link: "#"
    },
    {
        name: "HoYoLAB",
        image: "https://cdn.simpleicons.org/hoyolab/ffffff",
        description: "ดูข้อมูลแพลตฟอร์ม",
        link: "#"
    },
    {
        name: "Kahoot!",
        image: "https://cdn.simpleicons.org/kahoot/ffffff",
        description: "ดูข้อมูลแพลตฟอร์ม",
        link: "#"
    }
];


// CREATE CARD

function createCard(item) {

    return `
        <a href="${item.link}" class="item-card">

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.style.visibility='hidden'"
            >

            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>

            <span class="item-arrow">›</span>

        </a>
    `;
}


// DISPLAY GAMES

const gamesGrid = document.getElementById("gamesGrid");

if (gamesGrid) {
    gamesGrid.innerHTML = games
        .map(createCard)
        .join("");
}


// DISPLAY PLATFORMS

const platformsGrid = document.getElementById("platformsGrid");

if (platformsGrid) {
    platformsGrid.innerHTML = platforms
        .map(createCard)
        .join("");
}
