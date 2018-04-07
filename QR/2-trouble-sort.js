#!/bin/node

let input = ''
let onInput = null
function log (message) {
  process.stderr.write(JSON.stringify(message) + '\n')
}
function addChunk (chunk) {
  // log('addChunk:' + chunk.toString())
  input += chunk.toString().replace(/\r/g, '')
  if (onInput) {
    onInput()
    onInput = null
  }
}
async function getRawLine () {
  const index = input.indexOf('\n')
  if (index === -1) {
    await new Promise(resolve => {
      onInput = resolve
    })
    return getRawLine()
  }
  const line = input.slice(0, index)
  input = input.slice(index + 1)
  return line
}
// opts.asArray: split by spaces
// opts.asInteger: convert items in integer
async function getLine (opts = {}) {
  const line = await getRawLine()
  const transfomer = opts.asInteger ? n => +n : n => n
  return opts.asArray ? line.split(' ').map(transfomer) : transfomer(line)
}

process.stdin.resume()
process.stdin.on('data', chunk => addChunk(chunk))

function troubleSort (list) {
  let done = false
  while (!done) {
    done = true
    for (let i = 0; i < list.length - 2; i++) {
      if (list[i] > list[i + 2]) {
        done = false
        const tmp = list[i]
        list[i] = list[i + 2]
        list[i + 2] = tmp
        // reverse the sublist from L[i] to L[i+2], inclusive
      }
    }
  }
}

async function main () {
  // log('main')
  let testCase = 0
  const testCases = await getLine({ asInteger: true })

  while (testCase < testCases) {
    testCase += 1

    // log({ testCase })
    await getLine()
    const list = await getLine({ asArray: true, asInteger: true })
    troubleSort(list)

    let indexError = 'OK'
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i] > list[i + 1]) {
        indexError = i
        break
      }
    }

    process.stdout.write('Case #' + testCase + ': ' + indexError + '\n')
  }
  process.exit(0)
}

process.stdin.on('end', () => main().catch(err => console.error(err)))
