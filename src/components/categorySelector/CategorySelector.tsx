import { useEffect, useState } from "react";
import { getCategories } from "../../services/auth-api";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";

interface Category {
  id: number;
  name: string;
}
interface Props {
  selected: number[];
  setSelected: (ids: number[]) => void;
}

export default function CategorySelector({ selected, setSelected }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log("Failed to fetch categories:", err);
      }
    };
    fetchCats();
  }, []);

  const toggleCategory = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(cid => cid !== id));
    } else {
      if (selected.length >= 5) return;
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose 3 to 5 favorite categories
      </Typography>

      <Grid container spacing={2}>
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id);

          return (
            <Grid key={cat.id} sx={{ width: { xs: "100%", sm: "48%", md: "23%" } }}>
              <Card
                sx={{
                  border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                  boxShadow: isSelected ? 4 : 1,
                  transition: "0.2s",
                  mb: 2,
                }}
              >
                <CardActionArea onClick={() => toggleCategory(cat.id)}>
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <Typography variant="body1">{cat.name}</Typography>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography> Selected: {selected.length} / 5 </Typography>
    </div>
  );
}
