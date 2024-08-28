export default function Counter({
  numberOfItemsPacked,
  totalNumberOfItems }: {
    numberOfItemsPacked: number,
    totalNumberOfItems: number
  }) {
  return (
    <p>
      <b>{numberOfItemsPacked}</b> / {totalNumberOfItems} items packed
    </p>
  );
}