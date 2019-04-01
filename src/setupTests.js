import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

beforeAll(() => {
  jest.spyOn(console, 'info')
  console.info.mockImplementation(() => {})
})

afterAll(() => {
  console.info.mockRestore()
})

beforeEach(() => {
  console.info.mockClear()
})
