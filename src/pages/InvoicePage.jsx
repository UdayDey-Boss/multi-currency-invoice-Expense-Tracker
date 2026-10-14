import { useEffect, useState } from "react";
function InvoicePage() {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [currency, setCurrency] = useState("BDT");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(false);

  useEffect(function () {
    fetch("https://api.frankfurter.dev/v2/rates?base=usd")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length === 0) {
          setError(true);
        } else {
          setRate(data);
        }
      })
      .catch(function () {
        setError(true);
      });
  }, []);

  function addItem() {
    const newItem = {
      id: Math.random(),
      description: "",
      quantity: 1,
      rate: 0,
    };
    const newItems = items.concat(newItem);
    setItems(newItems);
  }

  function changeDescription(id, value) {
    const newItems = items.map(function (item) {
      if (item.id === id) {
        const changed = {
          id: item.id,
          description: value,
          quantity: item.quantity,
          rate: item.rate,
        };

        return changed;
      }
      return item;
    });

    setItems(newItems);
  }

  function changeQuantity(id, value) {
    const newItems = items.map(function (item) {
      if (item.id === id) {
        const changed = {
          id: item.id,
          description: item.description,
          quantity: value,
          rate: item.rate,
        };
        return changed;
      }
      return item;
    });
    setItems(newItems);
  }

  function changeRate(id, value) {
    const newItems = items.map(function (item) {
      if (item.id === id) {
        const changed = {
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          rate: value,
        };
        return changed;
      }
      return item;
    });
    setItems(newItems);
  }

  function removeItem(id) {
    const newItems = items.filter(function (item) {
      return item.id !== id;
    });
    setItems(newItems);
  }

  function calculateSubTotal() {
    let total = 0;
    for (let i = 0; i < items.length; i = i + 1) {
      const amount = items[i].quantity * items[i].rate;
      total = total + amount;
    }
    return total;
  }

  function calculateAfterDiscount() {
    const subTotal = calculateSubTotal();
    const afterDiscount = subTotal - discount;
    return afterDiscount;
  }

  function calculateTax() {
    const afterDiscount = calculateAfterDiscount();
    const taxAmount = (afterDiscount * tax) / 100;
    return taxAmount;
  }

  function calculateTotal() {
    const afterDiscount = calculateAfterDiscount();
    const tax = calculateTax();
    const total = afterDiscount + tax;
    return total;
  }

  function getrate() {
    let foundrate = 0;
    for (let i = 0; i < rate.length; i = i + 1) {
      if (rate[i].quote === currency) {
        foundrate = rate[i].rate;
      }
    }
    return foundrate;
  }

  function convertTotal() {
    const total = calculateTotal();
    const rate = getrate();
    const converted = total * rate;
    return converted;
  }

  function isRatesLoaded() {
    if (rate.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Invoice</h1>

      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Item
      </button>
      <div className="bg-white border border-gray-300 rounded mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Quantity</th>
              <th className="text-left p-3">Rate</th>
              <th className="text-right p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(function (item) {
              return (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={function (e) {
                        changeDescription(item.id, e.target.value);
                      }}
                      className="border border-gray-300 p-2 w-full rounded"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={function (e) {
                        changeQuantity(item.id, e.target.value);
                      }}
                      className="border border-gray-300 p-2 w-full rounded"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={function (e) {
                        changeRate(item.id, e.target.value);
                      }}
                      className="border border-gray-300 p-2 w-full rounded"
                    />
                  </td>
                  <td className="p-3 text-right text-gray-800">
                    {(item.quantity * item.rate).toFixed(2)}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={function () {
                        removeItem(item.id);
                      }}
                      className="text-red-500 text-white px-2 py-1 rounded bg-red-500 hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4 mt-4 w-80 rounded">
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Subtotal</span>
          <span>{calculateSubTotal().toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2 items-center text-gray-700">
          <span>Discount</span>
          <input
            type="number"
            value={discount}
            onChange={function (e) {
              setDiscount(e.target.value);
            }}
            className="border border-gray-300 p-1 w-24 rounded"
          />
        </div>

        <div className="flex justify-between mb-2 items-center">
          <span>Tax (%)</span>
          <input
            type="number"
            value={tax}
            onChange={function (e) {
              setTax(e.target.value);
            }}
            className="border border-gray-300 p-1 w-24 rounded"
          />
        </div>

        <div className="flex justify-between mb-2 text-gray-700 font-bold">
          <span>Tax Amount</span>
          <span>{calculateTax().toFixed(2)}</span>
        </div>

        <div className="flex justify-between bg-gray-800 text-white p-3 rounded mt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold">{calculateTotal().toFixed(2)} USD</span>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-4 mt-4 w-80 rounded">
        <div className="flex justify-between mb-2 items-center">
          <span>Currency</span>
          <select
            value={currency}
            onChange={function (e) {
              setCurrency(e.target.value);
            }}
            className="border border-gray-300 p-1 rounded"
          >
            <option value="BDT">BDT</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        {error === true && (
          <p className="text-red-500">
            Error loading rates. Please try again later.
          </p>
        )}

        {error === false && isRatesLoaded() === false && (
          <p className="text-gray-700">Loading rates...</p>
        )}

        {error === false && isRatesLoaded() === true && (
          <div>
            <div className="flex justify-between mb-2 text-gray-700 font-bold">
              <span>Equivalent:</span>
              <span className="font-bold">
                {convertTotal().toFixed(2)} {currency}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              1 USD = {getrate().toFixed(2)} {currency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoicePage;
