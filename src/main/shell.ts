import * as os from 'os'
import config from './config'
import { toWslPath } from './wsl'

const configKey = 'shell'

const CD_COMMAND_PREFIX = '--yank-note-run-command-cd--'
const defaultShell = os.platform() === 'win32' ? 'cmd.exe' : (process.env.SHELL || 'bash')

const getShell = () => {
  const shell = config.get(configKey, defaultShell)

  // use full path
  // TODO better way.
  if (os.platform() === 'win32') {
    if (shell.toLocaleLowerCase() === 'cmd.exe' || shell.toLocaleLowerCase() === 'wsl.exe') {
      return `C:\\Windows\\System32\\${shell}`
    }
  }

  return shell
}

const transformCdCommand = (command: string) => {
  const path = command.replace(CD_COMMAND_PREFIX, '').trim()

  if (os.platform() !== 'win32') {
    return `cd '${path.replace(/'/g, '\\\'')}'`
  }

  // transform path for WSL shell.
  if (getShell().indexOf('wsl.exe') > -1) {
    return `cd '${toWslPath(path).replace(/'/g, '\\\'')}'`
  }

  // change dir for Windows.
  return `cd /d "${path}"\r`
}

export default {
  CD_COMMAND_PREFIX,
  getShell,
  transformCdCommand,
}
