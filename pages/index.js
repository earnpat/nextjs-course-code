import fs from 'fs'
import path from 'path'
import Link from 'next/link'

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map(list => <li key={list.id}>
        <Link href={`/products/${list.id}`}>{list.title}</Link>
      </li>)}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy.json')
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  if (!data) return { redirect: { destination: '/no-data' } }
  if (!data.products.length) return { notFound: true }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // seconds
  }
}

export default HomePage;
