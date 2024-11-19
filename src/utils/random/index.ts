export const randomNum = (left: number, right: number) => {
  return Math.floor(Math.random() * (right - left) + left)
}