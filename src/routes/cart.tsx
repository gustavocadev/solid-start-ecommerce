import { ShoppingCart, Star, ChevronRight } from 'lucide-solid';
import { createSignal } from 'solid-js';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { TextField, TextFieldInput } from '~/components/ui/text-field';

export default function Cart() {
  const [coupon, setCoupon] = createSignal('');

  const course = {
    title: 'The Complete 2024 Web Development Bootcamp',
    instructor: 'Dr. Angela Yu, Developer and Lead Instructor',
    price: 'S/229.90',
    rating: 4.7,
    ratingCount: 407780,
    hours: 61.5,
    lectures: 373,
    level: 'All Levels',
    image: '/placeholder.svg?height=100&width=150',
  };

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <Card>
            <CardContent class="p-6">
              <h2 class="text-xl font-semibold mb-4">1 Course in Cart</h2>
              <div class="flex items-start space-x-4">
                <img
                  src={course.image}
                  alt={course.title}
                  class="w-24 h-16 object-cover rounded"
                />
                <div class="flex-grow">
                  <h3 class="font-semibold">{course.title}</h3>
                  <p class="text-sm text-gray-600">{course.instructor}</p>
                  <div class="flex items-center mt-1">
                    <span class="text-yellow-500 font-bold mr-1">
                      {course.rating}
                    </span>
                    <div class="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          class={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span class="text-sm text-gray-600 ml-1">
                      ({course.ratingCount.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold">{course.price}</p>
                  <button class="text-purple-600 hover:underline text-sm">
                    Remove
                  </button>
                  <button class="text-purple-600 hover:underline text-sm block mt-1">
                    Save for later
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent class="p-6">
              <h2 class="text-xl font-semibold mb-4">Total:</h2>
              <p class="text-3xl font-bold mb-4">{course.price}</p>
              <Button class="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Checkout
              </Button>
              <div class="mt-6">
                <h3 class="font-semibold mb-2">Promotions</h3>
                <div class="flex space-x-2">
                  <TextField>
                    <TextFieldInput
                      type="text"
                      placeholder="Enter Coupon"
                      value={coupon()}
                      onInput={(e) => setCoupon(e.currentTarget.value)}
                      class="flex-grow"
                    />
                  </TextField>
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
