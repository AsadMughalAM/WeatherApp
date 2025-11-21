import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const searchSchema = z.object({
  city: z.string().min(1, "City is required"),
});

type SearchForm = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const submit = (data: SearchForm) => {
    onSearch(data.city);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex gap-3 items-center">
      <div className="flex-1">
        <Input {...register("city")} placeholder="e.g. New York, Tokyo" className="h-12 text-base" />
        {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <Button type="submit" className="h-12 px-6">
          <Search className="size-4" />
          <span>Search</span>
        </Button>
      </div>
    </form>
  );
};
