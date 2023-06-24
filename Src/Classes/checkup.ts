import { UserMongoLogin } from '../services/userProtocol';
import { StatusMessageProtocol } from '../services/statusMessage';
import validator from 'validator';

class CheckUp {
  checkLengthLetterOfValue(
    value: string,
    len: number,
    local?: string,
  ): StatusMessageProtocol {
    if (!value || value.length < len) {
      return this.createStatusMessage(
        `${local} deve conter no minimo ${len} caracteres.`,
        null,
        true,
      );
    }
    return this.createStatusMessage('OK', null, false);
  }

  checkPassword(password: string): StatusMessageProtocol {
    const checkedLengthValue = this.checkLengthLetterOfValue(
      password,
      8,
      'Senha',
    );
    if (checkedLengthValue.status) return checkedLengthValue;
    return this.createStatusMessage('OK', null, false);
  }

  checkUsername(username: string): StatusMessageProtocol {
    const checkedLengthValue = this.checkLengthLetterOfValue(
      username,
      6,
      'Usuário',
    );
    if (checkedLengthValue.status) return checkedLengthValue;
    return this.createStatusMessage('OK', null, false);
  }

  checkEmail(email: string): StatusMessageProtocol {
    if (!validator.isEmail(email))
      return this.createStatusMessage(
        `Email inserido está invalido!`,
        null,
        true,
      );
    return this.createStatusMessage('OK', null, false);
  }

  createStatusMessage(
    msg: string,
    local: string | null,
    status: boolean,
  ): StatusMessageProtocol {
    return {
      statusMsg: msg,
      local: local,
      status: status,
    };
  }

  clean(body: UserMongoLogin): string[] {
    const { user, email, password } = body;
    const executedCheckFunctionsArray: StatusMessageProtocol[] = [
      this.checkEmail(email),
      this.checkUsername(user),
      this.checkPassword(password),
    ];
    const messageStatusArray: string[] = [];
    for (const i in executedCheckFunctionsArray) {
      if (executedCheckFunctionsArray[i].status) {
        messageStatusArray.push(executedCheckFunctionsArray[i].statusMsg);
      } else {
        continue;
      }
    }
    return messageStatusArray;
  }
}

export { CheckUp };
