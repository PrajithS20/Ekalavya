const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src/pages/LandingPage.jsx'),
  path.join(__dirname, 'src/pages/LoginSignup.jsx')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace various yellow/amber/green/orange classes with our exact hex color [#fbc05c]
    
    // LandingPage.jsx replacements (if it has yellow-200, amber-500, etc)
    content = content.replace(/text-yellow-200/g, 'text-[#fbc05c]');
    content = content.replace(/bg-yellow-200/g, 'bg-[#fbc05c]');
    content = content.replace(/bg-yellow-300/g, 'bg-[#fbc05c]');
    content = content.replace(/bg-yellow-500/g, 'bg-[#fbc05c]');
    content = content.replace(/text-yellow-500/g, 'text-[#fbc05c]');
    content = content.replace(/from-yellow-500\/10/g, 'from-[#fbc05c]/10');
    content = content.replace(/from-yellow-500\/20/g, 'from-[#fbc05c]/20');
    content = content.replace(/border-yellow-200\/30/g, 'border-[#fbc05c]/30');
    
    // In case it has amber/orange
    content = content.replace(/text-amber-500/g, 'text-[#fbc05c]');
    content = content.replace(/text-amber-400/g, 'text-[#fbc05c]');
    content = content.replace(/bg-amber-500/g, 'bg-[#fbc05c]');
    content = content.replace(/bg-amber-600/g, 'bg-[#fbc05c]');
    content = content.replace(/from-amber-600/g, 'from-[#fbc05c]');
    content = content.replace(/via-orange-600/g, 'via-[#fbc05c]');
    content = content.replace(/to-amber-600/g, 'to-[#fbc05c]');
    content = content.replace(/from-amber-400/g, 'from-[#fbc05c]');
    content = content.replace(/to-orange-600/g, 'to-[#fbc05c]');
    content = content.replace(/hover:bg-amber-600/g, 'hover:bg-[#f9dc75]');
    content = content.replace(/bg-amber-600\/30/g, 'bg-[#fbc05c]/30');
    content = content.replace(/text-amber-200/g, 'text-[#fbc05c]');

    // LoginSignup.jsx replacements for green/blue
    content = content.replace(/#10b981/g, '#fbc05c'); // emerald-500 in conic gradient
    content = content.replace(/#3b82f6/g, '#f9dc75'); // blue-500 in conic gradient
    content = content.replace(/text-green-400/g, 'text-[#fbc05c]');
    content = content.replace(/from-green-500/g, 'from-[#fbc05c]');
    content = content.replace(/via-emerald-600/g, 'via-[#fbc05c]');
    content = content.replace(/to-teal-600/g, 'to-[#fbc05c]');
    content = content.replace(/bg-green-600/g, 'bg-[#fbc05c]');
    content = content.replace(/bg-emerald-600/g, 'bg-[#fbc05c]');
    content = content.replace(/hover:to-emerald-700/g, 'hover:to-[#f9dc75]');
    content = content.replace(/from-green-400/g, 'from-[#fbc05c]');
    content = content.replace(/from-green-600/g, 'from-[#fbc05c]');
    content = content.replace(/to-emerald-600/g, 'to-[#fbc05c]');
    content = content.replace(/bg-green-500\/20/g, 'bg-[#fbc05c]/20');
    content = content.replace(/bg-green-400\/10/g, 'bg-[#fbc05c]/10');
    content = content.replace(/border-green-500\/30/g, 'border-[#fbc05c]/30');
    content = content.replace(/border-green-400\/30/g, 'border-[#fbc05c]/30');
    content = content.replace(/group-hover:text-green-300/g, 'group-hover:text-[#fbc05c]');
    content = content.replace(/group-hover:text-green-400/g, 'group-hover:text-[#fbc05c]');
    content = content.replace(/ring-green-500\/50/g, 'ring-[#fbc05c]/50');
    
    // Also change the login signup text selection
    content = content.replace(/selection:bg-green-500\/30/g, 'selection:bg-[#fbc05c]/30');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
