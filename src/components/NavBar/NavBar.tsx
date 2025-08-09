
import { Link } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

const NavBar = () => {
    return (
        <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-[#722323]">Library</Link>
      
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/books">All Books</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/create-book">Add Book</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/borrow-summary">Borrow Summary</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
    );
};

export default NavBar;