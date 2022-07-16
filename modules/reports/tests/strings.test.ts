import Reports from '../src'

test('delimiter', () => {
  expect(Reports.strings.delimiter()).toEqual(new Array(128).fill('=').join(''));
});

test('joinLineByLine', () => {
  expect(Reports.strings.joinLineByLine(
    [ 'aaaa\naaa\naa', 'bbb\nbb'  ],
    '#'
  )).toEqual('aaaa#bbb\naaa #bb \naa  #   ');
});

test('formatValue', () => {
  expect(Reports.strings.formatValue(null)).toEqual('<null>');
  expect(Reports.strings.formatValue(undefined)).toEqual('<undefined>');
  expect(Reports.strings.formatValue(13)).toEqual('13');
  expect(Reports.strings.formatValue({ toString: () => '123' })).toEqual('123');
});

test('format', () => {
  expect(Reports.strings.format(null, 9)).toEqual('<null>   ');
  expect(Reports.strings.format(undefined, 5)).toEqual('<u...');
  expect(Reports.strings.format(13, 5)).toEqual('13   ');
  expect(Reports.strings.format({ toString: () => '123' }, 5)).toEqual('123  ');
});