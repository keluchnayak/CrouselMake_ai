// Clean, editorial-quality SVG graphic data URIs for technical slides

// 1. Confusion Matrix (Machine Learning)
const svgConfusionMatrix = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500" fill="none">
  <rect width="900" height="500" rx="16" fill="#161B22"/>
  <rect x="0.5" y="0.5" width="899" height="499" rx="15.5" stroke="#30363D"/>
  
  <!-- Header Bar -->
  <path d="M0 16C0 7.16344 7.16344 0 16 0H884C892.837 0 900 7.16344 900 16V42H0V16Z" fill="#21262D"/>
  <line x1="0" y1="42.5" x2="900" y2="42.5" stroke="#30363D"/>
  <circle cx="24" cy="21" r="5" fill="#EF4444"/>
  <circle cx="44" cy="21" r="5" fill="#F59E0B"/>
  <circle cx="64" cy="21" r="5" fill="#10B981"/>
  <text x="96" y="26" fill="#8B949E" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">evaluation_matrix.py — Seaborn Heatmap [Focal Loss vs Cross-Entropy]</text>

  <!-- Labels -->
  <text x="450" y="85" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700">Normalized Test Set Confusion Matrix (N = 45,200)</text>
  <text x="450" y="112" text-anchor="middle" fill="#8B949E" font-family="Inter, sans-serif" font-size="14">Predicted Label</text>
  
  <text x="310" y="145" text-anchor="middle" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">PREDICTED: 0 (Normal)</text>
  <text x="610" y="145" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">PREDICTED: 1 (Fraud/Churn)</text>

  <!-- True Label Vert -->
  <text x="80" y="250" text-anchor="middle" fill="#8B949E" font-family="Inter, sans-serif" font-size="14" transform="rotate(-90 80 250)">True Class Label</text>

  <!-- Row 1 Label -->
  <text x="140" y="235" fill="#E6EDF3" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600">TRUE: 0</text>
  <!-- Cell 0,0 (TN) -->
  <rect x="200" y="170" width="220" height="120" rx="10" fill="#10B981" fill-opacity="0.25" stroke="#10B981" stroke-width="1.5"/>
  <text x="310" y="225" text-anchor="middle" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="34" font-weight="800">98.4%</text>
  <text x="310" y="255" text-anchor="middle" fill="#A7F3D0" font-family="Inter, sans-serif" font-size="12">TN: 44,028 samples</text>

  <!-- Cell 0,1 (FP) -->
  <rect x="500" y="170" width="220" height="120" rx="10" fill="#30363D" fill-opacity="0.4" stroke="#484F58"/>
  <text x="610" y="225" text-anchor="middle" fill="#E6EDF3" font-family="JetBrains Mono, monospace" font-size="34" font-weight="700">1.6%</text>
  <text x="610" y="255" text-anchor="middle" fill="#8B949E" font-family="Inter, sans-serif" font-size="12">FP: 715 samples</text>

  <!-- Row 2 Label -->
  <text x="140" y="380" fill="#E6EDF3" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600">TRUE: 1</text>
  <!-- Cell 1,0 (FN) -->
  <rect x="200" y="315" width="220" height="120" rx="10" fill="#EF4444" fill-opacity="0.18" stroke="#EF4444" stroke-width="1.5"/>
  <text x="310" y="370" text-anchor="middle" fill="#F87171" font-family="JetBrains Mono, monospace" font-size="34" font-weight="800">5.8%</text>
  <text x="310" y="400" text-anchor="middle" fill="#FECACA" font-family="Inter, sans-serif" font-size="12">FN (Reduced by 72%)</text>

  <!-- Cell 1,1 (TP) -->
  <rect x="500" y="315" width="220" height="120" rx="10" fill="#10B981" fill-opacity="0.4" stroke="#10B981" stroke-width="2"/>
  <text x="610" y="370" text-anchor="middle" fill="#34D399" font-family="JetBrains Mono, monospace" font-size="34" font-weight="800">94.2%</text>
  <text x="610" y="400" text-anchor="middle" fill="#D1FAE5" font-family="Inter, sans-serif" font-size="12">TP: 430 Minority Catches</text>

  <!-- Summary Pill -->
  <rect x="200" y="455" width="520" height="30" rx="6" fill="#161B22" stroke="#30363D"/>
  <text x="460" y="475" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="12">F1: 0.942 | Precision: 0.963 | Recall: 0.921 | ROC-AUC: 0.988</text>
