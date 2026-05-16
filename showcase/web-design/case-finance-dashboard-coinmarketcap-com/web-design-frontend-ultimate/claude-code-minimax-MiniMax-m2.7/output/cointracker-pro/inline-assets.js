import fs from 'fs'
import path from 'path'

const distDir = './dist'
const htmlPath = path.join(distDir, 'index.html')

let html = fs.readFileSync(htmlPath, 'utf-8')

// Inline CSS
const cssMatch = html.match(/href="\/assets\/(index-[^"]+\.css)"/)
if (cssMatch) {
  const cssPath = path.join(distDir, 'assets', cssMatch[1])
  const css = fs.readFileSync(cssPath, 'utf-8')
  html = html.replace(cssMatch[0], `style="${css.replace(/"/g, '&quot;')}"`)
  fs.unlinkSync(cssPath)
}

// Inline JS
const jsMatch = html.match(/src="\/assets\/(index-[^"]+\.js)"/)
if (jsMatch) {
  const jsPath = path.join(distDir, 'assets', jsMatch[1])
  const js = fs.readFileSync(jsPath, 'utf-8')
  html = html.replace(`<script type="module" crossorigin src="${jsMatch[0].match(/src="([^"]+)"/)[1]}"></script>`, `<script type="module">${js}</script>`)
  fs.unlinkSync(jsPath)
}

// Remove empty style attribute if CSS wasn't found
html = html.replace(/\s*style=""\s*/g, '')

// Write the inlined HTML
fs.writeFileSync(path.join(distDir, 'bundle.html'), html)

console.log('Bundle created at dist/bundle.html')
