import fs from 'fs/promises'
import prettier from 'prettier'
import { url, log, version } from './utils.mjs'

const manifestPath = url('../src/manifest.json')
const digitalVersion = version
  .split('.')
  .map(n => parseInt(n))
  .join('.')

try {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'))
  manifest.version_name = version
  log.blue(
    `📃[update manifest version]: ${manifest.version} ==> ${(manifest.version =
      digitalVersion)}`,
  )
  await fs.writeFile(
    manifestPath,
    prettier.format(JSON.stringify(manifest, null, 2), { parser: 'json' }),
    'utf-8',
  )
} catch (err) {
  log.red(err)
  process.exit(1)
}
