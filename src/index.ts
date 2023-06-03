import convertFile from "./convertFile"
import deobfuscateFile from "./deobfuscateFile"
import mapGen from "./mapGen"
;(async () => {
  const mode = parseInt(process.argv.find((arg) => arg.indexOf("-mode:") === 0)?.split(":")[1])
  const ver = process.argv.find((arg) => arg.indexOf("-ver:") === 0)?.split(":")[1]

  if (isNaN(mode)) {
    console.log("Use -mode:<mode> to choose mode.")
    console.log("Available modes:")
    console.log("1 - Generate obfuscate map")
    console.log("2 - Deobfuscate file")
    console.log("3 - Convert bin output & scripts to HuTao GS data")
  }

  switch (mode) {
    case 1:
      await mapGen(ver)
      break
    case 2:
      await deobfuscateFile(ver)
      break
    case 3:
      await convertFile(ver)
      break
    default:
      console.log("Error:", "Invalid mode:", mode)
  }

  process.exit()
})()
