const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src/app/page.tsx'),
  path.join(__dirname, 'src/app/review/page.tsx'),
  path.join(__dirname, 'src/app/layout.tsx')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Convert Purple (Accent) -> Green (Blinkit action color)
    content = content.replace(/purple-400/g, 'green-500');
    content = content.replace(/purple-500/g, 'green-600');
    content = content.replace(/purple-600/g, 'green-700');
    content = content.replace(/#9B59B6/gi, '#0C831F'); // Main Green
    content = content.replace(/#AF7AC5/gi, '#16A34A'); // Light Green

    // 2. Convert Navy (Primary) -> Blue/Dark Slate (Blinkit text/headers)
    content = content.replace(/navy-50/g, 'blue-50');
    content = content.replace(/navy-100/g, 'blue-100');
    content = content.replace(/navy-700/g, 'slate-800');
    content = content.replace(/navy-800/g, 'blue-800');
    content = content.replace(/navy-900/g, 'blue-900');
    content = content.replace(/#2C3E50/gi, '#1E3A8A'); // Blue-900
    
    // 3. Inject Yellow (Blinkit primary brand) in key areas
    // The Trust Badge / Instant Service buttons
    content = content.replace(/bg-gradient-to-br from-blue-900 via-blue-800 to-\[\#0F172A\] text-white/g, 'bg-[#FFD100] text-slate-900');
    content = content.replace(/bg-gradient-to-b from-blue-800 to-blue-900 text-white/g, 'bg-[#FFD100] text-slate-900');
    
    // The top banner in review page (currently Green after step 1, change to Yellow)
    content = content.replace(/bg-\[\#0C831F\] text-white px-4 py-3/g, 'bg-[#FFD100] text-slate-900 px-4 py-3');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated theme in ${file}`);
  }
});
