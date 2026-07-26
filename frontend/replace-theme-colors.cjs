const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory()
        ? walkSync(dirFile, filelist)
        : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EPERM' || err.code === 'EACCES') {
        console.warn(`Skipping unreadable path: ${dirFile}`);
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const files = walkSync(srcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.tsx') || f.endsWith('.ts'));

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace backgrounds
  content = content.replace(/bg-blue-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-indigo-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-purple-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-cyan-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-teal-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-pink-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-rose-[0-9]{3}/g, 'bg-[#fbc05c]');
  content = content.replace(/bg-orange-[0-9]{3}/g, 'bg-[#fbc05c]');

  // Replace text colors
  content = content.replace(/text-blue-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-indigo-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-purple-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-cyan-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-teal-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-pink-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-rose-[0-9]{3}/g, 'text-[#fbc05c]');
  content = content.replace(/text-orange-[0-9]{3}/g, 'text-[#fbc05c]');

  // Replace borders
  content = content.replace(/border-blue-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-indigo-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-purple-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-cyan-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-teal-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-pink-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-rose-[0-9]{3}/g, 'border-[#fbc05c]');
  content = content.replace(/border-orange-[0-9]{3}/g, 'border-[#fbc05c]');

  // Replace gradients
  content = content.replace(/from-blue-[0-9]{3}/g, 'from-[#fbc05c]');
  content = content.replace(/via-blue-[0-9]{3}/g, 'via-[#fbc05c]');
  content = content.replace(/to-blue-[0-9]{3}/g, 'to-[#fbc05c]');
  content = content.replace(/from-purple-[0-9]{3}/g, 'from-[#fbc05c]');
  content = content.replace(/via-purple-[0-9]{3}/g, 'via-[#fbc05c]');
  content = content.replace(/to-purple-[0-9]{3}/g, 'to-[#fbc05c]');
  content = content.replace(/from-pink-[0-9]{3}/g, 'from-[#fbc05c]');
  content = content.replace(/via-pink-[0-9]{3}/g, 'via-[#fbc05c]');
  content = content.replace(/to-pink-[0-9]{3}/g, 'to-[#fbc05c]');
  content = content.replace(/from-cyan-[0-9]{3}/g, 'from-[#fbc05c]');
  content = content.replace(/via-cyan-[0-9]{3}/g, 'via-[#fbc05c]');
  content = content.replace(/to-cyan-[0-9]{3}/g, 'to-[#fbc05c]');
  content = content.replace(/from-indigo-[0-9]{3}/g, 'from-[#fbc05c]');
  content = content.replace(/via-indigo-[0-9]{3}/g, 'via-[#fbc05c]');
  content = content.replace(/to-indigo-[0-9]{3}/g, 'to-[#fbc05c]');

  // Rings and Shadows
  content = content.replace(/ring-blue-[0-9]{3}/g, 'ring-[#fbc05c]');
  content = content.replace(/ring-purple-[0-9]{3}/g, 'ring-[#fbc05c]');
  content = content.replace(/shadow-blue-[0-9]{3}/g, 'shadow-[#fbc05c]');
  content = content.replace(/shadow-purple-[0-9]{3}/g, 'shadow-[#fbc05c]');

  // Replace text-neon to text-[#fbc05c] if it's there
  content = content.replace(/text-neon/g, 'text-[#fbc05c]');

  // Replace dark slates and grays with black variations
  content = content.replace(/bg-slate-900/g, 'bg-[#0a0a0a]');
  content = content.replace(/bg-slate-800/g, 'bg-[#111111]');
  content = content.replace(/bg-gray-900/g, 'bg-[#0a0a0a]');
  content = content.replace(/bg-gray-800/g, 'bg-[#111111]');
  content = content.replace(/from-slate-800\/95/g, 'from-[#111111]/95');
  content = content.replace(/to-slate-900\/95/g, 'to-[#0a0a0a]/95');
  content = content.replace(/from-slate-900\/95/g, 'from-[#0a0a0a]/95');
  content = content.replace(/from-slate-900/g, 'from-[#0a0a0a]');
  content = content.replace(/to-slate-900/g, 'to-[#0a0a0a]');
  content = content.replace(/from-gray-900/g, 'from-[#0a0a0a]');
  content = content.replace(/to-gray-900/g, 'to-[#0a0a0a]');
  content = content.replace(/bg-slate-800\/50/g, 'bg-[#111111]/50');
  content = content.replace(/bg-gray-800\/50/g, 'bg-[#111111]/50');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Updated theme in ${path.basename(file)}`);
  }
});

console.log(`Successfully updated ${updatedCount} files.`);
