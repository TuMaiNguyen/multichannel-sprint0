import fs from 'fs';
import path from 'path';

const SRC = path.resolve(process.cwd(), 'frontend', 'src');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

function ensureLinkImport(code) {
  if (code.includes(' from \'react-router-dom\'')) {
    if (!/import\s*\{\s*Link\s*\}/.test(code)) {
      return code.replace(
        /import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"];?/,
        (m, g1) => `import { ${g1}, Link } from 'react-router-dom';`
      );
    }
    return code;
  }
  // không có import react-router-dom, thêm 1 dòng đầu file
  return `import { Link } from 'react-router-dom';\n` + code;
}

function convertAnchors(code) {
  // <a href="/abc"> -> <Link to="/abc">
  let newCode = code.replace(
    /<a\s+([^>]*?)href\s*=\s*["'](\/[^"']*)["'](.*?)>/g,
    (_m, pre, to, post) => `<Link ${pre}to="${to}"${post}>`
  );
  newCode = newCode.replace(/<\/a>/g, '</Link>');
  if (newCode !== code) newCode = ensureLinkImport(newCode);
  return newCode;
}

const files = walk(SRC).filter(f => /\.(jsx?|tsx?)$/.test(f));
let changed = 0;

for (const file of files) {
  const code = fs.readFileSync(file, 'utf8');
  const out = convertAnchors(code);
  if (out !== code) {
    fs.writeFileSync(file, out, 'utf8');
    changed++;
    console.log('Updated', path.relative(SRC, file));
  }
}
console.log(`Done. Updated ${changed} file(s).`);
