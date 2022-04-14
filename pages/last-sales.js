import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://nextjs-course-f57de-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
      .then(res => res.json())
      .then(data => {
        const tranformedSales = []

        for (const key in data) {
          tranformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          })
        }

        setSales(tranformedSales)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading..</p>
  if (!sales.length) return <p>No data yet.</p>

  return <ul>{sales.map(list => <li key={list.id}>{list.username} - THB{list.volume}</li>)}</ul>
}

export default LastSalesPage;