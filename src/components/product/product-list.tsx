import type { SelectProduct } from '@/schema';
import { A } from '@solidjs/router';
import { For } from 'solid-js';

type Props = {
  products: SelectProduct[];
};

const ProductList = (props: Props) => {
  const products = props.products;
  return (
    <For each={products}>
      {(product) => {
        return (
          <div class="group relative">
            <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                class="w-full h-full object-center object-cover lg:w-full lg:h-full"
                width={500}
                height={500}
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <A href="#">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {product.name}
                  </A>
                </h3>
              </div>
              <p class="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        );
      }}
    </For>
  );
};
export default ProductList;
