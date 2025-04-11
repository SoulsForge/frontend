declare global {
  interface String {
    joinWithChar(findChar: string, replaceChar: string): string;
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

String.prototype.joinWithChar = function (
  findChar: string,
  replaceChar: string,
) {
  return this.split(findChar).join(replaceChar);
};

export function hideEmail(email: string) {
  const [username, domain] = email.split("@");
  const hiddenUsername = username.slice(0, 2) + "*".repeat(username.length - 2);
  return `${hiddenUsername}@${domain}`;
}
