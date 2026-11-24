
// ======================================
// FURINAS(433) PROFILE
// MAIN SYSTEM
// ======================================

// GAME DATA

const games = [
    {
        name: "Arknights: Endfield",
        image: "assets/games/endfield.png",
        description: "เกมของฉัน",
        detail: "ข้อมูลเกี่ยวกับ Arknights: Endfield"
    },
    {
        name: "Zenless Zone Zero",
        image: "assets/games/zzz.png",
        description: "เกมของฉัน",
        detail: "ข้อมูลเกี่ยวกับ Zenless Zone Zero"
    },
    {
        name: "Minecraft",
        image: "assets/games/minecraft.png",
        description: "เกมของฉัน",
        detail: "ข้อมูลเกี่ยวกับ Minecraft"
    }
];


// PLATFORM DATA

const platforms = [
    {
        name: "Discord",
        image: "https://cdn.simpleicons.org/discord/ffffff",
        description: "แพลตฟอร์มของฉัน",
        detail: "ข้อมูล Discord"
    },
    {
        name: "Instagram",
        image: "https://cdn.simpleicons.org/instagram/E4405F",
        description: "แพลตฟอร์มของฉัน",
        detail: "ข้อมูล Instagram"
    },
    {
        name: "HoYoLAB",
        image: "https://cdn.simpleicons.org/hoyolab/ffffff",
        description: "แพลตฟอร์มของฉัน",
        detail: "ข้อมูล HoYoLAB"
    },
    {
        name: "Kahoot!",
        image: "https://cdn.simpleicons.org/kahoot/ffffff",
        description: "แพลตฟอร์มของฉัน",
        detail: "ข้อมูล Kahoot!"
    }
];


// ======================================
// CREATE CARD
// ======================================

function createCard(item, type, index) {

    return `
        <a href="detail.html?type=${type}&id=${index}"
           class="item-card">

            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
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


// ======================================
// DISPLAY LIST
// ======================================

function displayList() {

    const gamesGrid = document.getElementById("gamesGrid");

    const platformsGrid =
        document.getElementById("platformsGrid");

    if (gamesGrid) {

        gamesGrid.innerHTML = games
            .map((item, index) =>
                createCard(item, "games", index)
            )
            .join("");

    }

    if (platformsGrid) {

        platformsGrid.innerHTML = platforms
            .map((item, index) =>
                createCard(item, "platforms", index)
            )
            .join("");

    }
}


// ======================================
// DISPLAY DETAIL
// ======================================

function displayDetail() {

    const params =
        new URLSearchParams(window.location.search);

    const type = params.get("type");

    const id = Number(params.get("id"));

    const data =
        type === "games" ? games :
        type === "platforms" ? platforms :
        null;

    const title =
        document.getElementById("detailTitle");

    const description =
        document.getElementById("detailDescription");

    const image =
        document.getElementById("detailImage");

    if (!title || !description || !image) return;

    if (
        !data ||
        !Number.isInteger(id) ||
        !data[id]
    ) {

        title.textContent = "ไม่พบข้อมูล";

        description.textContent =
            "ไม่พบรายการที่คุณต้องการ";

        image.style.display = "none";

        return;
    }

    const item = data[id];

    title.textContent = item.name;

    description.textContent = item.detail;

    image.src = item.image;

    image.alt = item.name;

    image.style.display = "block";

    document.title =
        item.name + " | Furinas(433)";
}


// ======================================
// INITIALIZE
// ======================================

displayList();

displayDetail();
