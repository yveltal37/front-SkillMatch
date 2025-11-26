import { Card, CardActionArea, Typography } from "@mui/material";
import "./categoryCard.css"
interface CategoryCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ name, isSelected, onClick }: CategoryCardProps) {
  return (
    <Card
      sx={{
        border: isSelected ? "4px solid #0080ffff" : "1px solid #ccc",
        boxShadow: isSelected ? 4 : 1,
        transition: "0.2s",
        mb: 2,
      }}
    >
      <CardActionArea onClick={onClick}>
        <div className="cate-card">
          <Typography>{name}</Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}
