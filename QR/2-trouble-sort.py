#!/usr/bin/python2

import sys

def troubleSort (l):
  done = False
  while not done:
    done = True
    for i in range(0, len(l) - 2):
      if l[i] > l[i + 2]:
        done = False
        tmp = l[i]
        l[i] = l[i + 2]
        l[i + 2] = tmp

testCase = 0
testCases = int(sys.stdin.readline())

while testCase < testCases:
  testCase += 1

  sys.stdin.readline()
  l = map(int, sys.stdin.readline().split())
  troubleSort(l)

  indexError = 'OK'
  for i in range(0, len(l) - 1):
    if l[i] > l[i + 1]:
      indexError = i
      break

  print("Case #%s: %s" % (testCase, indexError))
