function triple(value, cb) {
  const res = value * 3;
  if( cb ) {
    cb(res);
  }
}

triple(11, console.log);
