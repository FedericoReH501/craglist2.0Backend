const objectmerger = (object1: object): object => {
  let result = {}

  if (
    "p1" in object1 &&
    "p2" in object1 &&
    "p3" in object1 &&
    "p4" in object1
  ) {
    const { p1, p2 } = object1
    result = { p1, p2 }
  }

  return result
}
