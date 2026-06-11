import { useMemo, useState } from 'react';

type OrderItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
};

const orderItems: OrderItem[] = [
  {
    id: 'milo-mocha',
    name: 'Milo Mocha',
    category: 'Signature Coffee',
    description: 'Espresso, chocolate, malted Milo comfort, finished smooth.',
    price: 4.8,
    badge: 'Popular',
  },
  {
    id: 'iced-milo-mocha',
    name: 'Iced Milo Mocha',
    category: 'Cold Coffee',
    description: 'A chilled malt-mocha pour for slow walks through Merchant City.',
    price: 5.2,
  },
  {
    id: 'chai',
    name: 'House Chai',
    category: 'Soft Cups',
    description: 'Warm spice, milk, and comfort for people missing home.',
    price: 4.5,
  },
  {
    id: 'matcha',
    name: 'Matcha Latte',
    category: 'Soft Cups',
    description: 'Earthy, calm, green, and softly sweet.',
    price: 4.7,
  },
  {
    id: 'filled-croissant',
    name: 'Filled Croissant',
    category: 'Bakery',
    description: 'Golden, flaky, and filled with rotating sweet specials.',
    price: 4.2,
    badge: 'Bakery case',
  },
  {
    id: 'savoury-bake',
    name: 'Savoury Global Bake',
    category: 'Bakery',
    description: 'A warm savoury bake inspired by international comfort food.',
    price: 5.4,
  },
];

const pickupSlots = ['ASAP · 15–20 min', 'Today · 12:30', 'Today · 13:00', 'Today · 13:30', 'Today · 14:00'];

const paymentMethods = ['Card', 'Apple Pay', 'Google Pay', 'Pay in store'];

