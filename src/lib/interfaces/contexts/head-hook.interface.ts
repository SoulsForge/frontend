export default interface IHeadHook {
  title: string;
  setCustomTitle: (title?: string) => void;
}