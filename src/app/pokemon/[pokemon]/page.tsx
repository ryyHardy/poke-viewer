export default async function Pokemon({
  params,
}: {
  params: { pokemon: string };
}) {
  const { pokemon } = await params;

  return <main className='page-pokemon'>Pokemon: {pokemon}</main>;
}
