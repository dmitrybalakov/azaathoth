import { List, ListItem } from '@azaathoth/list';
import { Segment, Segments, RED, GREEN, BLUE, Color } from '../../src'

test('defragment', () => {
  const segments = new Segments(16);
  segments.first = new ListItem(
    new Segment(0, 3, RED), 
    new ListItem(
      new Segment(4, 6, RED),
      new ListItem(new Segment(7, 15, GREEN))
  ));
  segments.defragment();
  
  expect(segments.first).toStrictEqual(
    new ListItem(
      new Segment(0, 6, RED), 
      new ListItem(new Segment(7, 15, GREEN))
    )
  );
});

test('add - inner', () => {
  const segments = new Segments(16);
  segments.first = new ListItem(
    new Segment(0, 7, RED), 
    new ListItem(new Segment(8, 15, GREEN))
  );
  segments.add(new Segment(3, 5, BLUE.alpha(0.2)));
  
  expect(segments.first).toStrictEqual(
    List.from([
      new Segment(0, 2, RED),
      new Segment(3, 5, new Color(204, 0, 51, 1)),
      new Segment(6, 7, RED),
      new Segment(8, 15, GREEN),
    ]).first
  );
});

test('add - left/right', () => {
  const segments = new Segments(16);
  segments.first = new ListItem(
    new Segment(0, 7, RED), 
    new ListItem(new Segment(8, 15, GREEN))
  );
  segments.add(new Segment(3, 10, BLUE.alpha(0.2)));
  
  expect(segments.first).toStrictEqual(
    List.from([
      new Segment(0, 2, RED),
      new Segment(3, 7, new Color(204, 0, 51, 1)),
      new Segment(8, 10, new Color(0, 204, 51, 1)),
      new Segment(11, 15, GREEN),
    ]).first
  );
});

test('add - all', () => {
  const segments = new Segments(16);
  segments.first = new ListItem(
    new Segment(0, 7, RED), 
    new ListItem(new Segment(8, 15, GREEN))
  );
  segments.add(new Segment(0, 15, BLUE.alpha(0.2)));
  
  expect(segments.first).toStrictEqual(
    List.from([
      new Segment(0, 7, new Color(204, 0, 51, 1)),
      new Segment(8, 15, new Color(0, 204, 51, 1)),
    ]).first
  );
});