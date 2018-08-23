function mergeObjRecursive(obj1, obj2) {
  const obj3 = {};
  for (const p in obj1) {
    obj3[p] = obj1[p];
  }
  for (const p in obj2) {
    if (Object.keys(obj3).indexOf(p) < 0) {
      obj3[p] = obj2[p];
    } else {
      obj3[p] = obj3[p] + obj2[p];
    }
  }
  return obj3;
}