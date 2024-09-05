

export default function DeleteButton({ onDelete, id }: {
  onDelete: (id: string) => void;
  id: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(id);
      }}
    >
      ❌
    </button>
  )
}