</svg>
`;

// 2. SQL Execution Plan (EXPLAIN ANALYZE)
const svgSqlExecutionPlan = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500" fill="none">
  <rect width="900" height="500" rx="16" fill="#0B0F19"/>
  <rect x="0.5" y="0.5" width="899" height="499" rx="15.5" stroke="#1F2937"/>
  
  <!-- Header Bar -->
  <path d="M0 16C0 7.16344 7.16344 0 16 0H884C892.837 0 900 7.16344 900 16V42H0V16Z" fill="#111827"/>
  <line x1="0" y1="42.5" x2="900" y2="42.5" stroke="#1F2937"/>
  <circle cx="24" cy="21" r="5" fill="#EF4444"/>
  <circle cx="44" cy="21" r="5" fill="#F59E0B"/>
  <circle cx="64" cy="21" r="5" fill="#38BDF8"/>
  <text x="96" y="26" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">pg_stat_statements: EXPLAIN (ANALYZE, BUFFERS, COSTS)</text>

  <!-- Side-by-side comparison boxes -->
  <!-- Box 1: BEFORE -->
  <rect x="40" y="65" width="395" height="400" rx="12" fill="#111827" stroke="#EF4444" stroke-width="1.5" stroke-opacity="0.6"/>
  <rect x="56" y="80" width="130" height="26" rx="4" fill="#EF4444" fill-opacity="0.15"/>
  <text x="121" y="97" text-anchor="middle" fill="#EF4444" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">BEFORE (48.2s)</text>
  <text x="56" y="135" fill="#E2E8F0" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700">Seq Scan on raw_ledger</text>
  <text x="56" y="160" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="12">Cost: 182,410.00..342,120.00</text>
  <text x="56" y="180" fill="#EF4444" font-family="JetBrains Mono, monospace" font-size="12">Filter: (DATE_PART('year', ts) = 2024)</text>
  <text x="56" y="200" fill="#EF4444" font-family="JetBrains Mono, monospace" font-size="12">Rows Removed by Filter: 12,481,200</text>
  
  <line x1="56" y1="225" x2="415" y2="225" stroke="#1F2937"/>
  <text x="56" y="250" fill="#64748B" font-family="Inter, sans-serif" font-size="12" font-weight="600">BUFFER I/O IMPACT:</text>
  <text x="56" y="275" fill="#FCA5A5" font-family="JetBrains Mono, monospace" font-size="13">Shared Read: 842,192 blocks (6.5 GB)</text>
  <text x="56" y="298" fill="#FCA5A5" font-family="JetBrains Mono, monospace" font-size="13">Hit Ratio: 8.2% (Cold Disk Trashing)</text>
  <text x="56" y="321" fill="#FCA5A5" font-family="JetBrains Mono, monospace" font-size="13">Memory Sort (External merge disk)</text>

  <rect x="56" y="355" width="363" height="90" rx="8" fill="#0B0F19" stroke="#1F2937"/>
  <text x="72" y="380" fill="#94A3B8" font-family="Inter, sans-serif" font-size="12">Execution Time:</text>
  <text x="72" y="420" fill="#EF4444" font-family="JetBrains Mono, monospace" font-size="32" font-weight="800">48,214 ms</text>

  <!-- Box 2: AFTER -->
  <rect x="465" y="65" width="395" height="400" rx="12" fill="#111827" stroke="#38BDF8" stroke-width="2"/>
  <rect x="481" y="80" width="130" height="26" rx="4" fill="#38BDF8" fill-opacity="0.15"/>
  <text x="546" y="97" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">AFTER (180ms)</text>
  <text x="481" y="135" fill="#E2E8F0" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700">Index Scan using idx_ledger_ts</text>
  <text x="481" y="160" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="12">Cost: 0.56..412.30</text>
  <text x="481" y="180" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="12">Index Cond: (ts &gt;= '2024-01-01' AND ...)</text>
  <text x="481" y="200" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="12">Rows Scanned: 4,210 exact keys</text>

  <line x1="481" y1="225" x2="840" y2="225" stroke="#1F2937"/>
  <text x="481" y="250" fill="#64748B" font-family="Inter, sans-serif" font-size="12" font-weight="600">BUFFER I/O OPTIMIZED:</text>
  <text x="481" y="275" fill="#7DD3FC" font-family="JetBrains Mono, monospace" font-size="13">Shared Read: 0 blocks</text>
  <text x="481" y="298" fill="#7DD3FC" font-family="JetBrains Mono, monospace" font-size="13">Shared Hit: 48 blocks (100% RAM)</text>
  <text x="481" y="321" fill="#7DD3FC" font-family="JetBrains Mono, monospace" font-size="13">Planning Time: 0.12 ms</text>

  <rect x="481" y="355" width="363" height="90" rx="8" fill="#0B0F19" stroke="#1F2937"/>
  <text x="497" y="380" fill="#94A3B8" font-family="Inter, sans-serif" font-size="12">Execution Time:</text>
  <text x="497" y="420" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="32" font-weight="800">182 ms (-96.2%)</text>
</svg>
`;

