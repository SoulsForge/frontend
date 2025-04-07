import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export default function CharacterSectionEdit({ children, title }: Props) {
  return (
    <section className="flex w-full flex-col items-start gap-1 ">
      <h2 className="font-bold text-4xl text-primary lg:mt-3">{title}</h2>
      <div className="mt-2 flex w-full flex-col items-start justify-start gap-2 md:flex-row md:flex-wrap">
        {children}
      </div>
    </section>
  );
}
