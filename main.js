
async function loadItems() {
  try {
    const response = await fetch("data/items.json");

    if (!response.ok) {
      throw new Error("ไม่สามารถโหลด items.json ได้");
    }

    const data = await response.json();

    displayList(data);
    displayDetail(data);

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);

    const gamesGrid = document.getElementById("gamesGrid");
    const platformsGrid = document.getElementById("platformsGrid");

    if (gamesGrid) {
      gamesGrid.innerHTML = "<p>ไม่สามารถโหลดข้อมูลเกมได้</p>";
    }

    if (platformsGrid) {
      platformsGrid.innerHTML = "<p>ไม่สามารถโหลดข้อมูลแพลตฟอร์มได้</p>";
    }
  }
}

function createCard(item, type, index) {
  return `
    <a href="detail.html?type=${type}&id=${index}" class="item-card">
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

function displayList(data) {
  const gamesGrid = document.getElementById("gamesGrid");
  const platformsGrid = document.getElementById("platformsGrid");

  if (gamesGrid) {
    gamesGrid.innerHTML = data.games
      .map((item, index) => createCard(item, "games", index))
      .join("");
  }

  if (platformsGrid) {
    platformsGrid.innerHTML = data.platforms
      .map((item, index) => createCard(item, "platforms", index))
      .join("");
  }
}

function displayDetail(data) {
  const params = new URLSearchParams(window.location.search);

  const type = params.get("type");
  const id = Number(params.get("id"));

  const title = document.getElementById("detailTitle");
  const description = document.getElementById("detailDescription");
  const image = document.getElementById("detailImage");

  if (!title || !description || !image) return;

  const items = type === "games"
    ? data.games
    : type === "platforms"
      ? data.platforms
      : null;

  if (!items || !Number.isInteger(id) || !items[id]) {
    title.textContent = "ไม่พบข้อมูล";
    description.textContent = "ไม่พบรายการที่คุณต้องการ";
    image.style.display = "none";
    return;
  }

  const item = items[id];

  title.textContent = item.name;
  description.textContent = item.detail;
  image.src = item.image;
  image.alt = item.name;
  image.style.display = "block";

  document.title = item.name + " | Furinas(433)";
}

loadItems();
