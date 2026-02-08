const data = require("./menu.json");

const API_URL = "https://one01clup-api.onrender.com/api/menu";
const ADMIN_KEY = "101clup";

// Varsayılan fiyat (sonra admin panelden düzenlersin)
const DEFAULT_PRICE = 0;

async function run() {
  for (const category of data.categories) {
    console.log(`\n📂 Kategori: ${category.name}`);

    for (const product of category.products) {
      const body = {
        name: product.name,
        price: DEFAULT_PRICE,
        category: category.name,
        isAvailable: true,
        imageUrl: null,
        description: product.ingredients || null,
      };

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": ADMIN_KEY,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const t = await res.text();
          console.error("❌ Hata:", product.name, t);
        } else {
          console.log("✅ Eklendi:", product.name);
        }
      } catch (err) {
        console.error("❌ Network error:", product.name, err);
      }
    }
  }

  console.log("\n🎉 TÜM MENÜ YÜKLENDİ");
}

run();
