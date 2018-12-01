const jsonConfig = _read_file('config.json', (content) => {
  print(content);
});

print('after calling _read_file()');
return 'ok';
