#!/usr/bin/env node
/**
 * Android Launcher Icon Generator
 *
 * Automatically generates ic_launcher and ic_launcher_round icons in all
 * required mipmap densities using public/favicon.png as the source.
 * Requires the 'sharp' library.
 */
import fs from "fs"
import { createRequire } from "module"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

// Dynamically require sharp (installed as devDependency)
const require = createRequire(import.meta.url)
let sharp
try {
  sharp = require("sharp")
} catch {
  console.error("❌  sharp is not installed. Please run:\n\n    npm install --save-dev sharp\n")
  process.exit(1)
}

const SOURCE = path.join(root, "public", "favicon.png")
const RES_BASE = path.join(root, "android", "app", "src", "main", "res")

if (!fs.existsSync(SOURCE)) {
  console.error(`❌  Source image not found: ${SOURCE}`)
  process.exit(1)
}

/** @type {Array<{ dir: string, size: number }>} */
const DENSITIES = [
  { dir: "mipmap-mdpi", size: 48 },
  { dir: "mipmap-hdpi", size: 72 },
  { dir: "mipmap-xhdpi", size: 96 },
  { dir: "mipmap-xxhdpi", size: 144 },
  { dir: "mipmap-xxxhdpi", size: 192 }
]

async function main() {
  console.log(`📱 Generating Android icons from: ${path.basename(SOURCE)}\n`)

  for (const { dir, size } of DENSITIES) {
    const outDir = path.join(RES_BASE, dir)

    // Ensure target directory exists
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    for (const name of ["ic_launcher", "ic_launcher_round"]) {
      const pngPath = path.join(outDir, `${name}.png`)
      const xmlPath = path.join(outDir, `${name}.xml`)

      // Delete XML version if it exists to avoid "Duplicate resources" error in Gradle
      if (fs.existsSync(xmlPath)) {
        fs.unlinkSync(xmlPath)
      }

      await sharp(SOURCE)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(pngPath)

      console.log(`  ✅  ${dir}/${name}.png (${size}x${size})`)
    }
  }

  console.log("\n🎉 Done! All Android mipmap icons have been updated.")
}

main().catch((err) => {
  console.error("❌ Error generating icons:", err.message)
  process.exit(1)
})
