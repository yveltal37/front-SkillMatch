import { Card, CardActionArea, Typography } from "@mui/material";

interface Props {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryCard({ name, isSelected, onClick }: Props) {
  return (
    <Card
      sx={{
        border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
        boxShadow: isSelected ? 4 : 1,
        transition: "0.2s",
        mb: 2,
      }}
    >
      <CardActionArea onClick={onClick}>
        <div style={{ padding: 20, textAlign: "center" }}>
          <Typography variant="body1">{name}</Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
