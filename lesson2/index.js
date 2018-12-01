const triple = (value, cb) => {
  const res = value * 3;
  if( cb ) {
    cb(res);
  } else {
    return res;
  }
}

triple(11, console.log);
