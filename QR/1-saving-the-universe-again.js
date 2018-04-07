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

function damage (program) {
  let dmg = 0
  let power = 1
  program.split('').forEach(type => {
    if (type === 'S') {
      dmg += power
    } else if (type === 'C') {
      power *= 2
    }
  })
  return dmg
}

async function main () {
  // log('main')
  let testCase = 0
  const testCases = await getLine({ asInteger: true })

  while (testCase < testCases) {
    testCase += 1

    // log({ testCase })
    const test = await getLine({ asArray: true })
    const shield = +test[0]
    let program = test[1]
    let hacks = 0

    while (damage(program) > shield) {
      const index = program.lastIndexOf('CS')
      if (index === -1) {
        hacks = 'IMPOSSIBLE'
        break
      }
      hacks += 1
      program = program.slice(0, index) + 'SC' + program.slice(index + 2)
    }

    process.stdout.write('Case #' + testCase + ': ' + hacks + '\n')
  }
  process.exit(0)
}

process.stdin.on('end', () => main().catch(err => console.error(err)))

