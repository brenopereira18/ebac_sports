import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'
import { useGetProductsQuery } from './services/api'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const { data: produtos, isLoading, isError } = useGetProductsQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong...</div>
  if (!produtos) return <div>No products available</div>

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos produtos={produtos} />
      </div>
    </>
  )
}

export default App
