import { useEffect, useState } from "react";
import { getCategories } from "../../api/auth-api";
import { Grid } from "@mui/material";
import CategoryCard from "../catagoryCard/CategoryCard";
import "./categorySelector.css";

interface Category {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  selected: number[];
  setSelected: (ids: number[]) => void;
}

function CategorySelector({ selected, setSelected }: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((cid) => cid !== id));
    } else {
      if (selected.length >= 5) return;
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      <p>
        Choose 3 to 5 favorite categories
      </p>
        <Grid container spacing={1} className="grid-container">
          {categories.map((cat) => (
            <Grid key={cat.id} sx={{ width: { xs: "100%", sm: "47%" } }}>
              <CategoryCard
                name={cat.name}
                isSelected={selected.includes(cat.id)}
                onClick={() => toggleCategory(cat.id)}
              />
            </Grid>
          ))}
        </Grid>
      <p> Selected: {selected.length} / 5 </p>
    </div>
  );
}

export default CategorySelector;