// 3. Power BI Star Schema Model
const svgPowerBiSchema = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500" fill="none">
  <rect width="900" height="500" rx="16" fill="#141414"/>
  <rect x="0.5" y="0.5" width="899" height="499" rx="15.5" stroke="#2E2E2E"/>
  
  <!-- Header Bar -->
  <path d="M0 16C0 7.16344 7.16344 0 16 0H884C892.837 0 900 7.16344 900 16V42H0V16Z" fill="#1F1F1F"/>
  <line x1="0" y1="42.5" x2="900" y2="42.5" stroke="#2E2E2E"/>
  <circle cx="24" cy="21" r="5" fill="#EF4444"/>
  <circle cx="44" cy="21" r="5" fill="#F59E0B"/>
  <circle cx="64" cy="21" r="5" fill="#10B981"/>
  <text x="96" y="26" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">Power BI Desktop: Model View [Star Schema — 1:Many Single-Direction]</text>

  <!-- FACT TABLE: Center -->
  <rect x="330" y="160" width="240" height="260" rx="10" fill="#1F1F1F" stroke="#F59E0B" stroke-width="2"/>
  <rect x="330" y="160" width="240" height="36" rx="10" fill="#F59E0B" fill-opacity="0.2"/>
  <text x="450" y="184" text-anchor="middle" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="14" font-weight="800">FACT_Sales (500k)</text>
  <text x="350" y="215" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="12">🔑 SalesOrderNumber</text>
  <text x="350" y="238" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12">🔗 OrderDateKey</text>
  <text x="350" y="261" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12">🔗 CustomerKey</text>
  <text x="350" y="284" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="12">🔗 ProductKey</text>
  <text x="350" y="307" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="12">📊 SalesAmount</text>
  <text x="350" y="330" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="12">📊 OrderQuantity</text>
  <text x="350" y="353" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="12">📊 UnitPriceDiscount</text>
  <text x="350" y="390" fill="#737373" font-family="Inter, sans-serif" font-size="11">Grain: 1 row per order line</text>

  <!-- DIM_Date: Top Left -->
  <rect x="50" y="70" width="220" height="150" rx="8" fill="#1A1A1A" stroke="#404040"/>
  <text x="160" y="95" text-anchor="middle" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">DIM_Date [1]</text>
  <text x="70" y="122" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="11">🔑 DateKey</text>
  <text x="70" y="142" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">CalendarYear</text>
  <text x="70" y="162" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">MonthName / Quarter</text>
  <text x="70" y="182" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">IsWeekend / FiscalYr</text>

  <!-- Connect DIM_Date to FACT -->
  <path d="M270 145 C 300 145, 300 238, 330 238" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="272" cy="145" r="4" fill="#F59E0B"/>
  <polygon points="326,234 330,238 326,242" fill="#F59E0B"/>
  <text x="290" y="180" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="10">1:∞</text>

  <!-- DIM_Customer: Top Right -->
  <rect x="630" y="70" width="220" height="150" rx="8" fill="#1A1A1A" stroke="#404040"/>
  <text x="740" y="95" text-anchor="middle" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">DIM_Customer [1]</text>
  <text x="650" y="122" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="11">🔑 CustomerKey</text>
  <text x="650" y="142" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">CustomerSegment</text>
  <text x="650" y="162" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">GeographyCountry</text>
  <text x="650" y="182" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">LTV_Decile</text>

  <!-- Connect DIM_Customer to FACT -->
  <path d="M630 145 C 600 145, 600 261, 570 261" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="628" cy="145" r="4" fill="#F59E0B"/>
  <polygon points="574,257 570,261 574,265" fill="#F59E0B"/>
  <text x="590" y="195" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="10">1:∞</text>

  <!-- DIM_Product: Bottom Left -->
  <rect x="50" y="270" width="220" height="150" rx="8" fill="#1A1A1A" stroke="#404040"/>
  <text x="160" y="295" text-anchor="middle" fill="#E5E5E5" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">DIM_Product [1]</text>
  <text x="70" y="322" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="11">🔑 ProductKey</text>
  <text x="70" y="342" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">Category / SubCat</text>
  <text x="70" y="362" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">StandardCost</text>
  <text x="70" y="382" fill="#A3A3A3" font-family="JetBrains Mono, monospace" font-size="11">MarginBracket</text>

  <path d="M270 345 C 300 345, 300 284, 330 284" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="272" cy="345" r="4" fill="#F59E0B"/>
  <polygon points="326,280 330,284 326,288" fill="#F59E0B"/>
  <text x="290" y="310" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="10">1:∞</text>

  <!-- Footnote -->
  <text x="450" y="470" text-anchor="middle" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="13">Rule: Zero Bi-Directional Cross-Filtering. 100% Star Schema Topology.</text>
