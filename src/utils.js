export const buildItem = ({category, value}) => {
  date = new Date
  return {
    id: String(date.getTime()),
    created_at: date,
    category,
    value
  }
}

const regex = /\d+.?\d*/
const toInt = word => +word.replace(/\D+/, '')

export const parseText = text => {

  const matcher = text.match(regex)
  if (matcher) {
    const value = toInt(matcher[0])
    const category = text.replace(matcher[0], '').trim()
    return {value, category}
  } else {
    return { error: 'Amount not found' }
  }
  
}