function removeDuplicates<T>(array: T[], modify = true): T[] {
  let arr: T[]

  if (modify) {
    arr = array
  } else {
    arr = []
    arr.push(...array)
  }

  let i = 0
  while (i < arr.length) {
    if (arr.indexOf(arr[i]) !== i++) arr.splice(--i, 1)
  }

  return arr
}

function getWords(str: string): string[] {
  return removeDuplicates(str?.match(/((?<=_)|^).*?(?=_|$)/g) || [])
}

function getRecurNameList(nameList: string[]): string[] {
  const wordList: string[] = []
  const wordCountMap: { [index: number]: number } = {}
  const patternMap: { [id: string]: number[] } = {}

  for (const name of nameList) {
    const words = getWords(name)
    const noDupWords = removeDuplicates(words, false)

    // Update word list
    wordList.push(...noDupWords)
    removeDuplicates(wordList)

    // Update word count
    for (const word of noDupWords) {
      const i = wordList.indexOf(word)
      wordCountMap[i] = (wordCountMap[i] || 0) + 1
    }

    // Map word to word index list
    const pattern = words.map((word) => wordList.indexOf(word))
    const patternId = pattern.join(".")

    // Update pattern list
    patternMap[patternId] = pattern
  }

  const maxCount = Math.max(...Object.values(wordCountMap))
  const recurWordIndexList: number[] = Object.entries(wordCountMap)
    .filter((e) => e[1] >= Math.floor(maxCount * 0.75))
    .map((e) => parseInt(e[0]))

  const ret: string[] = []

  for (const patternId in patternMap) {
    const pattern = patternMap[patternId]
    if (recurWordIndexList.find((i) => !pattern.includes(i))) continue
    ret.push(pattern.map((i) => wordList[i]).join("_"))
  }

  return ret
}

export default function getRecurName(nameList: string[], prefix?: string | string[]): string {
  let lastLen = -1
  let lastNameList: string[] = []

  if (nameList?.length <= 1 || !nameList) return null

  while (nameList.length !== lastLen) {
    lastLen = nameList.length
    lastNameList = nameList
    nameList = getRecurNameList(nameList)

    if (nameList.length <= 1) {
      nameList = lastNameList
      break
    }
  }

  const wordList: string[] = []
  const wordCountMap: { [index: number]: number } = {}

  for (const name of nameList) {
    const words = getWords(name).filter((word) => (Array.isArray(prefix) ? !prefix.includes(word) : word !== prefix))
    const noDupWords = removeDuplicates(words, false)

    // Update word list
    wordList.push(...noDupWords)
    removeDuplicates(wordList)

    // Update word count
    for (const word of noDupWords) {
      const i = wordList.indexOf(word)
      wordCountMap[i] = (wordCountMap[i] || 0) + 1
    }
  }

  const maxCount = Math.max(...Object.values(wordCountMap))

  return wordList.filter((_word, i) => wordCountMap[i] === maxCount).join("_")
}
