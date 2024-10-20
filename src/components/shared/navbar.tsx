import { A, useLocation } from '@solidjs/router';
import { Menu, Search, ShoppingCart } from 'lucide-solid';
import { Button } from '../ui/button';

export default function Navbar() {
  return (
    <header>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">BRAND | Shop</h1>
          </div>
          <nav class="hidden md:flex space-x-10">
            <A
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Hombres
            </A>
            <A
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Mujeres
            </A>
            <A
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Niños
            </A>
          </nav>
          <div class="flex items-center">
            <Button variant="ghost" size="icon">
              <Search class="h-5 w-5" />
              <span class="sr-only">Search</span>
            </Button>
            <A href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart class="h-5 w-5" />
                <span class="sr-only">Cart</span>
              </Button>
            </A>

            <Button variant="ghost" size="icon" class="md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
