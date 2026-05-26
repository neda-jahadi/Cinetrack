import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/button-group";
import Input from "@/components/ui/Input";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div>
      <ButtonGroup className="w-full">
        <Input type="text" id="title" placeholder="Search by job title..." />
        <Button variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SearchBar;
