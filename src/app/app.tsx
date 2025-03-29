'use client';

export default function App({
  children
}: Readonly<{
  children: NonNullable<JSX.Element>;
}>) {
  return (
    <>
      <>{children}</>
    </>
  );
}
