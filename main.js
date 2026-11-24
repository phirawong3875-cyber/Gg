
// ==========================================
// FURINAS(433) - MAIN JAVASCRIPT
// ==========================================

let websiteData = {
  games: [],
  platforms: []
};

// ==========================================
// LOAD DATA
// ==========================================

async function loadItems() {
  try {
    const response = await fetch("data/items.json");

    if (!response.ok) {
      throw new Error("ไม่สามารถโหลด items.json ได้");
    }

    websiteData = await response.json();

    displayList();
    displayDetail();

  } catch (error) {
    console.error("Loading error:", error);

    const gamesGrid = document.getElementById("gamesGrid");
    const platformsGrid = document.getElementById("platformsGrid");

    if (gamesGrid) {
      gamesGrid.textContent = "ไม่สามารถโหลดข้อมูลเกมได้";
    }

    if (platformsGrid) {
      platformsGrid.textContent = "ไม่สามารถโหลดข้อมูลแพลตฟอร์มได้";
    }
  }
}

// ==========================================
// CREATE CARD
// ==========================================

function createCard(item, type, index) {
  const card = document.createElement("a");

  card.href = `detail.html?type=${type}&id=${index}`;
  card.className = "item-card";

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.name;
  image.loading = "lazy";

  image.onerror = () => {
    image.style.visibility = "hidden";
  };

  const info = document.createElement("div");
  info.className = "item-info";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.description || "";

  const arrow = document.createElement("span");
  arrow.className = "item-arrow";
  arrow.textContent = "›";

  info.append(title, description);
  card.append(image, info, arrow);

  return card;
}

// ==========================================
// DISPLAY GAMES AND PLATFORMS
// ==========================================

function displayList() {
  const gamesGrid = document.getElementById("gamesGrid");
  const platformsGrid = document.getElementById("platformsGrid");

  if (gamesGrid) {
    gamesGrid.replaceChildren();

    websiteData.games.forEach((item, index) => {
      gamesGrid.appendChild(
        createCard(item, "games", index)
      );
    });
  }

  if (platformsGrid) {
    platformsGrid.replaceChildren();

    websiteData.platforms.forEach((item, index) => {
      platformsGrid.appendChild(
        createCard(item, "platforms", index)
      );
    });
  }
}

// ==========================================
// CREATE DETAIL FIELD
// ==========================================

function createDetailField(label, value) {
  const field = document.createElement("div");
  field.className = "detail-field";

  const fieldLabel = document.createElement("span");
  fieldLabel.className = "detail-field-label";
  fieldLabel.textContent = label;

  const fieldValue = document.createElement("span");
  fieldValue.className = "detail-field-value";
  fieldValue.textContent = value || "ยังไม่ได้ระบุ";

  field.append(fieldLabel, fieldValue);

  return field;
}

// ==========================================
// CREATE CATEGORY SECTION
// ==========================================

function createCategorySection(title, fields) {
  const section = document.createElement("section");
  section.className = "detail-section";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const fieldContainer = document.createElement("div");
  fieldContainer.className = "detail-fields";

  Object.entries(fields).forEach(([label, value]) => {
    fieldContainer.appendChild(
      createDetailField(label, value)
    );
  });

  section.append(heading, fieldContainer);

  return section;
}

// ==========================================
// CREATE IMAGE GALLERY
// ==========================================

function createGallery(images) {
  const section = document.createElement("section");
  section.className = "detail-section detail-gallery-section";

  const heading = document.createElement("h2");
  heading.textContent = "รูปภาพเพิ่มเติม";

  const gallery = document.createElement("div");
  gallery.className = "detail-gallery";

  images.forEach((src) => {
    const image = document.createElement("img");

    image.src = src;
    image.alt = "รูปภาพเพิ่มเติม";
    image.loading = "lazy";

    image.onerror = () => {
      image.remove();
    };

    gallery.appendChild(image);
  });

  section.append(heading, gallery);

  return section;
}

// ==========================================
// DISPLAY DETAIL PAGE
// ==========================================

function displayDetail() {
  const params = new URLSearchParams(
    window.location.search
  );

  const type = params.get("type");
  const id = Number(params.get("id"));

  const title = document.getElementById("detailTitle");
  const description = document.getElementById("detailDescription");
  const image = document.getElementById("detailImage");

  // ไม่ใช่หน้า Detail
  if (!title || !description || !image) return;

  // เลือกข้อมูลเกมหรือแอป
  const items =
    type === "games"
      ? websiteData.games
      : type === "platforms"
        ? websiteData.platforms
        : null;

  // ตรวจสอบรายการ
  if (
    !items ||
    !Number.isInteger(id) ||
    id < 0 ||
    !items[id]
  ) {
    title.textContent = "ไม่พบข้อมูล";
    description.textContent = "ไม่พบรายการที่คุณต้องการ";
    image.style.display = "none";
    return;
  }

  const item = items[id];

  // แสดงข้อมูลหลัก
  title.textContent = item.name;
  description.textContent = item.description || "";
  image.src = item.image;
  image.alt = item.name;
  image.style.display = "block";

  document.title = item.name + " | Furinas(433)";

  // หาพื้นที่แสดงรายละเอียด
  const detailHero = document.querySelector(".detail-hero");

  if (!detailHero) {
    console.error("ไม่พบ .detail-hero ใน detail.html");
    return;
  }

  // สร้างพื้นที่ข้อมูลใต้ส่วนหัว
  let detailContainer = document.getElementById("detailSections");

  if (!detailContainer) {
    detailContainer = document.createElement("div");
    detailContainer.id = "detailSections";
    detailContainer.className = "detail-sections";

    detailHero.insertAdjacentElement(
      "afterend",
      detailContainer
    );
  }

  detailContainer.replaceChildren();

  // แสดง categories
  if (item.categories) {
    Object.entries(item.categories).forEach(
      ([categoryName, fields]) => {
        detailContainer.appendChild(
          createCategorySection(categoryName, fields)
        );
      }
    );
  }

  // แสดง Gallery ไว้ด้านล่างสุด
  if (Array.isArray(item.gallery) && item.gallery.length > 0) {
    detailContainer.appendChild(
      createGallery(item.gallery)
    );
  }
}

// ==========================================
// START WEBSITE
// ==========================================

loadItems();