export function OnlineOrdering() {
  const [basket, setBasket] = useState<Record<string, number>>({
    'milo-mocha': 1,
    'filled-croissant': 1,
  });

  const [pickupSlot, setPickupSlot] = useState(pickupSlots[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [collectionType, setCollectionType] = useState<'pickup' | 'collection'>('collection');

  const basketItems = useMemo(() => {
    return orderItems
      .map((item) => ({
        ...item,
        quantity: basket[item.id] ?? 0,
      }))
      .filter((item) => item.quantity > 0);
  }, [basket]);

  const subtotal = useMemo(() => {
    return basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [basketItems]);

  const serviceFee = subtotal > 0 ? 0.35 : 0;
  const total = subtotal + serviceFee;

  const updateQuantity = (id: string, direction: 'increase' | 'decrease') => {
    setBasket((current) => {
      const nextQuantity = direction === 'increase' ? (current[id] ?? 0) + 1 : Math.max((current[id] ?? 0) - 1, 0);

      return {
        ...current,
        [id]: nextQuantity,
      };
    });
  };

  return (
    <section id="order" className="border-y border-[#15100c]/12 bg-[#efe3d0] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div data-line className="mb-8 h-px w-full bg-[#15100c]" />

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5a3826]">
              Click & Collect
            </p>

            <h2 className="mt-4 font-display text-6xl leading-[0.86] tracking-[-0.05em] md:text-8xl">
              Order ahead. Pick up calm.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#15100c]/70">
              Build your coffee and bakery order before you arrive. Choose a collection time,
              pay securely, and collect from 35 Glassford Street.
            </p>

            <div className="mt-8 grid gap-3">
              <button
                type="button"
                onClick={() => setCollectionType('collection')}
                className={`border px-5 py-4 text-left transition ${
                  collectionType === 'collection'
                    ? 'border-[#15100c] bg-[#15100c] text-[#f4ead8]'
                    : 'border-[#15100c]/15 bg-[#fbf5ea] text-[#15100c] hover:border-[#15100c]'
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.18em]">Collection</span>
                <span className="mt-1 block font-display text-3xl leading-none">Collect in store</span>
              </button>

              <button
                type="button"
                onClick={() => setCollectionType('pickup')}
                className={`border px-5 py-4 text-left transition ${
                  collectionType === 'pickup'
                    ? 'border-[#15100c] bg-[#15100c] text-[#f4ead8]'
                    : 'border-[#15100c]/15 bg-[#fbf5ea] text-[#15100c] hover:border-[#15100c]'
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.18em]">Scheduled pickup</span>
                <span className="mt-1 block font-display text-3xl leading-none">Choose a later time</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <div className="grid gap-4">
              {orderItems.map((item) => {
                const quantity = basket[item.id] ?? 0;

                return (
                  <article
                    key={item.id}
                    data-reveal
                    className="group border border-[#15100c]/14 bg-[#fbf5ea] p-5 shadow-paper transition duration-300 hover:-translate-y-1 hover:border-[#15100c]/35"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a3826]">
                            {item.category}
                          </p>

                          {item.badge && (
                            <span className="rounded-full bg-[#15100c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f4ead8]">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 font-display text-4xl leading-none tracking-[-0.035em]">
                          {item.name}
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#15100c]/64">
                          {item.description}
                        </p>
                      </div>

                      <p className="shrink-0 font-display text-3xl text-[#5a3826]">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#15100c]/10 pt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#15100c]/50">
                        Add to collection
                      </span>

                      <div className="flex items-center overflow-hidden rounded-full border border-[#15100c]/20 bg-[#f4ead8]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 'decrease')}
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#15100c] hover:text-[#f4ead8]"
                          aria-label={`Remove ${item.name}`}
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm font-bold">{quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 'increase')}
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#15100c] hover:text-[#f4ead8]"
                          aria-label={`Add ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside data-reveal className="h-fit border border-[#15100c]/14 bg-[#f4ead8] p-5 shadow-editorial xl:sticky xl:top-32">
              <div className="border-b border-[#15100c]/15 pb-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#5a3826]">
                  Your order
                </p>

                <h3 className="mt-2 font-display text-5xl leading-none tracking-[-0.045em]">
                  Pick-up note
                </h3>
              </div>

              <div className="mt-5">
                <label htmlFor="pickup-time" className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/55">
                  Collection time
                </label>

                <select
                  id="pickup-time"
                  value={pickupSlot}
                  onChange={(event) => setPickupSlot(event.target.value)}
                  className="mt-2 min-h-12 w-full border border-[#15100c]/18 bg-[#fbf5ea] px-3 text-sm outline-none transition focus:border-[#15100c]"
                >
                  {pickupSlots.map((slot) => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15100c]/55">
                  Payment
                </p>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`border px-3 py-3 text-xs font-bold uppercase tracking-[0.1em] transition ${
                        paymentMethod === method
                          ? 'border-[#15100c] bg-[#15100c] text-[#f4ead8]'
                          : 'border-[#15100c]/16 bg-[#fbf5ea] text-[#15100c] hover:border-[#15100c]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {basketItems.length === 0 ? (
                  <p className="border-y border-[#15100c]/12 py-5 text-sm text-[#15100c]/60">
                    Your order is empty. Add a coffee or bake to begin.
                  </p>
                ) : (
                  basketItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 border-t border-[#15100c]/10 pt-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#15100c]/45">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-semibold">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 space-y-2 border-t border-[#15100c]/15 pt-5">
                <div className="flex justify-between text-sm text-[#15100c]/62">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-[#15100c]/62">
                  <span>Service fee</span>
                  <span>£{serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 font-display text-4xl leading-none">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={basketItems.length === 0}
                className="mt-6 w-full bg-[#15100c] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#f4ead8] transition hover:bg-[#5a3826] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to secure checkout
              </button>

              <p className="mt-4 text-xs leading-5 text-[#15100c]/50">
                Demo checkout UI. Connect Stripe, Square, or Shopify later for real payments,
                receipts, and order notifications.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}