</svg>
`;

// 4. Power BI Executive Cockpit Dashboard
const svgPowerBiDashboard = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500" fill="none">
  <rect width="900" height="500" rx="16" fill="#141414"/>
  <rect x="0.5" y="0.5" width="899" height="499" rx="15.5" stroke="#2E2E2E"/>
  
  <!-- Header Bar -->
  <path d="M0 16C0 7.16344 7.16344 0 16 0H884C892.837 0 900 7.16344 900 16V46H0V16Z" fill="#1F1F1F"/>
  <line x1="0" y1="46.5" x2="900" y2="46.5" stroke="#2E2E2E"/>
  <text x="30" y="28" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="14" font-weight="800">GLOBAL REVENUE EXECUTIVE COCKPIT</text>
  <text x="750" y="28" fill="#737373" font-family="Inter, sans-serif" font-size="12">FY2024 Q3 • LIVE REFRESH</text>

  <!-- 3 Top KPI Cards -->
  <rect x="30" y="65" width="260" height="100" rx="10" fill="#1F1F1F" stroke="#2E2E2E"/>
  <text x="50" y="92" fill="#A3A3A3" font-family="Inter, sans-serif" font-size="12" font-weight="600">TOTAL REVENUE (YTD)</text>
  <text x="50" y="132" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="30" font-weight="800">$48.6M</text>
  <text x="180" y="130" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">+18.4% YoY</text>

  <rect x="320" y="65" width="260" height="100" rx="10" fill="#1F1F1F" stroke="#2E2E2E"/>
  <text x="340" y="92" fill="#A3A3A3" font-family="Inter, sans-serif" font-size="12" font-weight="600">GROSS MARGIN %</text>
  <text x="340" y="132" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="30" font-weight="800">42.8%</text>
  <text x="470" y="130" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">+310 bps</text>

  <rect x="610" y="65" width="260" height="100" rx="10" fill="#1F1F1F" stroke="#2E2E2E"/>
  <text x="630" y="92" fill="#A3A3A3" font-family="Inter, sans-serif" font-size="12" font-weight="600">ACTIVE ACCOUNTS</text>
  <text x="630" y="132" fill="#FFFFFF" font-family="JetBrains Mono, monospace" font-size="30" font-weight="800">14,290</text>
  <text x="760" y="130" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">98.2% Ret.</text>

  <!-- Chart 1: Revenue by Region / Bars -->
  <rect x="30" y="185" width="460" height="280" rx="10" fill="#1F1F1F" stroke="#2E2E2E"/>
  <text x="50" y="215" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Monthly Sales Run-Rate vs Dynamic Target</text>
  <!-- Bar chart visual -->
  <rect x="60" y="370" width="30" height="60" rx="4" fill="#F59E0B" fill-opacity="0.4"/>
  <rect x="110" y="340" width="30" height="90" rx="4" fill="#F59E0B" fill-opacity="0.5"/>
  <rect x="160" y="320" width="30" height="110" rx="4" fill="#F59E0B" fill-opacity="0.6"/>
  <rect x="210" y="290" width="30" height="140" rx="4" fill="#F59E0B" fill-opacity="0.7"/>
  <rect x="260" y="260" width="30" height="170" rx="4" fill="#F59E0B" fill-opacity="0.8"/>
  <rect x="310" y="240" width="30" height="190" rx="4" fill="#F59E0B"/>
  <rect x="360" y="230" width="30" height="200" rx="4" fill="#F59E0B"/>
  <rect x="410" y="210" width="30" height="220" rx="4" fill="#F59E0B"/>
  <!-- Target line -->
  <path d="M60 330 Q 230 260 440 210" stroke="#38BDF8" stroke-width="2.5" fill="none" stroke-dasharray="6 3"/>
  <text x="60" y="450" fill="#737373" font-family="JetBrains Mono, monospace" font-size="11">JAN  FEB  MAR  APR  MAY  JUN  JUL  AUG</text>

  <!-- Chart 2: DAX Dynamic YoY Breakout -->
  <rect x="510" y="185" width="360" height="280" rx="10" fill="#1F1F1F" stroke="#2E2E2E"/>
  <text x="530" y="215" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Channel Contribution %</text>
  
  <rect x="530" y="240" width="320" height="38" rx="6" fill="#2E2E2E"/>
  <text x="545" y="264" fill="#E5E5E5" font-family="Inter, sans-serif" font-size="13">Enterprise Direct</text>
  <text x="830" y="264" text-anchor="end" fill="#F59E0B" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">54.2%</text>

  <rect x="530" y="290" width="320" height="38" rx="6" fill="#2E2E2E"/>
  <text x="545" y="314" fill="#E5E5E5" font-family="Inter, sans-serif" font-size="13">Partner Ecosystem</text>
  <text x="830" y="314" text-anchor="end" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">28.4%</text>

  <rect x="530" y="340" width="320" height="38" rx="6" fill="#2E2E2E"/>
  <text x="545" y="364" fill="#E5E5E5" font-family="Inter, sans-serif" font-size="13">Self-Serve SaaS</text>
  <text x="830" y="364" text-anchor="end" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">17.4%</text>

  <text x="530" y="420" fill="#737373" font-family="JetBrains Mono, monospace" font-size="12">DAX: CALCULATE([Sales],</text>
  <text x="530" y="440" fill="#737373" font-family="JetBrains Mono, monospace" font-size="12">  SAMEPERIODLASTYEAR('Date'[Date]))</text>
</svg>
`;

export const SAMPLE_ASSETS = {
  confusionMatrix: `data:image/svg+xml;utf8,${encodeURIComponent(svgConfusionMatrix)}`,
  sqlExecutionPlan: `data:image/svg+xml;utf8,${encodeURIComponent(svgSqlExecutionPlan)}`,
  powerBiSchema: `data:image/svg+xml;utf8,${encodeURIComponent(svgPowerBiSchema)}`,
  powerBiDashboard: `data:image/svg+xml;utf8,${encodeURIComponent(svgPowerBiDashboard)}`,
};
