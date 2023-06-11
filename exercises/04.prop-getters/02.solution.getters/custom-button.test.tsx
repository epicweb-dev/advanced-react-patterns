import { screen } from '@testing-library/dom'
import { verifyIsToggle } from '~/shared/toggle.test.tsx'
import '.'

await verifyIsToggle(await screen.findByLabelText('custom-button'))
