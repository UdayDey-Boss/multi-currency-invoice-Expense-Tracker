import { useState } from "react";
function InvoicePage() {
  const [items, setItems] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Invoice</h1>

      <button
        onClick={addItem}
        className="border px-3 py-1 bg-blue-500 text-white"
      >
        {" "}
        Add Item{" "}
      </button>

      <table className="border w-full mt-4">
        <thead>
          <tr>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(function (item) {
            return (
              <tr key={item.id}>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={function (e) {
                      changeDescription(item.id, e.target.value);
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={function (e) {
                      changeQuantity(item.id, e.target.value);
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={function (e) {
                      changeRate(item.id, e.target.value);
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">{item.quantity * item.rate}</td>

                <td className="border p-2">
                  <button
                    onClick={function () {
                      removeItem(item.id);
                    }}
                    className="text-red-500"
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
  );
}

export default InvoicePage;
