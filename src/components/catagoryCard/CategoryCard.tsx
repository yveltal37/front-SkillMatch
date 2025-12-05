import "./categoryCard.css";
interface CategoryCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
      <div
        className={isSelected ? "cate-card selected" : "cate-card"}
        onClick={onClick}
      >
        <p>{name}</p>
      </div>
  );
}
