const string2link = string => {
  const pattern = /(\[{1}[^\][]{1,}\])(\([^)]{1,}\))/g
  const trim = str => str.substring(1, str.length - 1)
  const replacer = (match, p1, p2, offset, string) => (
    `<a href="${trim(p2)}" target="_blank">${trim(p1)}</a>`
  )

  return string.replace(pattern, replacer)
}
