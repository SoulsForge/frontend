import { PropsWithChildren } from 'react';
import { Divider } from '@nextui-org/react';

export interface Props extends PropsWithChildren {
  sectionTitle: string;
  child?: React.ReactNode[];
}

export default function CharacterSectionContainer({
                                                    sectionTitle,
                                                    child,
                                                  }: Props) {
  return (
    <section className='border-2 border-content3 max-w-fit'>
      <h2 className='p-2 text-content1-foreground bg-content1'>
        {sectionTitle}
      </h2>
      <Divider/>
      <div className='p-2 flex flex-wrap justify-start gap-2 items-stretch bg-content4 text-content4-foreground'>
        {child ? (
          <>
            {child.map((c, i) => (
              <LabelInnerComponent
                child={c}
                divider={i !== child.length - 1}
                key={i}
              />
            ))}
          </>
        ) : (
          <h1>No Content.</h1>
        )}
      </div>
    </section>
  );
}

function LabelInnerComponent({
                               child,
                               divider = false,
                             }: {
  child: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <>
      {child}
      {divider && <Divider orientation='vertical' className='h-0'/>}
    </>
  );
}
