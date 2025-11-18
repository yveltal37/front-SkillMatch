import { useEffect, useState } from "react";
import { getCategories } from "../../services/auth-api";
import { Grid, Typography } from "@mui/material";
import CategoryCard from "../catagoryCard/CategoryCard";

interface Category {
  id: number;
  name: string;
}
interface Props {
  selected: number[];
  setSelected: (ids: number[]) => void;
}

function CategorySelector({ selected, setSelected }: Props) {
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
        {categories.map((cat) => (
          <Grid key={cat.id} sx={{ width: { xs: "100%", sm: "48%", md: "23%" } }}>
            <CategoryCard
              name={cat.name}
              isSelected={selected.includes(cat.id)}
              onClick={() => toggleCategory(cat.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography> Selected: {selected.length} / 5 </Typography>
    </div>
  );
}

export default CategorySelector;
