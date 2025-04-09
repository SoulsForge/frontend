declare global {
  interface String {
    capitalize(): string;
    joinWithChar(findChar: string, replaceChar: string): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
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
