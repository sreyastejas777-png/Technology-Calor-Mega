import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette colors
  const primaryColor = rgb(0.12, 0.16, 0.22); // Deep navy/slate
  const accentColor = rgb(0.88, 0.55, 0.15);  // Warm gold/amber (#E09F3E)
  const secondaryColor = rgb(0.35, 0.40, 0.48); // Slate secondary
  const lightBg = rgb(0.97, 0.97, 0.98);      // Clean surface
  const tableHeaderBg = rgb(0.15, 0.20, 0.28);
  const white = rgb(1, 1, 1);
  const rowAltBg = rgb(0.96, 0.97, 0.99);
  const greenBadge = rgb(0.12, 0.62, 0.35);

  const PAGE_WIDTH = 595.28;  // A4
  const PAGE_HEIGHT = 841.89; // A4
  const MARGIN = 36;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  let currentPage = null;
  let currentY = 0;
  let pageNumber = 0;

  function addPage(title = '') {
    pageNumber++;
    currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    currentY = PAGE_HEIGHT - MARGIN;

    // Header band
    currentPage.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 32,
      width: PAGE_WIDTH,
      height: 32,
      color: primaryColor,
    });

    currentPage.drawText('CALOR MEGA  |  INDUSTRIAL DEHYDRATION SYSTEMS', {
      x: MARGIN,
      y: PAGE_HEIGHT - 22,
      size: 9,
      font: fontBold,
      color: accentColor,
    });

    currentPage.drawText('PRODUCE & DRYER COMPATIBILITY GUIDE', {
      x: PAGE_WIDTH - MARGIN - 210,
      y: PAGE_HEIGHT - 22,
      size: 9,
      font: fontRegular,
      color: white,
    });

    // Footer band
    currentPage.drawLine({
      start: { x: MARGIN, y: 35 },
      end: { x: PAGE_WIDTH - MARGIN, y: 35 },
      thickness: 0.8,
      color: rgb(0.85, 0.87, 0.90),
    });

    currentPage.drawText('CALOR MEGA - Official Engineering & Crop Processing Documentation', {
      x: MARGIN,
      y: 22,
      size: 8,
      font: fontRegular,
      color: secondaryColor,
    });

    const pageStr = `Page ${pageNumber}`;
    const pageStrWidth = fontRegular.widthOfTextAtSize(pageStr, 8);
    currentPage.drawText(pageStr, {
      x: PAGE_WIDTH - MARGIN - pageStrWidth,
      y: 22,
      size: 8,
      font: fontBold,
      color: primaryColor,
    });

    currentY = PAGE_HEIGHT - 55;

    if (title) {
      currentPage.drawText(title, {
        x: MARGIN,
        y: currentY,
        size: 16,
        font: fontBold,
        color: primaryColor,
      });
      currentY -= 25;
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // PAGE 1: COVER & EXECUTIVE SUMMARY
  // ═════════════════════════════════════════════════════════════════
  addPage();

  // Cover Badge & Hero Box
  currentPage.drawRectangle({
    x: MARGIN,
    y: currentY - 140,
    width: CONTENT_WIDTH,
    height: 140,
    color: primaryColor,
  });

  currentPage.drawText('ENGINEERING SPECIFICATION & DRYING MANUAL', {
    x: MARGIN + 20,
    y: currentY - 30,
    size: 9,
    font: fontBold,
    color: accentColor,
  });

  currentPage.drawText('Produce Processing & Dryer Compatibility Guide', {
    x: MARGIN + 20,
    y: currentY - 60,
    size: 18,
    font: fontBold,
    color: white,
  });

  currentPage.drawText('Complete Dehydration Parameters, Moisture Reduction Standards, Optimal Temperatures,', {
    x: MARGIN + 20,
    y: currentY - 85,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.9, 0.92, 0.95),
  });

  currentPage.drawText('Batch Cycle Times, and SS304 Chamber Compatibility for 28+ Industrial Produce Varieties.', {
    x: MARGIN + 20,
    y: currentY - 100,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.9, 0.92, 0.95),
  });

  currentPage.drawText('CALOR MEGA BATCH SYSTEMS  |  SS304 FOOD GRADE  |  PID TEMPERATURE CONTROL  |  ISO COMPLIANT', {
    x: MARGIN + 20,
    y: currentY - 125,
    size: 7.5,
    font: fontBold,
    color: accentColor,
  });

  currentY -= 160;

  // System Technical Overview Box
  currentPage.drawText('1. SYSTEM OVERVIEW & DEHYDRATION ARCHITECTURE', {
    x: MARGIN,
    y: currentY,
    size: 12,
    font: fontBold,
    color: primaryColor,
  });
  currentY -= 16;

  const introText = [
    'The CALOR MEGA industrial batch drying system is specifically engineered for multi-crop commercial processing.',
    'Equipped with 360C dynamic laminar cross-flow aerodynamics, Pt100 RTD precision thermal probes (±1CC accuracy),',
    'and automated electric moisture evacuation actuators, it guarantees consistent moisture reduction without burning,',
    'caramelization, case hardening, or nutrient degradation.'
  ];
  for (const line of introText) {
    currentPage.drawText(line, {
      x: MARGIN,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: secondaryColor,
    });
    currentY -= 13;
  }
  currentY -= 10;

  // 4 Core Dryer Specifications Cards
  const cardWidth = (CONTENT_WIDTH - 24) / 3;
  const cards = [
    { label: 'THERMAL RANGE', val: 'Ambient to 90CC', sub: 'PID Digital ±1CC accuracy' },
    { label: 'AIRFLOW SYSTEM', val: '360C Cross-Flow', sub: 'Laminar axial dynamically balanced' },
    { label: 'CHAMBER & TRAYS', val: 'Food-Grade SS304', sub: 'Optional SS316 high-acid proofing' },
  ];

  cards.forEach((c, idx) => {
    const cx = MARGIN + idx * (cardWidth + 12);
    currentPage.drawRectangle({
      x: cx,
      y: currentY - 52,
      width: cardWidth,
      height: 52,
      color: lightBg,
      borderColor: rgb(0.85, 0.88, 0.92),
      borderWidth: 1,
    });
    currentPage.drawText(c.label, { x: cx + 10, y: currentY - 16, size: 7.5, font: fontBold, color: accentColor });
    currentPage.drawText(c.val, { x: cx + 10, y: currentY - 32, size: 10, font: fontBold, color: primaryColor });
    currentPage.drawText(c.sub, { x: cx + 10, y: currentY - 45, size: 7, font: fontRegular, color: secondaryColor });
  });

  currentY -= 75;

  // Produce Summary Table Intro
  currentPage.drawText('2. CATEGORY-WISE DRYER COMPATIBILITY & PROCESSING MATRIX', {
    x: MARGIN,
    y: currentY,
    size: 12,
    font: fontBold,
    color: primaryColor,
  });
  currentY -= 15;

  // Table Drawing Function
  function drawProduceTable(categoryTitle, items) {
    // Check if we need a new page
    const requiredHeight = 40 + items.length * 28;
    if (currentY - requiredHeight < 50) {
      addPage();
    }

    // Category Section Header
    currentPage.drawRectangle({
      x: MARGIN,
      y: currentY - 20,
      width: CONTENT_WIDTH,
      height: 20,
      color: rgb(0.92, 0.94, 0.98),
    });
    currentPage.drawText(`CATEGORY: ${categoryTitle.toUpperCase()}`, {
      x: MARGIN + 10,
      y: currentY - 14,
      size: 9.5,
      font: fontBold,
      color: primaryColor,
    });
    currentY -= 26;

    // Table Columns:
    // Crop Name (110), Initial/Final Moisture (85), Temp & Cycle (100), Shelf Life Ext. (95), Dryer Compatibility & Products (133)
    const cols = [
      { name: 'Crop / Produce', x: MARGIN, width: 105 },
      { name: 'Moisture (In -> Out)', x: MARGIN + 105, width: 90 },
      { name: 'Temp & Batch Time', x: MARGIN + 195, width: 95 },
      { name: 'Shelf Life Extension', x: MARGIN + 290, width: 95 },
      { name: 'Dryer Compatibility & Output', x: MARGIN + 385, width: CONTENT_WIDTH - 385 },
    ];

    // Header row
    currentPage.drawRectangle({
      x: MARGIN,
      y: currentY - 18,
      width: CONTENT_WIDTH,
      height: 18,
      color: tableHeaderBg,
    });
    cols.forEach(col => {
      currentPage.drawText(col.name, {
        x: col.x + 5,
        y: currentY - 13,
        size: 7.5,
        font: fontBold,
        color: white,
      });
    });
    currentY -= 18;

    // Data rows
    items.forEach((item, rIdx) => {
      const rowHeight = 32;
      if (currentY - rowHeight < 50) {
        addPage();
        // Redraw table header on new page
        currentPage.drawRectangle({
          x: MARGIN,
          y: currentY - 18,
          width: CONTENT_WIDTH,
          height: 18,
          color: tableHeaderBg,
        });
        cols.forEach(col => {
          currentPage.drawText(col.name, {
            x: col.x + 5,
            y: currentY - 13,
            size: 7.5,
            font: fontBold,
            color: white,
          });
        });
        currentY -= 18;
      }

      const isAlt = rIdx % 2 === 1;
      if (isAlt) {
        currentPage.drawRectangle({
          x: MARGIN,
          y: currentY - rowHeight,
          width: CONTENT_WIDTH,
          height: rowHeight,
          color: rowAltBg,
        });
      }

      // Border line under row
      currentPage.drawLine({
        start: { x: MARGIN, y: currentY - rowHeight },
        end: { x: MARGIN + CONTENT_WIDTH, y: currentY - rowHeight },
        thickness: 0.5,
        color: rgb(0.88, 0.90, 0.93),
      });

      // 1. Crop Title & Secondary Info
      currentPage.drawText(item.title, {
        x: cols[0].x + 5,
        y: currentY - 13,
        size: 8.5,
        font: fontBold,
        color: primaryColor,
      });
      currentPage.drawText(`Tray: ${item.trayType}`, {
        x: cols[0].x + 5,
        y: currentY - 24,
        size: 6.8,
        font: fontOblique,
        color: secondaryColor,
      });

      // 2. Moisture
      currentPage.drawText(`${item.moistureBefore}%  ->  ${item.moistureAfter}%`, {
        x: cols[1].x + 5,
        y: currentY - 13,
        size: 8,
        font: fontBold,
        color: greenBadge,
      });
      currentPage.drawText(`Loss: ${(item.moistureBefore - item.moistureAfter)}% extracted`, {
        x: cols[1].x + 5,
        y: currentY - 24,
        size: 6.8,
        font: fontRegular,
        color: secondaryColor,
      });

      // 3. Temp & Cycle
      currentPage.drawText(`${item.temp}`, {
        x: cols[2].x + 5,
        y: currentY - 13,
        size: 8,
        font: fontBold,
        color: primaryColor,
      });
      currentPage.drawText(`Time: ${item.time}`, {
        x: cols[2].x + 5,
        y: currentY - 24,
        size: 6.8,
        font: fontRegular,
        color: secondaryColor,
      });

      // 4. Shelf Life
      currentPage.drawText(`${item.shelfBefore} -> ${item.shelfAfter}`, {
        x: cols[3].x + 5,
        y: currentY - 13,
        size: 7.8,
        font: fontBold,
        color: accentColor,
      });
      currentPage.drawText('Zero chemical preservatives', {
        x: cols[3].x + 5,
        y: currentY - 24,
        size: 6.5,
        font: fontRegular,
        color: secondaryColor,
      });

      // 5. Dryer Compatibility & Products
      currentPage.drawText(`100% Compatible [${item.rating}]`, {
        x: cols[4].x + 5,
        y: currentY - 13,
        size: 7.8,
        font: fontBold,
        color: primaryColor,
      });
      const prodSnippet = item.products.slice(0, 2).join(', ');
      currentPage.drawText(`Output: ${prodSnippet}`, {
        x: cols[4].x + 5,
        y: currentY - 24,
        size: 6.8,
        font: fontRegular,
        color: secondaryColor,
      });

      currentY -= rowHeight;
    });

    currentY -= 15;
  }

  // ═════════════════════════════════════════════════════════════════
  // CATEGORY DATA SETS
  // ═════════════════════════════════════════════════════════════════

  const fruits = [
    {
      title: 'Jackfruit',
      moistureBefore: 75,
      moistureAfter: 5,
      shelfBefore: '3 Days',
      shelfAfter: '12+ Months',
      temp: '55CC - 62CC',
      time: '12 - 16 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Highest Yield',
      products: ['Crispy Chips', 'Gluten-Free Flour', 'Jackfruit Meat']
    },
    {
      title: 'Banana',
      moistureBefore: 70,
      moistureAfter: 4,
      shelfBefore: '5 Days',
      shelfAfter: '12+ Months',
      temp: '58CC - 65CC',
      time: '10 - 14 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Export Grade',
      products: ['Baked Chips', 'Nutritional Powder', 'Fruit Slices']
    },
    {
      title: 'Mango',
      moistureBefore: 80,
      moistureAfter: 6,
      shelfBefore: '4 Days',
      shelfAfter: '10+ Months',
      temp: '52CC - 60CC',
      time: '12 - 16 Hrs',
      trayType: 'SS304 Fine Mesh',
      rating: 'High Margin',
      products: ['Dried Slices', 'Amchur Powder', 'Mango Flakes']
    },
    {
      title: 'Pineapple',
      moistureBefore: 84,
      moistureAfter: 7,
      shelfBefore: '3 Days',
      shelfAfter: '9+ Months',
      temp: '55CC - 60CC',
      time: '14 - 18 Hrs',
      trayType: 'SS304 / SS316',
      rating: 'Enzyme Preserved',
      products: ['Dried Rings', 'Candied Tidbits', 'Fruit Mix']
    },
    {
      title: 'Citrus & Lemon',
      moistureBefore: 85,
      moistureAfter: 6,
      shelfBefore: '5 Days',
      shelfAfter: '12+ Months',
      temp: '48CC - 55CC',
      time: '10 - 14 Hrs',
      trayType: 'SS316 Acid-Proof',
      rating: 'Color Stable',
      products: ['Cocktail Wheels', 'Orange Ribbons', 'Citrus Powder']
    },
    {
      title: 'Papaya & Tutti-Frutti',
      moistureBefore: 88,
      moistureAfter: 8,
      shelfBefore: '4 Days',
      shelfAfter: '12+ Months',
      temp: '55CC - 62CC',
      time: '12 - 15 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Bulk Commercial',
      products: ['Bakery Cubes', 'Dried Strips', 'Digestive Candy']
    }
  ];

  const vegetables = [
    {
      title: 'Mushroom (Oyster/Button)',
      moistureBefore: 90,
      moistureAfter: 6,
      shelfBefore: '2 Days',
      shelfAfter: '12+ Months',
      temp: '45CC - 52CC',
      time: '8 - 12 Hrs',
      trayType: 'SS304 Fine Mesh',
      rating: 'Zero Discoloration',
      products: ['Dried Caps', 'Umami Powder', 'Soup Blend']
    },
    {
      title: 'Seasonal Veg (Carrots/Tomato)',
      moistureBefore: 90,
      moistureAfter: 8,
      shelfBefore: '4 Days',
      shelfAfter: '12+ Months',
      temp: '55CC - 65CC',
      time: '10 - 14 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Nutrient Intact',
      products: ['Carrot Cubes', 'Sundried Tomatoes', 'Soup Mix']
    },
    {
      title: 'Onion & Garlic Flakes',
      moistureBefore: 84,
      moistureAfter: 4,
      shelfBefore: '1 Week',
      shelfAfter: '18+ Months',
      temp: '50CC - 58CC',
      time: '8 - 12 Hrs',
      trayType: 'SS304 Fine Mesh',
      rating: 'Industrial High Demand',
      products: ['Kibbled Flakes', 'Garlic Granules', 'Allium Powder']
    }
  ];

  const spices = [
    {
      title: 'Turmeric & Ginger',
      moistureBefore: 80,
      moistureAfter: 7,
      shelfBefore: '7 Days',
      shelfAfter: '24+ Months',
      temp: '55CC - 65CC',
      time: '16 - 22 Hrs',
      trayType: 'SS304 Heavy Mesh',
      rating: '98% Curcumin Retained',
      products: ['Polished Fingers', 'Sonth Ginger', 'Extract Base']
    },
    {
      title: 'Chili & Paprika',
      moistureBefore: 75,
      moistureAfter: 8,
      shelfBefore: '6 Days',
      shelfAfter: '18+ Months',
      temp: '55CC - 60CC',
      time: '14 - 18 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Anti-Aflatoxin',
      products: ['Whole Stemless', 'Chili Flakes', 'Paprika Powder']
    },
    {
      title: 'Cardamom & Pepper',
      moistureBefore: 65,
      moistureAfter: 8,
      shelfBefore: '5 Days',
      shelfAfter: '24+ Months',
      temp: '45CC - 50CC',
      time: '18 - 24 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'Aroma Sealed',
      products: ['Green Pods', 'Black Pepper', 'Whole Cloves']
    },
    {
      title: 'Culinary Herbs (Mint/Basil)',
      moistureBefore: 85,
      moistureAfter: 5,
      shelfBefore: '2 Days',
      shelfAfter: '12+ Months',
      temp: '40CC - 48CC',
      time: '6 - 9 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'Zero Chlorophyll Loss',
      products: ['Herb Flakes', 'Tea Cuts', 'Seasoning Blends']
    }
  ];

  const plantations = [
    {
      title: 'Tea & Moringa',
      moistureBefore: 78,
      moistureAfter: 4,
      shelfBefore: '2 Days',
      shelfAfter: '18+ Months',
      temp: '45CC - 55CC',
      time: '6 - 8 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'Superfood Certified',
      products: ['Loose Leaf Tea', 'Moringa Powder', 'Botanical Cuts']
    },
    {
      title: 'Coffee Beans',
      moistureBefore: 55,
      moistureAfter: 11,
      shelfBefore: '1 Month',
      shelfAfter: '18+ Months',
      temp: '45CC - 52CC',
      time: '18 - 26 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Cup Score Maximized',
      products: ['Parchment Coffee', 'Natural Cherries', 'Green Beans']
    },
    {
      title: 'Coconut & Copra',
      moistureBefore: 50,
      moistureAfter: 3,
      shelfBefore: '7 Days',
      shelfAfter: '12+ Months',
      temp: '60CC - 70CC',
      time: '10 - 14 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Low FFA Pure White',
      products: ['Desiccated Flakes', 'Milling Copra', 'Coconut Strips']
    }
  ];

  const grains = [
    {
      title: 'Paddy & Rice',
      moistureBefore: 24,
      moistureAfter: 12,
      shelfBefore: '1 Month',
      shelfAfter: '24+ Months',
      temp: '42CC - 48CC',
      time: '6 - 10 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'Zero Grain Breakage',
      products: ['Parboiled Rice', 'Basmati Grain', 'Paddy Stock']
    },
    {
      title: 'Corn & Maize',
      moistureBefore: 28,
      moistureAfter: 13,
      shelfBefore: '3 Weeks',
      shelfAfter: '18+ Months',
      temp: '50CC - 58CC',
      time: '8 - 12 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Mold Free Guarantee',
      products: ['Dehydrated Sweet Corn', 'Feed Corn', 'Cornmeal']
    },
    {
      title: 'Millets & Sorghum (Ragi)',
      moistureBefore: 20,
      moistureAfter: 10,
      shelfBefore: '2 Months',
      shelfAfter: '24+ Months',
      temp: '45CC - 50CC',
      time: '5 - 8 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'High Germination',
      products: ['Cleaned Ragi', 'Sorghum Grain', 'Millet Flour']
    },
    {
      title: 'Pulses & Lentils (Dal)',
      moistureBefore: 22,
      moistureAfter: 9,
      shelfBefore: '1 Month',
      shelfAfter: '24+ Months',
      temp: '45CC - 52CC',
      time: '6 - 9 Hrs',
      trayType: 'SS304 Micro Mesh',
      rating: 'Pest Immune Storage',
      products: ['Split Dal', 'Whole Moong', 'Lentil Flour']
    },
    {
      title: 'Soybeans & Legumes',
      moistureBefore: 22,
      moistureAfter: 10,
      shelfBefore: '1 Month',
      shelfAfter: '18+ Months',
      temp: '45CC - 50CC',
      time: '6 - 8 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Zero Protein Loss',
      products: ['Soy Flour Base', 'Edible Legumes', 'Soy Grits']
    }
  ];

  const nuts = [
    {
      title: 'Cashew & Kernels',
      moistureBefore: 16,
      moistureAfter: 4,
      shelfBefore: '1 Month',
      shelfAfter: '18+ Months',
      temp: '65CC - 72CC',
      time: '6 - 8 Hrs',
      trayType: 'SS304 Fine Wire',
      rating: 'Premium White W180-W320',
      products: ['Whole White Kernels', 'Roasted Cashews', 'Cashew Candy']
    },
    {
      title: 'Areca Nut (Supari)',
      moistureBefore: 60,
      moistureAfter: 10,
      shelfBefore: '5 Days',
      shelfAfter: '24+ Months',
      temp: '58CC - 65CC',
      time: '24 - 36 Hrs',
      trayType: 'SS304 Perforated',
      rating: 'Glossy Anti-Fungal',
      products: ['Chali Whole', 'Boiled Tukra', 'Processed Betel Nut']
    },
    {
      title: 'Cassava & Tapioca',
      moistureBefore: 65,
      moistureAfter: 9,
      shelfBefore: '2 Days',
      shelfAfter: '12+ Months',
      temp: '55CC - 65CC',
      time: '10 - 14 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Cyanide-Free Quick Dry',
      products: ['Tapioca Chips', 'High-Grade Flour', 'Starch Base']
    },
    {
      title: 'Peanuts & Oilseeds',
      moistureBefore: 30,
      moistureAfter: 6,
      shelfBefore: '2 Weeks',
      shelfAfter: '12+ Months',
      temp: '45CC - 52CC',
      time: '6 - 10 Hrs',
      trayType: 'SS304 Fine Mesh',
      rating: 'High Oil Quality',
      products: ['Snack Peanuts', 'Hulled Sesame', 'Flax Seed Stock']
    }
  ];

  const specialty = [
    {
      title: 'Medicinal Plants (Ashwagandha)',
      moistureBefore: 82,
      moistureAfter: 5,
      shelfBefore: '3 Days',
      shelfAfter: '24+ Months',
      temp: '40CC - 46CC',
      time: '8 - 12 Hrs',
      trayType: 'SS304 Wire Mesh',
      rating: 'Pharma Alkaloid Retained',
      products: ['Dried Roots', 'Botanical Extracts', 'Ayurvedic Base']
    },
    {
      title: 'Flowers & Petals (Rose/Marigold)',
      moistureBefore: 80,
      moistureAfter: 6,
      shelfBefore: '2 Days',
      shelfAfter: '12+ Months',
      temp: '38CC - 45CC',
      time: '6 - 10 Hrs',
      trayType: 'SS304 Silk Mesh',
      rating: 'Pigment & Shape Retained',
      products: ['Lutein Petals', 'Culinary Rose Petals', 'Blue Butterfly Pea']
    },
    {
      title: 'Fish & Seafood (Dry Fish/Shrimp)',
      moistureBefore: 68,
      moistureAfter: 10,
      shelfBefore: '1 Day',
      shelfAfter: '8+ Months',
      temp: '48CC - 56CC',
      time: '12 - 16 Hrs',
      trayType: 'SS316 Washable Mesh',
      rating: 'Zero Fly/Dust Contamination',
      products: ['Hygienic Dry Fish', 'Dried Shrimp', 'Fish Meal Protein']
    }
  ];

  // Draw each table
  drawProduceTable('Fruits', fruits);
  drawProduceTable('Vegetables', vegetables);
  drawProduceTable('Spices and Herbs', spices);
  drawProduceTable('Plantations', plantations);
  drawProduceTable('Grains and Pulses', grains);
  drawProduceTable('Nuts and Tubers', nuts);
  drawProduceTable('Specialty & Botanicals', specialty);

  // ═════════════════════════════════════════════════════════════════
  // FINAL PAGE: BEST PRACTICES & ENGINEERING GUIDELINES
  // ═════════════════════════════════════════════════════════════════
  addPage('3. DRYER OPERATION & TRAY LOADING PROTOCOLS');

  const guidelines = [
    {
      title: '1. Tray Loading Density Guidelines',
      desc: 'For thin leafy crops (tea, moringa, herbs), maintain 2.0 to 3.0 kg/m² to prevent clumping. For sliced fruits (jackfruit, banana, mango), arrange single-layer slices at 4.5 to 6.0 kg/m². Dense grains and seeds can be loaded up to 8.0 kg/m² with periodic agitation.'
    },
    {
      title: '2. Multi-Stage Temperature Profiling',
      desc: 'High initial moisture crops benefit from a 2-stage heating protocol: Start at 60CC - 65CC for the first 2-3 hours with dampers at 80% open to rapidly evacuate free surface water, then reduce temperature to 50CC - 55CC with dampers at 30% for deep cellular moisture removal without case hardening.'
    },
    {
      title: '3. Food Safety & Hygiene Standards',
      desc: 'CALOR MEGA chambers are fabricated from electropolished SS304/SS316. Removable tray racks are fully dishwasher safe and compatible with steam-cleaning CIP (Clean-In-Place) procedures, adhering to international USFDA 21 CFR and European EC 1935/2004 food contact directives.'
    },
    {
      title: '4. Energy Conservation & ROI Optimization',
      desc: 'Double-walled rockwool insulation (75mm high density) ensures 99% thermal energy retention, keeping casing exterior within 3CC of ambient temperature. Continuous operation reduces drying electricity cost by up to 42% compared to conventional open electric batch ovens.'
    }
  ];

  guidelines.forEach(g => {
    currentPage.drawText(g.title, {
      x: MARGIN,
      y: currentY,
      size: 10.5,
      font: fontBold,
      color: primaryColor,
    });
    currentY -= 14;

    const words = g.desc.split(' ');
    let line = '';
    for (const w of words) {
      if ((line + w).length > 95) {
        currentPage.drawText(line, { x: MARGIN, y: currentY, size: 8.5, font: fontRegular, color: secondaryColor });
        currentY -= 12;
        line = w + ' ';
      } else {
        line += w + ' ';
      }
    }
    if (line) {
      currentPage.drawText(line, { x: MARGIN, y: currentY, size: 8.5, font: fontRegular, color: secondaryColor });
      currentY -= 12;
    }
    currentY -= 10;
  });

  currentY -= 15;

  // Support & Contact Card
  currentPage.drawRectangle({
    x: MARGIN,
    y: currentY - 70,
    width: CONTENT_WIDTH,
    height: 70,
    color: rgb(0.95, 0.96, 0.98),
    borderColor: accentColor,
    borderWidth: 1.5,
  });

  currentPage.drawText('NEED CUSTOM DRYING PARAMETERS OR TESTING FOR UNLISTED CROPS?', {
    x: MARGIN + 15,
    y: currentY - 20,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });

  currentPage.drawText('Our engineering and food science application laboratory provides pilot batch trial runs and customized temperature-airflow recipes.', {
    x: MARGIN + 15,
    y: currentY - 35,
    size: 8,
    font: fontRegular,
    color: secondaryColor,
  });

  currentPage.drawText('Website: https://sreyastejas777-png.github.io/Technology-Calor-Mega/  |  WhatsApp Technical Desk: +91 99999 99999', {
    x: MARGIN + 15,
    y: currentY - 55,
    size: 8,
    font: fontBold,
    color: accentColor,
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();

  const paths = [
    path.join(process.cwd(), 'public', 'assets', 'downloads', 'CALOR_MEGA_Applications_Guide.pdf'),
    path.join(process.cwd(), 'mobile', 'public', 'assets', 'downloads', 'CALOR_MEGA_Applications_Guide.pdf'),
    path.join(process.cwd(), 'dist', 'assets', 'downloads', 'CALOR_MEGA_Applications_Guide.pdf'),
    path.join(process.cwd(), 'dist', 'mobile', 'assets', 'downloads', 'CALOR_MEGA_Applications_Guide.pdf'),
  ];

  for (const p of paths) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, pdfBytes);
    console.log(`Saved PDF to: ${p} (${pdfBytes.length} bytes)`);
  }

  console.log(`\nSuccessfully generated ${pdfDoc.getPageCount()}-page Applications Guide PDF!`);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
