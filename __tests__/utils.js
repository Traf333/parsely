import {parseText} from '../src/utils'

describe("#parseText", function() {
  const examples = [
    {text: "123 products", expected: {value: 123, category: 'products'}},
    {text: "1.500 products", expected: {value: 1500, category: 'products'}},
    {text: "123 products 321", expected: {value: 123, category: 'products 321'}},
    {text: " products 555 ", expected: {value: 555, category: 'products'}},
    {text: " products", expected: {error: 'Amount not found'}},
  ]
  examples.forEach(example => it('brakes text on value and category', function() {
    expect(parseText(example.text)).toEqual(example.expected)
  }))

})