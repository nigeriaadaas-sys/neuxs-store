// ============================================================
// NEXUS Store — js/data.js
// Variants sunt acum obiecte { name, image } în loc de string-uri simple.
// ============================================================

const PRODUCTS = [
  {
    id: 1, name: "iPhone 15 Pro", brand: "Apple", category: "flagship",
    price: 5499, oldPrice: 5999, rating: 4.9, reviews: 2841,
    stock: "in-stock",
    image: "images/15proNa.png",  // imaginea default (primul variant)
    variants: [
      { name: "Titan Natural",  image: "images/15proNa.png"  },
      { name: "Titan Negru",    image: "images/15proNe.png"    },
      { name: "Titan Alb",      image: "images/15proAl.png"      },
      { name: "Titan Albastru", image: "images/15proBl.png" },
    ],
    desc: "Design revoluționar din titan, cip A17 Pro de generație nouă, sistem de cameră Pro cu teleobiectiv 3x și USB-C cu viteză USB 3.",
    specs: { display:"6.1\" OLED Super Retina XDR", cpu:"Apple A17 Pro (3nm)", ram:"8 GB", storage:"128GB / 256GB / 512GB / 1TB", cam:"48MP Main + 12MP Ultra-Wide + 12MP 3x Tele", battery:"3274 mAh, 27W wired", os:"iOS 17", weight:"187g" }
  },
  {
    id: 2, name: "Samsung S24 Ultra", brand: "Samsung", category: "flagship",
    price: 5899, oldPrice: 6499, rating: 4.8, reviews: 1923,
    stock: "in-stock",
    image: "images/s24ultraNe.png",
    variants: [
      { name: "Titanium Black",  image: "images/s24ultraNe.png" },
      { name: "Titanium Gray",   image: "images/s24ultraGr.png" },
      { name: "Titanium Violet", image: "images/s24ultraMo.png" },
      { name: "Titanium Yellow", image: "images/s24ultraGa.png" },
    ],
    desc: "Galaxy AI este aici. S Pen integrat, cameră cu zoom 5x și 10x, ecran Dynamic AMOLED 6.8\" cu 2600 nits.",
    specs: { display:"6.8\" Dynamic AMOLED 2X, 120Hz", cpu:"Snapdragon 8 Gen 3 for Galaxy", ram:"12 GB", storage:"256GB / 512GB / 1TB", cam:"200MP Main + 12MP UW + 10MP 3x + 50MP 5x", battery:"5000 mAh, 45W wired + 15W wireless", os:"Android 14, One UI 6.1", weight:"232g" }
  },
  {
    id: 3, name: "Google Pixel 8 Pro", brand: "Google", category: "flagship",
    price: 4299, oldPrice: null, rating: 4.7, reviews: 876,
    stock: "limited",
    image: "images/pixel8proobsidian.png",
    variants: [
      { name: "Obsidian",  image: "images/pixel8proobsidian.png"  },
      { name: "Porcelain", image: "images/pixel8proprocelain.png" },
      { name: "Bay",       image: "images/pixel8probay.png"       },
    ],
    desc: "Telefonul AI definit de Google. Tensor G3, Magic Eraser, Best Take. Actualizări garantate 7 ani.",
    specs: { display:"6.7\" LTPO OLED, 1–120Hz", cpu:"Google Tensor G3", ram:"12 GB", storage:"128GB / 256GB / 1TB", cam:"50MP Main + 48MP UW + 48MP 5x Tele", battery:"5050 mAh, 30W wired + 23W wireless", os:"Android 14", weight:"213g" }
  },
  {
    id: 4, name: "Xiaomi 14 Ultra", brand: "Xiaomi", category: "flagship",
    price: 4999, oldPrice: 5299, rating: 4.6, reviews: 1204,
    stock: "in-stock",
    image: "images/x14ultranegru.png",
    variants: [
      { name: "Black", image: "images/x14ultranegru.png" },
      { name: "White", image: "images/x14ultraalb.png" },
    ],
    desc: "Colaborare Leica, quad-camera cu apertură variabilă, ecran AMOLED 6.73\" cu 3000 nits.",
    specs: { display:"6.73\" AMOLED, 1–120Hz, 3000 nits", cpu:"Snapdragon 8 Gen 3", ram:"16 GB", storage:"256GB / 512GB / 1TB", cam:"50MP Leica Main (f/1.63–f/4.0) + 3x + 5x + UW", battery:"5000 mAh, 90W wired + 80W wireless", os:"Android 14, HyperOS", weight:"220g" }
  },
  {
    id: 5, name: "OnePlus 12", brand: "OnePlus", category: "mid-high",
    price: 3999, oldPrice: null, rating: 4.5, reviews: 634,
    stock: "out-of-stock",
    image: "images/one12negru.png",
    variants: [
      { name: "Silky Black",   image: "images/one12negru.png"   },
    ],
    desc: "Cameră Hasselblad cu OIS, ecran ProXDR 6.82\" cu 4500 nits și baterie de 5400 mAh cu 100W SUPERVOOC.",
    specs: { display:"6.82\" LTPO3 AMOLED, 1–120Hz", cpu:"Snapdragon 8 Gen 3", ram:"16 GB", storage:"256GB / 512GB", cam:"50MP Sony LYT-808 + 64MP 3x Periscope + 48MP UW", battery:"5400 mAh, 100W wired + 50W wireless", os:"Android 14, OxygenOS 14", weight:"220g" }
  },
  {
    id: 6, name: "iPhone 15", brand: "Apple", category: "mainstream",
    price: 3999, oldPrice: 4299, rating: 4.8, reviews: 3412,
    stock: "in-stock",
    image: "images/15Bl.png",
    variants: [
      { name: "Blue",   image: "images/15Bl.png"   },
      { name: "Pink",   image: "images/15Ro.png"   },
      { name: "Green",  image: "images/15Ve.png"  },
      { name: "Black",  image: "images/15Ne.png"  },
    ],
    desc: "Dynamic Island pe iPhone standard, cip A16 Bionic, cameră 48MP și USB-C.",
    specs: { display:"6.1\" OLED Super Retina XDR", cpu:"Apple A16 Bionic (4nm)", ram:"6 GB", storage:"128GB / 256GB / 512GB", cam:"48MP Main + 12MP Ultra-Wide", battery:"3877 mAh, 20W wired + 15W MagSafe", os:"iOS 17", weight:"171g" }
  },
  {
    id: 7, name: "Samsung Galaxy A55", brand: "Samsung", category: "mid-range",
    price: 2299, oldPrice: 2599, rating: 4.4, reviews: 2100,
    stock: "in-stock",
    image: "images/a55navy.png",
    variants: [
      { name: "Awesome Navy",    image: "images/a55navy.png"    },
      { name: "Awesome Iceblue", image: "images/a55iceblue.png" },
      { name: "Awesome Lilac",   image: "images/a55liliac.png"   },
    ],
    desc: "Camera triplă cu OIS, Super AMOLED 6.6\" cu 120Hz, rezistență IP67 și baterie de 5000 mAh.",
    specs: { display:"6.6\" Super AMOLED, 120Hz", cpu:"Exynos 1480", ram:"8 GB", storage:"128GB / 256GB", cam:"50MP OIS + 12MP UW + 5MP Macro", battery:"5000 mAh, 25W wired", os:"Android 14, One UI 6.1", weight:"213g" }
  },
  {
    id: 8, name: "Motorola Edge 50 Pro", brand: "Motorola", category: "mid-high",
    price: 2799, oldPrice: null, rating: 4.3, reviews: 445,
    stock: "in-stock",
    image: "images/50pronegru.png",
    variants: [
      { name: "Black Beauty",    image: "images/50pronegru.png"    },
      { name: "Luxe Lavender",   image: "images/50alb.png" },
      { name: "Moonlight Pearl", image: "images/50promov.png"    },
    ],
    desc: "pOLED 6.7\" cu 144Hz, 125W TurboPower, Snapdragon 7 Gen 3 și cameră principală 50MP cu OIS.",
    specs: { display:"6.7\" pOLED, 144Hz, 2500 nits", cpu:"Snapdragon 7 Gen 3", ram:"12 GB", storage:"256GB / 512GB", cam:"50MP OIS + 10MP 3x Tele + 13MP UW", battery:"4500 mAh, 125W wired + 50W wireless", os:"Android 14", weight:"186g" }
  }
];