#!/usr/bin/env node
import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

/**
 * Executes a shell command with inherited stdio.
 * @param {string} command - The command to run.
 * @param {string} title - Human-readable title for the step.
 */
const run = (command, title) => {
  if (title) console.log(`\n📦 ${title}...`)
  try {
    execSync(command, { stdio: "inherit", cwd: root })
  } catch (err) {
    console.error(`\n❌ Failed to execute: ${command}`)
    console.error(err.message)
    process.exit(1)
  }
}

async function main() {
  const androidDir = path.join(root, "android")
  const webDir = path.join(root, "web")

  console.log("🛠️  Starting Automated Android Build Pipeline\n")

  // 1. Platform Initialization
  if (!fs.existsSync(androidDir)) {
    run("npx lynx-native-cli add android", "Initializing Android platform")
  }

  if (!fs.existsSync(webDir)) {
    run("npx lynx-native-cli add web", "Initializing Web platform")
    // Web platform often needs its own dependencies
    if (fs.existsSync(path.join(webDir, "package.json"))) {
      console.log("📦 Installing web dependencies...")
      execSync("npm install", { stdio: "inherit", cwd: webDir })
    }
  }

  // 2. Build and Sync
  run("npm run build", "Building Lynx bundles (rspeedy)")
  run("npm run sync", "Syncing assets to native platforms")

  // 3. Resource Preparation
  run("npm run android:icons", "Generating Android launcher icons from favicon.png")

  // 4. Final Native Build
  run("npm run android", "Compiling Android APK (gradle)")

  console.log(
    "\n✅ Build successful! You can find your APK in: android/app/build/outputs/apk/debug/"
  )
}

main().catch((err) => {
  console.error("\n❌ Build script failed:", err)
  process.exit(1)
})
