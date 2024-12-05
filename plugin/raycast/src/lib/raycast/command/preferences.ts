// define the structure of your package.json for type inference
type CommandPreference = {
  name: string
  type: 'textfield' | 'password' | 'checkbox'
  default: string | boolean
}

type Command = {
  preferences: CommandPreference[]
}

type PackageJson = {
  commands: Command[]
}

import packageJson from '../../../../package.json'

const typedPackageJson = packageJson as PackageJson