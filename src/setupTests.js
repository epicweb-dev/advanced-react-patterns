import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

beforeAll(() => {
  jest.spyOn(console, 'log')
  console.log.mockImplementation(() => {})
})

afterAll(() => {
  console.log.mockRestore()
})

beforeEach(() => {
  console.log.mockClear()
})
