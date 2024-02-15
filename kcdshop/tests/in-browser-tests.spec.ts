import path from 'path'
import { fileURLToPath } from 'url'
import { setupInBrowserTests } from '@kentcdodds/workshop-utils/playwright.server'

// Convert file URL to path for __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.env.KCDSHOP_CONTEXT_CWD = path.resolve(__dirname, '..', '..')
setupInBrowserTests()
