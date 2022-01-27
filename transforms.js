let nContents = (k, aI) => followPath(aI, k);

let nSet = (k, v, aI) => followPath(aI, k, v);

let nNew = nSet;

let nAppend = (k, delta, aI) => nSet(k, (nContents(k, aI) + delta), aI);

let nDelete = (addr, aI) => (segments => delete nContents(segments.aParent, aI)[segments.kChild])(splitAddress(addr));

let nDeleteFromArray = (addr, v, aI) => nSet(addr, nContents(addr, aI).filter(x => x !== v), aI);

let nAddToArray = (addr, v, aI) => nContents(addr, aI).push(v)
