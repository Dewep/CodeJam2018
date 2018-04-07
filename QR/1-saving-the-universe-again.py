#!/usr/bin/python2

import sys

def damage (program):
  dmg = 0
  power = 1
  for c in program:
    if c == 'S':
      dmg += power
    elif c == 'C':
      power *= 2
  return dmg

testCase = 0
testCases = int(sys.stdin.readline())

while testCase < testCases:
  testCase += 1

  test = sys.stdin.readline().split()
  shield = int(test[0])
  program = test[1]
  hacks = 0

  while damage(program) > shield:
    index = program.rfind('CS')
    if index == -1:
      hacks = 'IMPOSSIBLE'
      break
    hacks += 1
    program = program[0:index] + 'SC' + program[index + 2:]

  print('Case #%s: %s' % (testCase, hacks))
