import { Color } from "../colors";

export const randomColor = (): Color => 
  new Color(
    Math.floor(256 * Math.random()),
    Math.floor(256 * Math.random()),
    Math.floor(256 * Math.random()),
    Math.random()
  )
