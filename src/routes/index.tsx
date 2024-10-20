import { createAsync, type RouteDefinition } from '@solidjs/router';
import { getUser } from '~/server/session';
import ProductList from '~/components/product/product-list';
import { getProducts } from '~/server/services/product';
import { Show, Suspense } from 'solid-js';

export const route = {
  preload() {
    getUser();
    getProducts();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(async () => getUser(), {
    deferStream: true,
  });
  const products = createAsync(async () => getProducts());
  return (
    <div class="min-h-screen bg-white">
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 class="text-3xl font-bold text-gray-900">Home</h2>
        <p class="mt-1 text-sm text-gray-500">Todos los productos</p>

        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <Suspense fallback={<p>Loading...</p>}>
            <Show when={products()} keyed>
              {(products) => {
                return <ProductList products={products} />;
              }}
            </Show>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
